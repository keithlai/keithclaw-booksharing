## 1. 環境安裝 (Environment Setup)

- [x] 1.1 Check Podman availability → Podman 5.4.0 installed
- [x] 1.2 Install Podman machine — `podman machine init` failed (HCS_E_SERVICE_NOT_AVAILABLE)
- [x] 1.3 **Enable WSL + Virtual Machine Platform** — `dism /enable-feature /featurename:VirtualMachinePlatform` ✅
- [x] 1.4 **Enable WSL feature** — `dism /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux` ✅
- [x] 1.5 **Set WSL 2 as default** — `wsl --set-default-version 2` ✅
- [ ] 1.6 **Reboot Windows** (required for HCS service to start)
- [ ] 1.7 Run `podman machine init` (after reboot)
- [ ] 1.8 Run `podman machine start` (after reboot)
- [ ] 1.9 Verify: `podman ps` shows running

## 2. 建立 Log Viewer Server

- [x] 2.1 Create `container/server.js` — Express API routes
- [x] 2.2 Create `container/Dockerfile` — Podman image build
- [x] 2.3 Create `container/public/index.html` — Material Design 3 UI
- [x] 2.4 Create `container/package.json` — npm dependencies
- [x] 2.5 Install npm packages (express)

## 3. Native Runner (port 3000)

- [x] 3.1 Create `run-native.js` — Native Windows entry point
- [x] 3.2 Map Windows paths: Logs + Workspace + Config
- [x] 3.3 Start server: `node run-native.js`
- [x] 3.4 Verify API: `GET /api/logs` returns files
- [x] 3.5 Verify API: `GET /api/system/health` returns OK

## 4. UI Implementation

- [x] 4.1 Logs Tab — file list + log viewer with line numbers
- [x] 4.2 Admin Tab — Podman status + Operations Manual
- [x] 4.3 Workspace Tab — directory browser
- [x] 4.4 Material Design 3 theme (dark)
- [x] 4.5 Tab switching with JS

## 5. Podman Deployment (planned)

- [ ] 5.1 Build container: `podman build -t keithclaw-logviewer .`
- [ ] 5.2 Run container with volume mounts:
      `podman run -d --name keithclaw-logviewer -p 3000:3000
       -v /mnt/host/c/Users/Administrator/.openclaw/logs:/var/log/openclaw:ro
       -v /mnt/host/c/Users/Administrator/workspace-dev:/workspace:ro
       keithclaw-logviewer`
- [ ] 5.3 Verify container running
- [ ] 5.4 Create `run-podman.cmd` script

## 6. Git & GitHub

- [x] 6.1 Git add + commit all files
- [x] 6.2 Push to GitHub (keithclawviewer repo)
- [x] 6.3 OpenSpec archive
