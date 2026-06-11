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

  // API: get book list (replaces hardcoded var BOOKS)
  if (pathname === '/api/books/list') {
    try {
      const data = JSON.parse(fs.readFileSync(BOOKLIST_JSON, 'utf8'));
      const list = data.books.map(b => ({
        id: b.id, title: b.title, author: b.author, cat: b.category,
        diff: b.difficulty, sum: b.summary,
        gr: b.links?.goodreads || '', amz: b.links?.amazon || '',
        yt: b.links?.youtube_review || '', wiki: b.links?.wikipedia || ''
      }));
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify(list));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: 'Failed to load booklist', detail: e.message }));
    }
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

  // ===== Markdown view: /book/:id/markdown =====
  const mdMatch = pathname.match(/^\/book\/([A-Za-z0-9_-]+)\/markdown$/);
  if (mdMatch) {
    const bookId = mdMatch[1];
    try {
      const data = JSON.parse(fs.readFileSync(BOOKLIST_JSON, 'utf8'));
      const book = data.books.find(b => b.id === bookId);
      if (!book) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Book not found');
      }
      const md = '# ' + book.title + '\n\n**Author:** ' + book.author + '  |  **Category:** ' + book.category + '  |  **Difficulty:** ' + book.difficulty + '\n\n---\n\n## Overview\n\n' + (book.overview || '').replace(/\n/g, '\n\n') + '\n\n## Key Takeaways\n\n' + (book.takeaways || []).map((t, i) => '**' + (i+1) + '.** ' + t).join('\n\n') + '\n\n---\n\n### Links\n' + (book.links?.goodreads ? '- Goodreads: ' + book.links.goodreads + '\n' : '') + (book.links?.amazon ? '- Amazon: ' + book.links.amazon + '\n' : '') + (book.links?.wikipedia ? '- Wikipedia: ' + book.links.wikipedia + '\n' : '') + (book.links?.youtube_review ? '- YouTube Review: ' + book.links.youtube_review + '\n' : '');
      const html = '<!DOCTYPE html><html lang="zh-HK"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>' + book.title + ' - Markdown View</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#fafafa;color:#1a1a1a;font-family:Georgia,Times New Roman,serif;line-height:1.9;padding:20px 16px;max-width:720px;margin:0 auto}pre{white-space:pre-wrap;word-wrap:break-word;font-family:Georgia,Times New Roman,serif;font-size:16px;line-height:1.9;background:transparent;border:none;padding:0;color:inherit}@media(prefers-color-scheme:dark){body{background:#1a1a1a;color:#e8e8e8}}a{color:#1a73e8}@media(prefers-color-scheme:dark){a{color:#8ab4f8}}</style></head><body><pre>' + md + '</pre></body></html>';
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Server error: ' + e.message);
    }
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
