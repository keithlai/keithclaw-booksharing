const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\Administrator\\workspace-dev\\books\\server.js', 'utf8');
c = c.replace(
  "if (pathname.startsWith('/api/gateway/') ||\n      pathname.startsWith('/api/logs') ||\n      pathname.startsWith('/api/system/') ||\n      pathname.startsWith('/api/openclaw/') ||\n      pathname.startsWith('/api/command/') ||\n      pathname.startsWith('/api/workspace/') ||\n      pathname.startsWith('/api/podman/')) {",
  "if (pathname.startsWith('/api/auth/') ||\n      pathname.startsWith('/api/gateway/') ||\n      pathname.startsWith('/api/logs') ||\n      pathname.startsWith('/api/system/') ||\n      pathname.startsWith('/api/openclaw/') ||\n      pathname.startsWith('/api/command/') ||\n      pathname.startsWith('/api/workspace/') ||\n      pathname.startsWith('/api/podman/')) {"
);
fs.writeFileSync('C:\\Users\\Administrator\\workspace-dev\\books\\server.js', c);
console.log('OK');
