import React, { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';
import SearchBar from './components/SearchBar';
import Controls from './components/Controls';
import axios from 'axios';
import './App.css';

function App() {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Test backend connection
    const testBackend = async () => {
      try {
        const response = await axios.get('/health');
        console.log('Backend connected:', response.data);
        
        // Load features
        const featuresResponse = await axios.get('/features');
        setFeatures(featuresResponse.data.features);
        
        setLoading(false);
      } catch (err) {
        console.error('Backend connection failed:', err);
        setError('Cannot connect to backend service');
        setLoading(false);
      }
    };

    testBackend();
  }, []);

  useEffect(() => {
    if (loading || error) return;

    // Initialize OpenSeadragon viewer
    if (containerRef.current && !viewerRef.current) {
      try {
        viewerRef.current = OpenSeadragon({
          element: containerRef.current,
          prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
          tileSources: [
            {
              type: 'image',
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Vd-Orig.png/256px-Vd-Orig.png',
              crossOriginPolicy: 'Anonymous',
              ajaxWithCredentials: false
            }
          ],
          showNavigationControl: true,
          showZoomControl: true,
          showHomeControl: true,
          showFullPageControl: true,
          zoomInButton: 'zoom-in',
          zoomOutButton: 'zoom-out',
          homeButton: 'home',
          fullPageButton: 'full-page'
        });

        console.log('OpenSeadragon viewer initialized');
      } catch (err) {
        console.error('Failed to initialize viewer:', err);
        setError('Failed to initialize image viewer');
      }
    }

    // Cleanup
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [loading, error]);

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading NASA Image Explorer...</h2>
        <p>Connecting to backend services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Connection Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🚀 NASA Image Explorer</h1>
        <p>Explore massive space imagery datasets</p>
      </header>
      
      <div className="app-content">
        <div className="controls-panel">
          <SearchBar onSearch={handleSearch} features={features} />
          <Controls />
        </div>
        
        <div className="viewer-container">
          <div 
            ref={containerRef}
            className="openseadragon-container"
            style={{ width: '100%', height: '600px' }}
          >
            {/* OpenSeadragon viewer will be mounted here */}
          </div>
        </div>
      </div>
      
      <footer className="app-footer">
        <p>Powered by NASA data and OpenSeadragon</p>
      </footer>
    </div>
  );
}

export default App;
