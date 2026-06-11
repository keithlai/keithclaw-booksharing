const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\keithclawviewer\\container\\public\\index.html';
let c = fs.readFileSync(p, 'utf8');

// Find the login overlay closing and add file viewer modal
const marker = 'loginSpinner" style="display:none"><div class="spinner"></div></div>\n  </div>\n</div>\n\n<div class="app-bar">';
const modalHtml = 'loginSpinner" style="display:none"><div class="spinner"></div></div>\n  </div>\n</div>\n\n<!-- File Viewer Modal -->\n' +
'<div id="fileViewerModal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9998;align-items:center;justify-content:center" onclick="if(event.target===this)closeFileViewer()">\n' +
'  <div style="background:var(--bg);border-radius:20px;width:95%;max-width:800px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 8px 40px rgba(0,0,0,0.4)">\n' +
'    <div style="display:flex;align-items:center;padding:16px 20px;border-bottom:1px solid var(--border)">\n' +
'      <div style="flex:1;font-weight:600;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" id="fileViewerTitle"></div>\n' +
'      <button onclick="closeFileViewer()" style="background:none;border:none;color:var(--fg2);cursor:pointer;font-size:20px;padding:4px">&#x2715;</button>\n' +
'    </div>\n' +
'    <div style="flex:1;overflow-y:auto;padding:20px 24px;line-height:1.85;font-size:15px;font-family:Georgia,Times New Roman,serif;white-space:pre-wrap;word-wrap:break-word" id="fileViewerContent">\n' +
'      <div class="spinner"></div>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n\n<div class="app-bar">';

if (c.includes(marker)) {
  c = c.replace(marker, modalHtml);
  fs.writeFileSync(p, c);
  console.log('OK - modal HTML added');
} else {
  console.log('Marker not found, trying to find it...');
  const idx = c.indexOf('loginSpinner');
  if (idx >= 0) {
    const snippet = c.substring(idx, idx + 200);
    console.log('Found loginSpinner at', idx);
    console.log('Snippet:', JSON.stringify(snippet));
  } else {
    console.log('loginSpinner not found at all');
  }
}
