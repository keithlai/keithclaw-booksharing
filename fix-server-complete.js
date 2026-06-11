const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\server.js';
let c = fs.readFileSync(p, 'utf8');

// Normalize to LF
const wasCRLF = c.includes('\r\n');
let c2 = c.replace(/\r\n/g, '\n');

// Add /api/books/list route (before /api/book)
c2 = c2.replace(
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

// Add markdown route before the final 404 handler
const mdRoute = `
  // ===== Markdown view: /book/:id/markdown =====
  const mdMatch = pathname.match(/^\\/book\\/([A-Za-z0-9_-]+)\\/markdown$/);
  if (mdMatch) {
    const bookId = mdMatch[1];
    try {
      const data = JSON.parse(fs.readFileSync(BOOKLIST_JSON, 'utf8'));
      const book = data.books.find(b => b.id === bookId);
      if (!book) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Book not found');
      }
      const md = '# ' + book.title + '\\n\\n**Author:** ' + book.author + '  |  **Category:** ' + book.category + '  |  **Difficulty:** ' + book.difficulty + '\\n\\n---\\n\\n## Overview\\n\\n' + (book.overview || '').replace(/\\n/g, '\\n\\n') + '\\n\\n## Key Takeaways\\n\\n' + (book.takeaways || []).map((t, i) => '**' + (i+1) + '.** ' + t).join('\\n\\n') + '\\n\\n---\\n\\n### Links\\n' + (book.links?.goodreads ? '- Goodreads: ' + book.links.goodreads + '\\n' : '') + (book.links?.amazon ? '- Amazon: ' + book.links.amazon + '\\n' : '') + (book.links?.wikipedia ? '- Wikipedia: ' + book.links.wikipedia + '\\n' : '') + (book.links?.youtube_review ? '- YouTube Review: ' + book.links.youtube_review + '\\n' : '');
      const html = '<!DOCTYPE html><html lang="zh-HK"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>' + book.title + ' - Markdown View</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#fafafa;color:#1a1a1a;font-family:Georgia,Times New Roman,serif;line-height:1.9;padding:20px 16px;max-width:720px;margin:0 auto}pre{white-space:pre-wrap;word-wrap:break-word;font-family:Georgia,Times New Roman,serif;font-size:16px;line-height:1.9;background:transparent;border:none;padding:0;color:inherit}@media(prefers-color-scheme:dark){body{background:#1a1a1a;color:#e8e8e8}}a{color:#1a73e8}@media(prefers-color-scheme:dark){a{color:#8ab4f8}}</style></head><body><pre>' + md + '</pre></body></html>';
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Server error: ' + e.message);
    }
  }

`;

c2 = c2.replace(
  '\n  res.writeHead(404, { \'Content-Type\': \'text/plain\' });\n  res.end(\'Not Found\');\n});\n\nserver.listen',
  mdRoute + '  res.writeHead(404, { \'Content-Type\': \'text/plain\' });\n  res.end(\'Not Found\');\n});\n\nserver.listen'
);

// Convert back to CRLF
if (wasCRLF) c2 = c2.replace(/\n/g, '\r\n');
fs.writeFileSync(p, c2);
console.log('OK - server.js updated with /api/books/list + markdown route');
