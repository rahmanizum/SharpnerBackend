console.log(`Hello from Node.js`);

const fs = require('node:fs');
fs.writeFileSync(`Hello.txt`,`Hello from Node.js`);
