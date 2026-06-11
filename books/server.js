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
  if (pathname.startsWith('/api/auth/') ||
      pathname.startsWith('/api/gateway/') ||
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
      const title = book.title;
      const author = book.author;
      const cat = book.category;
      const diff = book.difficulty;
      const overviewParas = (book.overview || '').split('\n').filter(function(p) { return p.trim(); }).map(function(p) { return '<p>' + p.trim() + '</p>'; }).join('\n');
      const takeawaysHtml = (book.takeaways || []).map(function(t, i) { return '<div class="takeaway"><span class="num">' + (i+1) + '</span><div class="txt">' + t + '</div></div>'; }).join('\n');
      var linksHtml = '';
      if (book.links?.goodreads) linksHtml += '<a href="' + book.links.goodreads + '" target="_blank">Goodreads</a>';
      if (book.links?.amazon) linksHtml += '<a href="' + book.links.amazon + '" target="_blank">Amazon</a>';
      if (book.links?.wikipedia) linksHtml += '<a href="' + book.links.wikipedia + '" target="_blank">Wikipedia</a>';
      if (book.links?.youtube_review) linksHtml += '<a href="' + book.links.youtube_review + '" target="_blank">YouTube Review</a>';

      const html = '<!DOCTYPE html><html lang="zh-HK"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>' + title + ' — Markdown View</title><style>' +
        '*{margin:0;padding:0;box-sizing:border-box}' +
        'body{background:#fff;color:#1a1a1a;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;line-height:1.8;padding:0;max-width:720px;margin:0 auto}' +
        '.header{background:#f8f9fa;border-bottom:1px solid #e9ecef;padding:24px 20px 20px}' +
        '.header h1{font-size:22px;font-weight:700;margin-bottom:8px;line-height:1.4}' +
        '.meta{color:#666;font-size:14px}' +
        '.meta span{margin-right:16px}' +
        '.content{padding:24px 20px}' +
        '.section{margin-bottom:28px}' +
        '.section h2{font-size:18px;font-weight:600;margin-bottom:12px;padding-bottom:6px;border-bottom:2px solid #1a73e8;display:inline-block}' +
        '.section p{font-size:15px;line-height:1.85;margin-bottom:12px;color:#333}' +
        '.takeaway{display:flex;gap:12px;margin-bottom:16px;padding:14px 16px;background:#f8f9fa;border-radius:10px;border-left:3px solid #1a73e8}' +
        '.takeaway .num{font-size:13px;font-weight:700;color:#1a73e8;min-width:24px;padding-top:1px}' +
        '.takeaway .txt{font-size:15px;line-height:1.8;color:#333}' +
        '.links{display:flex;flex-wrap:wrap;gap:8px}' +
        '.links a{padding:8px 18px;background:#e8f0fe;color:#1a73e8;border-radius:20px;text-decoration:none;font-size:14px;font-weight:500}' +
        '.footer{text-align:center;padding:20px;border-top:1px solid #e9ecef;margin-top:20px}' +
        '.footer a{color:#666;font-size:13px;text-decoration:none}' +
        '@media(prefers-color-scheme:dark){' +
        'body{background:#1a1a1a;color:#e8e8e8}' +
        '.header{background:#222;border-color:#333}' +
        '.meta{color:#aaa}' +
        '.section p,.takeaway .txt{color:#ccc}' +
        '.takeaway{background:#252525;border-left-color:#8ab4f8}' +
        '.takeaway .num{color:#8ab4f8}' +
        '.links a{background:#1a3a5c;color:#8ab4f8}' +
        '.footer a{color:#888}' +
        '}' +
        '</style></head><body>' +
        '<div class="header"><h1>' + title + '</h1><div class="meta"><span>👤 ' + author + '</span><span>📁 ' + cat + '</span><span>📖 ' + diff + '</span></div></div>' +
        '<div class="content">' +
        '<div class="section"><h2>✅ Overview</h2>' + overviewParas + '</div>' +
        '<div class="section"><h2>💡 Key Takeaways</h2>' + takeawaysHtml + '</div>' +
        '<div class="section"><h2>🔗 Links</h2><div class="links">' + linksHtml + '</div></div>' +
        '</div>' +
        '<div class="footer"><a href="/">← Back to Book Browser</a></div>' +
        '</body></html>';

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
