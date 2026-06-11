const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\server.js';
let c = fs.readFileSync(p, 'utf8');
const wasCRLF = c.includes('\r\n');
let c2 = c.replace(/\r\n/g, '\n');

// Find markdown handler boundaries
const start = c2.indexOf('// ===== Markdown view:');
const endLine = c2.indexOf('\n  res.writeHead(404, {', start);
const endBrace = c2.indexOf('\n});\n\nserver.listen', endLine);
const oldBlock = c2.substring(start, endBrace);

// Each takeaway note
function buildTakeawayHtml(t, i) {
  var num = i + 1;
  return '<div class="takeaway"><span class="num">' + num + '</span><div class="txt">' + t + '</div></div>';
}

const newBlock = `  // ===== Markdown view: /book/:id/markdown =====
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
      const title = book.title;
      const author = book.author;
      const cat = book.category;
      const diff = book.difficulty;
      const overviewParas = (book.overview || '').split('\\n').filter(function(p) { return p.trim(); }).map(function(p) { return '<p>' + p.trim() + '</p>'; }).join('\\n');
      const takeawaysHtml = (book.takeaways || []).map(function(t, i) { return '<div class="takeaway"><span class="num">' + (i+1) + '</span><div class="txt">' + t + '</div></div>'; }).join('\\n');
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

`;

// Replace the old handler
const idxStart = c2.indexOf('// ===== Markdown view:');
const idxAfterBlock = c2.indexOf('\n  res.writeHead(404, {', idxStart);
c2 = c2.substring(0, idxStart) + newBlock + c2.substring(idxAfterBlock);

if (wasCRLF) c2 = c2.replace(/\n/g, '\r\n');
fs.writeFileSync(p, c2);
console.log('OK - markdown view updated');
