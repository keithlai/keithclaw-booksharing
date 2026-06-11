const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 443;
const ROOT = __dirname;
const HTML_FILE = path.join(ROOT, 'html', 'book-browser-material.html');
const BOOKLIST_JSON = path.join(ROOT, 'booklist.json');
const PFX_PATH = path.join(ROOT, 'book-browser.pfx');
const PFX_PASS = 'bookbrowser';

let pfx;
try {
  pfx = fs.readFileSync(PFX_PATH);
  console.log('🔑 Loaded PFX certificate');
} catch(e) {
  console.error('Failed to load PFX:', e.message);
  process.exit(1);
}

const server = https.createServer({ pfx, passphrase: PFX_PASS }, (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS + no-cache headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // ===== Reverse proxy: /viewer → localhost:3000 =====
  if (pathname.startsWith('/viewer')) {
    const targetPath = pathname.replace(/^\/viewer/, '') || '/';
    const qs = parsed.search || '';
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: targetPath + qs,
      method: req.method,
      headers: Object.assign({}, req.headers, { host: 'localhost:3000' })
    };
    delete options.headers['host'];
    options.headers['host'] = 'localhost:3000';
    const proxyReq = http.request(options, proxyRes => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });
    proxyReq.on('error', () => {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Log Viewer unavailable (port 3000)');
    });
    if (req.method === 'GET' || req.method === 'HEAD') {
      proxyReq.end();
    } else {
      req.pipe(proxyReq);
    }
    return;
  }

  // ===== Reverse proxy: viewer API routes → localhost:3000 =====
  if (pathname.startsWith('/api/gateway/') ||
      pathname.startsWith('/api/logs') ||
      pathname.startsWith('/api/system/') ||
      pathname.startsWith('/api/openclaw/') ||
      pathname.startsWith('/api/command/') ||
      pathname.startsWith('/api/workspace/') ||
      pathname.startsWith('/api/podman/')) {
    const qs = parsed.search || '';
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: pathname + qs,
      method: req.method,
      headers: Object.assign({}, req.headers, { host: 'localhost:3000' })
    };
    delete options.headers['host'];
    options.headers['host'] = 'localhost:3000';
    const proxyReq = http.request(options, proxyRes => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });
    proxyReq.on('error', () => {
      res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Viewer unavailable (port 3000)' }));
    });
    if (req.method === 'GET' || req.method === 'HEAD') {
      proxyReq.end();
    } else {
      req.pipe(proxyReq);
    }
    return;
  }

  // ===== Reverse proxy: /dashboard → OpenClaw Gateway =====
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    const targetPath = '/overview' + (pathname === '/dashboard' ? '' : pathname.replace(/^\/dashboard/, ''));
    const qs = parsed.search || '';
    const options = {
      hostname: '127.0.0.1',
      port: 18789,
      path: targetPath + qs,
      method: req.method,
      headers: Object.assign({}, req.headers, { host: '127.0.0.1:18789' })
    };
    delete options.headers['host'];
    options.headers['host'] = '127.0.0.1:18789';
    const proxyReq = http.request(options, proxyRes => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });
    proxyReq.on('error', () => {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Gateway unavailable (port 18789)');
    });
    if (req.method === 'GET' || req.method === 'HEAD') {
      proxyReq.end();
    } else {
      req.pipe(proxyReq);
    }
    return;
  }

  // API: get single book detail
  if (pathname === '/api/book') {
    const id = parsed.query.id;
    if (!id) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Missing id');
    }
    try {
      const data = JSON.parse(fs.readFileSync(BOOKLIST_JSON, 'utf8'));
      const book = data.books.find(b => b.id === id);
      if (!book) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Not found');
      }
      // Return only the detail fields
      const detail = {
        id: book.id,
        overview: book.overview || '',
        takeaways: book.takeaways || [],
        why: book.why_recommended || '',
        yt_ch: book.youtube_channel || ''
      };
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify(detail));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Server error');
    }
  }

  // Serve Material Design UI (default)
  if (pathname === '/') {
    return fs.readFile(HTML_FILE, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Server error: ' + err.message);
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🔒 HTTPS Book Browser running at:`);
  console.log(`   https://localhost:${PORT}`);
  console.log(`   https://127.0.0.1:${PORT}`);
  const os = require('os');
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`   https://${net.address}:${PORT}  (LAN)`);
      }
    }
  }
  console.log('');
  console.log('⚠️  Self-signed cert. Browser will warn. Click Advanced → Proceed.');
  console.log('📌  Stop: taskkill /F /PID ' + process.pid);
});
