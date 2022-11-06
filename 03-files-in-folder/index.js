'use strict';
const fs = require('fs');
const path = require('path');
const name = path.resolve(__dirname, 'secret-folder');

fs.readdir(name, { withFileTypes: true }, function (err, items) {
  if (err) {
    console.log('Error', err.message);
    process.exit(0);
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].isFile() === true) {
      fs.stat(
        `03-files-in-folder/secret-folder/${items[i].name}`,
        (err, stats) => {
          if (err) {
            console.log('Error', err.message);
            process.exit(0);
          }
          console.log(
            `${items[i].name.split('.').slice(0, -1).join('')} - ${path
              .extname(items[i].name)
              .replace('.', '')} - ${Math.round(stats.size / 1024)} kb`
          );
        }
      );
    }
  }
});
