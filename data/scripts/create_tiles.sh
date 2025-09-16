#!/bin/bash
# Sample script for generating tiles from NASA imagery
# Requires GDAL to be installed

# Example usage:
# ./create_tiles.sh input_image.tif output_tiles_dir

if [ $# -ne 2 ]; then
    echo "Usage: $0 <input_image> <output_directory>"
    exit 1
fi

INPUT_IMAGE="$1"
OUTPUT_DIR="$2"

echo "Generating tiles for $INPUT_IMAGE..."

# Create tiles using gdal2tiles
gdal2tiles.py -p mercator -z 0-10 "$INPUT_IMAGE" "$OUTPUT_DIR"

echo "Tiles generated in $OUTPUT_DIR"
