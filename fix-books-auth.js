const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\server.js';
let c = fs.readFileSync(p, 'utf8');
const oldBlock = "if (pathname.startsWith('/api/gateway/') ||\n      pathname.startsWith('/api/logs') ||\n      pathname.startsWith('/api/system/') ||\n      pathname.startsWith('/api/openclaw/') ||\n      pathname.startsWith('/api/command/') ||\n      pathname.startsWith('/api/workspace/') ||\n      pathname.startsWith('/api/podman/')) {";
const newBlock = "if (pathname.startsWith('/api/auth/') ||\n      pathname.startsWith('/api/gateway/') ||\n      pathname.startsWith('/api/logs') ||\n      pathname.startsWith('/api/system/') ||\n      pathname.startsWith('/api/openclaw/') ||\n      pathname.startsWith('/api/command/') ||\n      pathname.startsWith('/api/workspace/') ||\n      pathname.startsWith('/api/podman/')) {";
c = c.replace(oldBlock, newBlock);
fs.writeFileSync(p, c);
console.log('OK - auth route added');
