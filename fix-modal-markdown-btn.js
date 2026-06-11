const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\html\\book-browser-material.html';
let c = fs.readFileSync(p, 'utf8');

// Add markdown button next to the modal close button
c = c.replace(
  '<button class="m3-modal-close" onclick="document.getElementById(\'bookModal\').classList.remove(\'open\')">',
  '<button id="mdViewBtn" onclick="var m=document.getElementById(\'modalTitle\');window.open(\'/book/\' + (m.dataset.bookid||\'\') + \'/markdown\',\'_blank\')" style="background:transparent;border:1px solid var(--muted);color:var(--fg2);border-radius:16px;cursor:pointer;font-size:12px;padding:4px 12px;margin-right:8px">&#x1F4DD; Markdown</button>' +
  '<button class="m3-modal-close" onclick="document.getElementById(\'bookModal\').classList.remove(\'open\')">'
);

// Store book ID in modalTitle dataset for markdown button
c = c.replace(
  'document.getElementById("modalTitle").textContent=e.currentTarget.querySelector(".card-title").textContent;',
  'var md=e.currentTarget.dataset.id;document.getElementById("modalTitle").textContent=e.currentTarget.querySelector(".card-title").textContent;document.getElementById("modalTitle").dataset.bookid=md;'
);

fs.writeFileSync(p, c);
console.log('OK - markdown button added to modal header');
