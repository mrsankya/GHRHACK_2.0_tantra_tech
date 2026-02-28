@echo off
echo =======================================================
echo Agro Mitra - Setup and Development Server
echo =======================================================
echo.

echo [1/3] Checking Node.js installation...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

echo [2/3] Installing dependencies...
call npm install --legacy-peer-deps

echo.
echo [3/3] Starting development server...
echo The app will open in your default browser shortly.
echo Press Ctrl+C to stop the server.
echo.
call npm run dev

pause
