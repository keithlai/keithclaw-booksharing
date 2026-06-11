const https = require('https');
const fs = require('fs');
const path = require('path');

// I'll input the token directly from user's message
// The user typed: ghp_J4... (with actual characters)
// I need to use whatever the user actually typed

function uploadFile(filePath, token) {
  const content = fs.readFileSync(filePath, 'utf8');
  const encoded = Buffer.from(content).toString('base64');
  const apiPath = '/repos/keithlai/keithclawviewer/contents/' + filePath.split('\\').pop();

  return new Promise((resolve) => {
    const body = JSON.stringify({
      message: 'Add ' + path.basename(filePath),
      content: encoded,
      branch: 'main'
    });
    const req = https.request({
      hostname: 'api.github.com',
      path: apiPath,
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'User-Agent': 'keith-push',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        resolve({ status: res.statusCode, data: d.slice(0, 80) });
      });
    });
    req.on('error', e => resolve({ status: 0, data: e.message }));
    req.write(body);
    req.end();
  });
}

// I'll prompt for the token
console.log('PASTE_YOUR_TOKEN:');
process.stdin.once('data', (buf) => {
  const token = buf.toString().trim();
  console.log('Token length: ' + token.length);
  console.log('Token start: ' + token.slice(0, 10) + '...');
  console.log('Token end: ...' + token.slice(-10));
  
  const files = [
    'C:\\Users\\Administrator\\workspace-dev\\SOUL.md',
    'C:\\Users\\Administrator\\workspace-dev\\AGENTS.md',
    'C:\\Users\\Administrator\\workspace-dev\\TOOLS.md',
    'C:\\Users\\Administrator\\workspace-dev\\USER.md',
    'C:\\Users\\Administrator\\workspace-dev\\IDENTITY.md'
  ];
  
  (async () => {
    for (const f of files) {
      if (!fs.existsSync(f)) { console.log('SKIP ' + path.basename(f)); continue; }
      const r = await uploadFile(f, token);
      console.log((r.status === 201 ? '✅' : '❌(' + r.status + ')') + ' ' + path.basename(f));
    }
  })();
});
