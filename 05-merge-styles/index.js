'use strict';
const path = require('path');
const fs = require('fs');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const styles = path.join(__dirname, 'styles');

fs.readdir(styles, 'utf-8', function (err, files) {
  if (err) {
    console.log('Error', err.message);
    process.exit(0);
  }
  fs.writeFile(bundle, '', function (err) {
    if (err) {
      console.log('Error', err.message);
      process.exit(0);
    }
  });  
  files.forEach(function (file) {
    if (path.parse(path.join(styles, file)).ext === '.css') {
      const rs = fs.createReadStream(path.join(styles, file));
      rs.on('data', function (data) {
        fs.appendFile(bundle, data, function (err) {
          if (err) {
            console.log('Error', err.message);
            process.exit(0);
          }
        });
      });
    }
  });
});
