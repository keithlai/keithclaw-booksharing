const fs = require('fs');
const path = require('path');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\server.js';
let c = fs.readFileSync(p, 'utf8');
const wasCRLF = c.includes('\r\n');
let c2 = c.replace(/\r\n/g, '\n');

// Add NEWS_JSON path constant after BOOKLIST_JSON
c2 = c2.replace(
  "const BOOKLIST_JSON = path.join(ROOT, 'booklist.json');",
  "const BOOKLIST_JSON = path.join(ROOT, 'booklist.json');\nconst NEWS_JSON = path.join(ROOT, 'newslist.json');"
);

// Add news list API route before book list API
c2 = c2.replace(
  "  // API: get book list (replaces hardcoded var BOOKS)",
  `  // API: get news list
  if (pathname === '/api/news/list') {
    try {
      const data = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
      const list = data.articles.map(a => ({
        id: a.id, title: a.title, summary: a.summary,
        source: a.source, time: a.time, cat: a.category,
        source_url: a.source_url, article_url: a.article_url
      }));
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify(list));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: 'Failed to load news', detail: e.message }));
    }
  }

  // API: get single news article detail
  if (pathname === '/api/news/article') {
    const id = parsed.query.id;
    if (!id) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Missing id');
    }
    try {
      const data = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
      const article = data.articles.find(a => a.id === id);
      if (!article) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Not found');
      }
      const detail = {
        id: article.id, title: article.title, summary: article.summary,
        detail: article.detail || '', time: article.time,
        source: article.source, source_url: article.source_url,
        article_url: article.article_url, category: article.category,
        takeaways: article.takeaways || []
      };
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify(detail));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Server error');
    }
  }

  // API: get book list (replaces hardcoded var BOOKS)`
);

if (wasCRLF) c2 = c2.replace(/\n/g, '\r\n');
fs.writeFileSync(p, c2);
console.log('OK - server.js updated with news API routes');
