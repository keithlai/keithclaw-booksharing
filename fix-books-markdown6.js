const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\server.js';
let c = fs.readFileSync(p, 'utf8');

// CRLF handling - normalize to LF for processing, then convert back
const hasCR = c.includes('\r\n');
let c2 = c.replace(/\r\n/g, '\n');

// The markdown block starts with this comment
const mdBlockStart = c2.indexOf("// ===== Markdown view: /book/:id/markdown =====");
console.log('Block starts at line:', c2.substring(0, mdBlockStart).split('\n').length);

// The block ends when we hit the code that was broken
const afterMdBlock = c2.indexOf('\n      }', c2.indexOf('Book not found', mdBlockStart));
// But that's ambiguous. Let me find the block by counting braces.
// Actually, simpler: find the end of the markdown section by looking for the line 
// that contains "// API: get single book detail" which is the NEXT handler
// But that's also gone. Let me just look for the broken code structure.

// After the md block, there should be "res.writeHead(404..." then "return res.end('Not found');"
const mdBlockEnd = c2.indexOf("res.writeHead(404, { 'Content-Type': 'text/plain' });\n        return res.end('Not found');\n      }", mdBlockStart);
console.log('Block ends at char:', mdBlockEnd);

if (mdBlockEnd < 0) {
  // Try to find the "res.writeHead" that was inside the broken if block
  const altEnd = c2.indexOf("res.writeHead(404, { 'Content-Type': 'text/plain' });", mdBlockStart + 100);
  console.log('Alt end at:', altEnd);
  if (altEnd >= 0) {
    const snippet = c2.substring(altEnd, altEnd + 120);
    console.log('Found:', JSON.stringify(snippet));
  }
  process.exit(1);
}

// The markdown block includes the broken "res.writeHead" line that needs to be removed
const mdBlock = c2.substring(mdBlockStart, mdBlockEnd);
// Also include the broken line that follows
const brokenEnd = "res.writeHead(404, { 'Content-Type': 'text/plain' });\n        return res.end('Not found');\n      }";
const totalMdEnd = mdBlockEnd + brokenEnd.length;

// Remove from wrong location
c2 = c2.substring(0, mdBlockStart) + c2.substring(totalMdEnd);

// Fix the broken /api/book handler
c2 = c2.replace(
  "if (!book) {\n      \n      // Return only the detail fields",
  "if (!book) {\n        res.writeHead(404, { 'Content-Type': 'text/plain' });\n        return res.end('Not found');\n      }\n      // Return only the detail fields"
);

// Insert md block at proper location: before the 404 handler
const final404 = "\n  res.writeHead(404, { 'Content-Type': 'text/plain' });\n  res.end('Not Found');\n});\n\nserver.listen(PORT";
c2 = c2.replace(final404, mdBlock + final404);

// Convert back to CRLF if original had it
c = hasCR ? c2.replace(/\n/g, '\r\n') : c2;
fs.writeFileSync(p, c);
console.log('OK - markdown route moved to correct position');
