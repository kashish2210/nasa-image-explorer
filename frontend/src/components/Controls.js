import React from 'react';

function Controls() {
  return (
    <div className="controls">
      <div className="control-group">
        <button id="zoom-in">Zoom In</button>
        <button id="zoom-out">Zoom Out</button>
        <button id="home">Home</button>
        <button id="full-page">Full Screen</button>
      </div>
    </div>
  );
}

export default Controls;
