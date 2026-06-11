const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\server.js';
let c = fs.readFileSync(p, 'utf8');
// Add markdown route before 404 handler
const mdRoute = `
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
      const md = \`# \${book.title}\\n\\n**Author:** \${book.author}  |  **Category:** \${book.category}  |  **Difficulty:** \${book.difficulty}\\n\\n---\\n\\n## Overview\\n\\n\${(book.overview || '').replace(/\\n/g, '\\n\\n')}\\n\\n## Key Takeaways\\n\\n\${(book.takeaways || []).map((t, i) => \`**\${i+1}.** \${t}\\n\`).join('\\n')}\\n\\n---\\n\\n### Links\\n\${book.links?.goodreads ? \`- [Goodreads](\${book.links.goodreads})\\n\` : ''}\${book.links?.amazon ? \`- [Amazon](\${book.links.amazon})\\n\` : ''}\${book.links?.wikipedia ? \`- [Wikipedia](\${book.links.wikipedia})\\n\` : ''}\${book.links?.youtube_review ? \`- [YouTube Review](\${book.links.youtube_review})\\n\` : ''}\`;
      const html = \`<!DOCTYPE html><html lang="zh-HK"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>\${book.title} — Markdown View</title><style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:#fafafa;color:#1a1a1a;font-family:Georgia,'Times New Roman',serif;line-height:1.9;padding:20px 16px;max-width:720px;margin:0 auto}
        pre{white-space:pre-wrap;word-wrap:break-word;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.9;background:transparent;border:none;padding:0;color:inherit}
        @media(prefers-color-scheme:dark){body{background:#1a1a1a;color:#e8e8e8}}
        .meta{color:#666;font-size:14px;margin-bottom:20px}
        @media(prefers-color-scheme:dark){.meta{color:#aaa}}
        hr{border:none;border-top:1px solid #ddd;margin:24px 0}
        @media(prefers-color-scheme:dark){hr{border-color:#444}}
        a{color:#1a73e8}
        @media(prefers-color-scheme:dark){a{color:#8ab4f8}}
      </style></head><body><pre>\${md}</pre></body></html>\`;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Server error: ' + e.message);
    }
  }

`;
c = c.replace('\n  res.writeHead(404, { \'Content-Type\': \'text/plain\' });\n  res.end(\'Not Found\');', mdRoute + '  res.writeHead(404, { \'Content-Type\': \'text/plain\' });\n  res.end(\'Not Found\');');
fs.writeFileSync(p, c);
console.log('OK - /book/:id/markdown route added');
