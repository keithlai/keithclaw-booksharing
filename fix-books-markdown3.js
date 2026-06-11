const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\server.js';
let c = fs.readFileSync(p, 'utf8');

// CRLF line endings - match with \r\n
const marker = "  res.writeHead(404, { 'Content-Type': 'text/plain' });\r\n  res.end('Not Found');\r\n});\r\n\r\nserver.listen";
const idx = c.indexOf(marker);
if (idx < 0) {
  console.log('Could not find marker. Trying alternative...');
  // Try LF-only
  const marker2 = "  res.writeHead(404, { 'Content-Type': 'text/plain' });\n  res.end('Not Found');\n});\n\nserver.listen";
  const idx2 = c.indexOf(marker2);
  if (idx2 < 0) {
    console.log('Still could not find');
    process.exit(1);
  }
  console.log('Found with LF at', idx2);
}

const actualIdx = idx >= 0 ? idx : c.indexOf("  res.writeHead(404, { 'Content-Type': 'text/plain' });\n  res.end('Not Found');\n});\n\nserver.listen");

const mdRoute = `\r
  // ===== Markdown view: /book/:id/markdown =====\r
  const mdMatch = pathname.match(/^\\/book\\/([A-Za-z0-9_-]+)\\/markdown$/);\r
  if (mdMatch) {\r
    const bookId = mdMatch[1];\r
    try {\r
      const data = JSON.parse(fs.readFileSync(BOOKLIST_JSON, 'utf8'));\r
      const book = data.books.find(b => b.id === bookId);\r
      if (!book) {\r
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });\r
        return res.end('Book not found');\r
      }\r
      const md = '# ' + book.title + '\\n\\n**Author:** ' + book.author + '  |  **Category:** ' + book.category + '  |  **Difficulty:** ' + book.difficulty + '\\n\\n---\\n\\n## Overview\\n\\n' + (book.overview || '').replace(/\\n/g, '\\n\\n') + '\\n\\n## Key Takeaways\\n\\n' + (book.takeaways || []).map((t, i) => '**' + (i+1) + '.** ' + t).join('\\n\\n') + '\\n\\n---\\n\\n### Links\\n' + (book.links?.goodreads ? '- Goodreads: ' + book.links.goodreads + '\\n' : '') + (book.links?.amazon ? '- Amazon: ' + book.links.amazon + '\\n' : '') + (book.links?.wikipedia ? '- Wikipedia: ' + book.links.wikipedia + '\\n' : '') + (book.links?.youtube_review ? '- YouTube Review: ' + book.links.youtube_review + '\\n' : '');\r
      const html = '<!DOCTYPE html><html lang="zh-HK"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>' + book.title + ' — Markdown View</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#fafafa;color:#1a1a1a;font-family:Georgia,Times New Roman,serif;line-height:1.9;padding:20px 16px;max-width:720px;margin:0 auto}pre{white-space:pre-wrap;word-wrap:break-word;font-family:Georgia,Times New Roman,serif;font-size:16px;line-height:1.9;background:transparent;border:none;padding:0;color:inherit}@media(prefers-color-scheme:dark){body{background:#1a1a1a;color:#e8e8e8}}a{color:#1a73e8}@media(prefers-color-scheme:dark){a{color:#8ab4f8}}</style></head><body><pre>' + md + '</pre></body></html>';\r
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });\r
      return res.end(html);\r
    } catch(e) {\r
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });\r
      return res.end('Server error: ' + e.message);\r
    }\r
  }\r
\r
`;

// Find the marker again
const mi = c.indexOf("  res.writeHead(404, { 'Content-Type': 'text/plain' });");
c = c.substring(0, mi) + mdRoute + c.substring(mi);
fs.writeFileSync(p, c);
console.log('OK - markdown route added');
