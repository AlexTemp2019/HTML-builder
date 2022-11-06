'use strict';
const path = require('path');
const fs = require('fs');
const output = fs.createWriteStream(path.join(__dirname, 'log.txt'));
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Please enter the text:', () => {});
rl.on('line', (input) => {
  if (input.toString().trim() === 'exit') {
    rl.write('You have entered an exit command. See you!');
    rl.close();
  } else {
    output.write(input + '\n');
  }
});
