#!/bin/bash

# Simple build script to test the deployment process
echo "Starting build process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found. Make sure you're in the frontend directory."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "Build artifacts are in the 'dist' directory"
    ls -la dist/
else
    echo "Build failed!"
    exit 1
fi
