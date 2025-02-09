#!/bin/bash

# Simple deploy script for GoDaddy hosting
echo "Building project..."
npm run build

echo "Deployment complete! Upload the contents of the 'dist' folder to your GoDaddy hosting via FTP."