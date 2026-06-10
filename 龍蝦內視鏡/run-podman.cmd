@rem 龍蝦內視鏡 — Build & Run Script
@rem Keeps API keys out of the image

@echo off
echo 🔨 Building 龍蝦內視鏡 image...
podman build -t keithclaw-logviewer container\

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed
    exit /b 1
)

echo ✅ Build success!
echo.
echo ▶️  Run container:
podman run -d ^
  --name keithclaw-logviewer ^
  -p 3000:3000 ^
  -v /mnt/host/c/Users/Administrator/.openclaw/logs:/var/log/openclaw:ro ^
  -v /mnt/host/c/Users/Administrator/.openclaw:/workspace/.openclaw:ro ^
  -v /mnt/host/c/Users/Administrator/workspace-dev:/workspace:ro ^
  keithclaw-logviewer

echo.
echo 🔍 Open http://localhost:3000 in your browser
