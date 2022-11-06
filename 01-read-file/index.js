'use strict';
const fs = require('fs');
const path = require('path');
const name = path.resolve(__dirname, 'text.txt');
const rs = fs.createReadStream(name, 'utf8');

let data = '';

rs.on('data', (chunk) => (data += chunk));
rs.on('end', () => console.log(data));
rs.on('error', (err) => {
  console.log('Error', err.message);
  process.exit(0);
});
