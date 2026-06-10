const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = 3000;
const LOG_DIR = '/var/log/openclaw';
const APP_LOG_DIR = '/var/log/app';

// ===== Log reading helpers =====

function listLogFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.log') || f.endsWith('.json') || f.endsWith('.jsonl'))
      .map(f => {
        const stat = fs.statSync(path.join(dir, f));
        return {
          name: f,
          size: stat.size,
          mtime: stat.mtime.toISOString(),
          path: path.join(dir, f)
        };
      })
      .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
  } catch (e) {
    return [];
  }
}

function readLogFile(filePath, lines = 200, offset = 0) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const allLines = content.split('\n').filter(l => l.trim());
    const totalLines = allLines.length;
    const start = Math.max(0, totalLines - lines - offset);
    const selected = allLines.slice(start, start + lines);
    return {
      totalLines,
      lines: selected,
      startLine: start + 1,
      endLine: start + selected.length,
      hasMore: start > 0
    };
  } catch (e) {
    return { totalLines: 0, lines: [], startLine: 0, endLine: 0, hasMore: false };
  }
}

// ===== Podman command helpers =====

function runCmd(cmd) {
  try {
    const out = execSync(cmd, { timeout: 10000, encoding: 'utf8' });
    return { success: true, output: out.trim() };
  } catch (e) {
    return { success: false, output: e.stderr || e.message };
  }
}

// ===== API Routes =====

// Serve static files
app.use(express.static('public'));

// List log files
app.get('/api/logs', (req, res) => {
  const dir = req.query.dir || 'openclaw';
  const logDir = dir === 'openclaw' ? LOG_DIR : APP_LOG_DIR;
  const files = listLogFiles(logDir);
  res.json({ directory: logDir, files });
});

// Read log file content
app.get('/api/logs/read', (req, res) => {
  const filename = req.query.file;
  const lines = parseInt(req.query.lines) || 200;
  const offset = parseInt(req.query.offset) || 0;
  if (!filename) return res.status(400).json({ error: 'Missing file parameter' });
  const filePath = path.join(LOG_DIR, filename);
  const data = readLogFile(filePath, lines, offset);
  res.json(data);
});

// Podman status
app.get('/api/podman/ps', (req, res) => {
  const result = runCmd('podman ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"');
  res.json(result);
});

app.get('/api/podman/logs', (req, res) => {
  const container = req.query.container || 'keithclaw-logviewer';
  const tail = req.query.tail || 50;
  const result = runCmd(`podman logs --tail ${tail} ${container}`);
  res.json(result);
});

app.get('/api/podman/info', (req, res) => {
  const result = runCmd('podman info --format json');
  try { res.json(JSON.parse(result.output)); }
  catch { res.json(result); }
});

// System health
app.get('/api/system/health', (req, res) => {
  const uptime = runCmd('wmic os get lastbootuptime');
  const disk = runCmd('wmic logicaldisk get size,freespace,caption');
  res.json({
    uptime: uptime.output,
    disk: disk.output,
    podman: runCmd('podman --version').output
  });
});

// Read openclaw config
app.get('/api/openclaw/config', (req, res) => {
  try {
    const config = fs.readFileSync('/workspace/.openclaw/openclaw.json', 'utf8');
    res.json(JSON.parse(config));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// List workspace files
app.get('/api/workspace/list', (req, res) => {
  const dir = req.query.dir || '';
  const base = '/workspace';
  const target = path.join(base, dir);
  try {
    const items = fs.readdirSync(target, { withFileTypes: true });
    const result = items.map(item => ({
      name: item.name,
      type: item.isDirectory() ? 'dir' : 'file',
      size: item.isFile() ? fs.statSync(path.join(target, item.name)).size : 0
    }));
    res.json({ directory: target, items: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Podman exec
app.post('/api/podman/exec', express.json(), (req, res) => {
  const container = req.body.container || 'keithclaw-logviewer';
  const cmd = req.body.command;
  if (!cmd) return res.status(400).json({ error: 'Missing command' });
  const result = runCmd(`podman exec ${container} ${cmd}`);
  res.json(result);
});

// Log a new entry to app log
app.post('/api/log', express.json(), (req, res) => {
  const msg = req.body.message;
  const level = req.body.level || 'INFO';
  if (!msg) return res.status(400).json({ error: 'Missing message' });
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level}] ${msg}\n`;
  fs.appendFileSync(path.join(APP_LOG_DIR, 'app.log'), line);
  res.json({ ok: true });
});

// ===== Start =====
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔍 龍蝦內視鏡 Log Viewer running on http://0.0.0.0:${PORT}`);
  console.log(`📁 OpenClaw logs: ${LOG_DIR}`);
  console.log(`📁 Workspace: /workspace`);
});
