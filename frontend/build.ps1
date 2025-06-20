# PowerShell build script for testing
Write-Host "Starting build process..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "Error: package.json not found. Make sure you're in the frontend directory." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm ci

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install dependencies." -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful!" -ForegroundColor Green
    Write-Host "Build artifacts are in the 'dist' directory" -ForegroundColor Green
    Get-ChildItem -Path "dist" -Recurse | Select-Object Name, Length
} else {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
