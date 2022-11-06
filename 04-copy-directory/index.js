
'use strict';
const path = require('path');
const fs = require('fs/promises');
const dir = path.join(__dirname, 'files');
const dcopy = path.join(__dirname, 'files-copy');

fs.rm(dcopy, {
  recursive: true,
  force: true,
}).finally(function () {
  fs.mkdir(dcopy, {
    recursive: true,
  });
  fs.readdir(dir, {
    withFileTypes: true,
  }).then(function (data) {
    data.forEach(function (item) {
      if (item.isFile()) {
        const pathFile = path.join(dir, item.name);
        const pathCopy = path.join(dcopy, item.name);
        fs.copyFile(pathFile, pathCopy);
      }
    });
  });
});
