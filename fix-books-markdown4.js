const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\server.js';
let c = fs.readFileSync(p, 'utf8');

// Extract the markdown route block (from line 157 to line 193)
// and place it properly between the "/" route handler and the 404 handler

// First, find and remove the broken markdown block
const mdStart = c.indexOf("  // ===== Markdown view: /book/:id/markdown =====");
const mdEnd = c.indexOf("\n  res.writeHead(404, { 'Content-Type': 'text/plain' });\n        return res.end('Not found');\n      }");

if (mdStart < 0 || mdEnd < 0) {
  console.log('Could not find markdown block boundaries');
  process.exit(1);
}

// Extract the correct markdown route (should not be inside any handler)
const mdBlock = c.substring(mdStart, mdEnd);

// Remove it from its current location
c = c.substring(0, mdStart) + c.substring(mdEnd);

// Rebuild the broken code that was inside the /api/book handler
// The line after removal should be:
//       if (!book) {
//   res.writeHead(404, { ... return res.end('Not found'); } 
// Fix: restore the broken if block
const broken = "      if (!book) {\n\n  res.writeHead(404, { 'Content-Type': 'text/plain' });\n        return res.end('Not found');\n      }";
const fixed = "      if (!book) {\n        res.writeHead(404, { 'Content-Type': 'text/plain' });\n        return res.end('Not found');\n      }";
c = c.replace(broken, fixed);

// Now insert the markdown route before the final 404 handler
const final404 = "\n  res.writeHead(404, { 'Content-Type': 'text/plain' });\n  res.end('Not Found');\n});\n\nserver.listen";
c = c.replace(final404, mdBlock + final404);

fs.writeFileSync(p, c);
console.log('OK - markdown route moved to correct position');
