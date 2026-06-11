const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\server.js';
let c = fs.readFileSync(p, 'utf8');

// The markdown block was inserted in the wrong place inside /api/book handler.
// 
// We need to:
// 1. Find and remove the misplaced markdown block  
// 2. Fix the broken /api/book code
// 3. Insert the markdown block before the 404 handler

// Step 1: Find the markdown block boundaries
const mdBlockStart = c.indexOf("  // ===== Markdown view: /book/:id/markdown =====");
console.log('Block starts at:', mdBlockStart);

// The block ends when we hit the next "res.writeHead(404" that belongs to the /api/book not-found handler
const afterMd = mdBlockStart;
// The block extends to the line "  res.writeHead(404, { 'Content-Type': 'text/plain' });"
// followed by "        return res.end('Not found');"
// But this was broken mid-sentence in the if(!book) block
const brokenTarget = "  res.writeHead(404, { 'Content-Type': 'text/plain' });\n        return res.end('Not found');\n      }";
const mdBlockEnd = c.indexOf(brokenTarget, mdBlockStart);
console.log('Block ends at:', mdBlockEnd);

if (mdBlockStart < 0) { console.log('Block start not found'); process.exit(1); }
if (mdBlockEnd < 0) { console.log('Block end not found', c.indexOf('res.writeHead(404', mdBlockStart)); process.exit(1); }

// Extract the markdown block (includes the broken line)
const mdBlock = c.substring(mdBlockStart, mdBlockEnd + brokenTarget.length);
console.log('Block length:', mdBlock.length);

// Remove it from the wrong location
c = c.substring(0, mdBlockStart) + c.substring(mdBlockEnd + brokenTarget.length);

// Step 2: Fix the broken if(!book) block
// The original code was: if (!book) {\n        res.writeHead(404...
// Now there's a gap where the md block was removed
// Look for the next res.writeHead after the removal point
const fixSearch = "const book = data.books.find(b => b.id === id);\n      if (!book) {";
const fixIdx = c.indexOf(fixSearch);
if (fixIdx < 0) { console.log('Fix search not found'); process.exit(1); }

// After this, we need to add the proper 404 response
const fixTarget = "const book = data.books.find(b => b.id === id);\n      if (!book) {\n      ";
const fixReplacement = "const book = data.books.find(b => b.id === id);\n      if (!book) {\n        res.writeHead(404, { 'Content-Type': 'text/plain' });\n        return res.end('Not found');\n      }";
// But there might be only whitespace and a newline after the brace, let me check
const afterIfNot = c.indexOf("      if (!book) {\n", fixIdx);
const braceEnd = c.indexOf("\n", afterIfNot + "      if (!book) {".length);
const afterBrace = c.substring(afterIfNot, braceEnd + 20);
console.log('After if(!book):', JSON.stringify(afterBrace));

// Replace whatever is between "if (!book) {" and the next meaningful code
c = c.replace(
  "      if (!book) {\n      \n      // Return only the detail fields",
  "      if (!book) {\n        res.writeHead(404, { 'Content-Type': 'text/plain' });\n        return res.end('Not found');\n      }\n      // Return only the detail fields"
);

// Step 3: Insert markdown block before 404 handler
const final404 = "\n  res.writeHead(404, { 'Content-Type': 'text/plain' });\n  res.end('Not Found');\n});\n\nserver.listen";
c = c.replace(final404, mdBlock + final404);

fs.writeFileSync(p, c);
console.log('OK - markdown route moved to correct position');
