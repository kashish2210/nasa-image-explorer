from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="NASA Image Explorer API",
    description="API for exploring massive NASA image datasets",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for tiles
TILES_DIR = "/app/data/tiles"
if os.path.exists(TILES_DIR):
    app.mount("/tiles", StaticFiles(directory=TILES_DIR), name="tiles")

@app.get("/")
async def root():
    return {
        "message": "NASA Image Explorer Backend is running",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "tiles": "/tiles/{z}/{x}/{y}",
            "features": "/features"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "nasa-image-explorer-backend"}

@app.get("/tiles/{z}/{x}/{y}")
async def get_tile(z: int, x: int, y: int):
    """Serve image tiles for the zoomable interface"""
    # Support multiple file extensions
    for ext in ['.png', '.jpg', '.jpeg']:
        tile_path = os.path.join(TILES_DIR, str(z), str(x), f"{y}{ext}")
        if os.path.exists(tile_path):
            logger.info(f"Serving tile: {tile_path}")
            return FileResponse(tile_path)
    
    # If no tile found, return error
    logger.warning(f"Tile not found: {z}/{x}/{y}")
    raise HTTPException(status_code=404, detail="Tile not found")

@app.get("/features")
async def get_features(search: str = None):
    """Get planetary/space features with optional search"""
    # Sample features data
    features = [
        {"name": "Tycho Crater", "type": "crater", "coordinates": [0.0, -43.3], "body": "Moon"},
        {"name": "Olympus Mons", "type": "mountain", "coordinates": [18.65, 133.8], "body": "Mars"},
        {"name": "Andromeda Galaxy", "type": "galaxy", "coordinates": [41.27, 121.17], "body": "Space"},
        {"name": "Gale Crater", "type": "crater", "coordinates": [-5.4, 137.8], "body": "Mars"},
    ]
    
    if search:
        features = [f for f in features if search.lower() in f["name"].lower()]
    
    return {"features": features, "count": len(features)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
