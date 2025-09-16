# NASA Image Explorer

A web platform for exploring massive NASA image datasets with seamless zooming, feature search, and interactive overlays.

## Features

- **Gigapixel Image Viewing**: Smooth zoom and pan on massive space imagery
- **Feature Search**: Find craters, mountains, galaxies by name or type
- **Interactive Overlays**: Toggle feature labels and additional data layers
- **Multi-dataset Support**: Switch between different space missions and datasets
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Quick Start

### Prerequisites

- Docker and Docker Compose
- At least 4GB RAM
- 10GB free disk space

### Running the Application

1. Clone and navigate to the project:
   ```bash
   cd nasa-image-explorer
   ```

2. Build and start all services:
   ```bash
   docker compose build
   docker compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: localhost:5432

### Stopping the Application

```bash
docker compose down
```

## Architecture

- **Frontend**: React + OpenSeadragon for zoomable image interface
- **Backend**: FastAPI for serving tiles and feature data
- **Database**: PostgreSQL with PostGIS for spatial feature storage
- **Data**: Tile pyramids served efficiently via HTTP

## Development

### Adding New Datasets

1. Place raw images in `data/raw/`
2. Generate tiles using `data/scripts/create_tiles.sh`
3. Update backend tile sources
4. Add feature data to database

### API Endpoints

- `GET /` - Service information
- `GET /health` - Health check
- `GET /tiles/{z}/{x}/{y}` - Serve image tiles
- `GET /features` - List features with optional search

## License

MIT License - See LICENSE file for details.
<img width="1915" height="871" alt="image" src="https://github.com/user-attachments/assets/b37ca4e5-f9d8-4491-810f-7408da939d63" />
