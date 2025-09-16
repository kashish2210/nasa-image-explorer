-- Initialize NASA Image Explorer Database

CREATE EXTENSION IF NOT EXISTS postgis;

-- Features table for storing planetary/space features
CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    body VARCHAR(100) NOT NULL,
    coordinates POINT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample features
INSERT INTO features (name, type, body, coordinates, description) VALUES
('Tycho Crater', 'crater', 'Moon', POINT(-11.36, -43.31), 'Famous lunar crater with prominent ray system'),
('Olympus Mons', 'mountain', 'Mars', POINT(133.8, 18.65), 'Largest volcano in the solar system'),
('Gale Crater', 'crater', 'Mars', POINT(137.8, -5.4), 'Landing site of NASA Curiosity rover'),
('Andromeda Galaxy', 'galaxy', 'Space', POINT(10.68, 41.27), 'Nearest major galaxy to the Milky Way'),
('Eagle Nebula', 'nebula', 'Space', POINT(274.7, -13.85), 'Star-forming region with famous pillars');

-- User annotations table (for future use)
CREATE TABLE IF NOT EXISTS annotations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    coordinates POINT,
    dataset VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_features_name ON features(name);
CREATE INDEX idx_features_type ON features(type);
CREATE INDEX idx_features_body ON features(body);
