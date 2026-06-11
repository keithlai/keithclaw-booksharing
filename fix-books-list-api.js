const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\server.js';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(
  '  // API: get single book detail',
  `  // API: get book list (replaces hardcoded var BOOKS)
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

  // API: get single book detail`
);
fs.writeFileSync(p, c);
console.log('OK - /api/books/list added');
