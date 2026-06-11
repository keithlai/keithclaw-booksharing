const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\keithclawviewer\\container\\public\\index.html';
let c = fs.readFileSync(p, 'utf8');

// 1. Add onclick to workspace file cards
c = c.replace(
  'data.items.filter(i => i.type === \'file\').map(i =>\n      `<div class="file-card">\n        <div class="name">📄 ${i.name}</div>\n        <div class="meta">${(i.size/1024).toFixed(1)} KB</div>\n      </div>`',
  'data.items.filter(i => i.type === \'file\').map(i =>\n      `<div class="file-card" onclick="openFileViewer(\'${dir ? dir + \'/\' : \'\'}${i.name}\')">\n        <div class="name">📄 ${i.name}</div>\n        <div class="meta">${(i.size/1024).toFixed(1)} KB</div>\n      </div>`'
);

// 2. Add file viewer modal after login overlay
c = c.replace(
  '  <div id="loginSpinner" style="display:none"><div class="spinner"></div></div>\n</div>\n\n<div class="app-bar">',
  '  <div id="loginSpinner" style="display:none"><div class="spinner"></div></div>\n</div>\n\n<!-- File Viewer Modal -->\n<div id="fileViewerModal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9998;align-items:center;justify-content:center" onclick="if(event.target===this)closeFileViewer()">\n  <div style="background:var(--bg);border-radius:20px;width:95%;max-width:800px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 8px 40px rgba(0,0,0,0.4)">\n    <div style="display:flex;align-items:center;padding:16px 20px;border-bottom:1px solid var(--border)">\n      <div style="flex:1;font-weight:600;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" id="fileViewerTitle"></div>\n      <button onclick="closeFileViewer()" style="background:none;border:none;color:var(--fg2);cursor:pointer;font-size:20px;padding:4px">&#x2715;</button>\n    </div>\n    <div style="flex:1;overflow-y:auto;padding:20px 24px;line-height:1.85;font-size:15px;font-family:Georgia,Times New Roman,serif;white-space:pre-wrap;word-wrap:break-word" id="fileViewerContent">\n      <div class="spinner"></div>\n    </div>\n  </div>\n</div>\n\n<div class="app-bar">'
);

// 3. Add JS functions for file viewer before the OTP auto-advance section
const jsInsert = `
// ===== File Viewer =====
async function openFileViewer(path) {
  document.getElementById('fileViewerTitle').textContent = path;
  document.getElementById('fileViewerContent').innerHTML = '<div class="spinner"></div> Loading...';
  document.getElementById('fileViewerModal').style.display = 'flex';
  try {
    var r = await fetch('/api/workspace/read?path=' + encodeURIComponent(path));
    if (!r.ok) { document.getElementById('fileViewerContent').innerHTML = '<div style="color:#F2B8B5;padding:20px;text-align:center">Failed to load file</div>'; return; }
    var d = await r.text();
    // Auto-detect markdown: show pretty if .md file, else raw monospace
    var isMarkdown = path.match(/\\.(md|markdown)$/i);
    if (isMarkdown) {
      // Simple markdown rendering
      var lines = d.split('\\n');
      var html = '';
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.startsWith('### ')) { html += '<h3>' + line.substring(4) + '</h3>'; }
        else if (line.startsWith('## ')) { html += '<h2>' + line.substring(3) + '</h2>'; }
        else if (line.startsWith('# ')) { html += '<h1>' + line.substring(2) + '</h1>'; }
        else if (line.startsWith('- ') || line.startsWith('* ')) { html += '<li>' + line.substring(2) + '</li>'; }
        else if (line.startsWith('> ')) { html += '<blockquote style="border-left:3px solid var(--primary);padding-left:12px;margin:8px 0;color:var(--fg2)">' + line.substring(2) + '</blockquote>'; }
        else if (/^\\d+\\.\\s/.test(line)) { html += '<li style="list-style-type:decimal;margin-left:20px">' + line.replace(/^\\d+\\.\\s/,'') + '</li>'; }
        else if (line.trim() === '---' || line.trim() === '***') { html += '<hr style="border:none;border-top:1px solid var(--border);margin:16px 0">'; }
        else if (line.trim() === '') { html += '<br>'; }
        else { html += '<p style="margin-bottom:8px">' + escapeHtml(line) + '</p>'; }
      }
      document.getElementById('fileViewerContent').innerHTML = '<div style="font-family:Georgia,Times New Roman,serif;line-height:1.85;font-size:15px">' + html + '</div>';
    } else {
      // Text or code: monospace
      document.getElementById('fileViewerContent').innerHTML = '<pre style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:1.6;white-space:pre-wrap;word-wrap:break-word;background:var(--bg2);padding:16px;border-radius:8px">' + escapeHtml(d) + '</pre>';
    }
  } catch(e) {
    document.getElementById('fileViewerContent').innerHTML = '<div style="color:#F2B8B5;padding:20px;text-align:center">Error: ' + e.message + '</div>';
  }
}
function closeFileViewer() {
  document.getElementById('fileViewerModal').style.display = 'none';
}

// Escape HTML
function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

`;

c = c.replace(
  '\n// Auto-advance OTP digits for login',
  jsInsert + '\n// Auto-advance OTP digits for login'
);

fs.writeFileSync(p, c);
console.log('OK - file viewer added');
