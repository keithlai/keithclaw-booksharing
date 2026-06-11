const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\html\\book-browser-material.html';
let c = fs.readFileSync(p, 'utf8');

// Step 1: Replace var BOOKS=[...] with empty array + fetch
const start = c.indexOf('var BOOKS=[');
const end = c.indexOf('];', start) + 2;
const replacement = `var BOOKS=[];
var booksLoading=true;

// Load booklist from API (not hardcoded)
fetch('/api/books/list').then(function(r){return r.json()}).then(function(list){
  BOOKS=list;
  booksLoading=false;
  render();
}).catch(function(){
  booksLoading=false;
  document.getElementById('bookGrid').innerHTML='<div style="text-align:center;padding:40px;color:var(--muted)">Failed to load book list. <button onclick="location.reload()" style="background:var(--primary-container);color:var(--primary);border:none;padding:8px 20px;border-radius:20px;cursor:pointer">Retry</button></div>';
});
`;
c = c.substring(0, start) + replacement + c.substring(end);

// Step 2: Add markdown button in modal (after the book title)
const modalMarkdownBtn = `    '<div style="display:flex;gap:8px;align-items:center">'+
    '<button onclick="window.open(\\'/book/'+id+'/markdown\\',\\'_blank\\')" style="padding:6px 14px;background:transparent;border:1px solid var(--border);color:var(--fg2);border-radius:20px;cursor:pointer;font-size:12px">📝 Markdown</button>'+
    '<button onclick="closeModal()" style="background:none;border:none;color:var(--fg2);cursor:pointer;font-size:24px;line-height:1;padding:4px">✕</button>'+
    '</div>'+
    '</div>'+
    '<div style="padding:0 24px 24px">'+
    '<div style="color:var(--fg2);font-size:13px;margin-bottom:16px">'+
    '<span>' +
    escapeHtml(d.author) + '</span> | <span>' +
    '<span style="display:inline-block;padding:2px 8px;border-radius:12px;background:' + CAT_COLORS[d.cat] + '22;color:' + CAT_COLORS[d.cat] + ';font-size:11px">' + escapeHtml(d.cat) + '</span>`;

// Find the existing modal close button area
const closeBtnPattern = `'<button onclick="closeModal()" style="background:none;border:none;color:var(--fg2);cursor:pointer;font-size:24px;line-height:1;padding:4px">✕</button>'`;
c = c.replace(closeBtnPattern, modalMarkdownBtn.replace(/'/g, "\\'").replace(/\n/g, '\\n'));

fs.writeFileSync(p, c);
console.log('OK - HTML updated');
console.log('Removed var BOOKS array (' + (end-start) + ' chars)');
console.log('Added fetch + markdown button');
