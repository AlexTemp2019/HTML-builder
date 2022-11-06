'use strict';
const path = require('path');
const stylesDir = path.join(__dirname, 'styles');
const projectDir = path.join(__dirname, 'project-dist');
const compoDir = path.join(__dirname, 'components');
const assetsDir = path.join(__dirname, 'assets');
const assetsCopyDir = path.join(projectDir, 'assets');
const stylesCopyFile = path.join(projectDir, 'style.css');
const fs = require('fs');

function handleError(err) {
  console.log(err);
  process.exit(0);
}

function createTemplate() {
  fs.copyFile(
    `${__dirname}\\template.html`,
    `${projectDir}\\index.html`,
    function (err) {
      if (err) {
        handleError(err);
      }
      fs.readFile(`${projectDir}\\index.html`, 'utf8', function (err, data) {
        if (err) {
          handleError(err);
        }
        fs.readdir(compoDir, { withFileTypes: true }, function (err, files) {
          if (err) {
            handleError(err);
          }

          files.forEach(function (file) {
            fs.readFile(
              `${compoDir}\\${file.name}`,
              'utf8',
              function (err, dataFile) {
                if (err) {
                  handleError(err);
                }
                const tagName = `{{${file.name.split('.')[0]}}}`;
                data = data.replace(tagName, dataFile);
                fs.writeFile(`${projectDir}\\index.html`, data, function (err) {
                  if (err) {
                    handleError(err);
                  }
                });
              }
            );
          });
        });
      });
    }
  );
}

function createCopy(dir, exit) {
  fs.readdir(dir, { withFileTypes: true }, function (err, files) {
    if (err) {
      handleError(err);
    }
    files.forEach(function (file) {
      if (!file.isFile()) {
        fs.stat(path.join(exit, file.name), function (err) {
          if (err) {
            fs.mkdir(path.join(exit, file.name), function (err) {
              if (err) {
                return console.error(err);
              }
            });
            createCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
          } else {
            createCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
          }
        });
      } else {
        fs.copyFile(
          `${dir}\\${file.name}`,
          `${exit}\\${file.name}`,
          function (err) {
            if (err) {handleError(err);}
          }
        );
      }
    });
  });
}

function createCSS(original, copy){
  fs.readdir(stylesDir, { withFileTypes: true }, async (err, files) => {
    if (err) {
      handleError(err);
    } else {
      files.forEach(function (file, index) {
        const filePath = path.join(original, file.name);
        if (file.isFile() && path.parse(file.name).ext === '.css') {
          fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
              handleError(err);
            } else if (index === 0) {
              fs.writeFile(
                copy,
                data,
                function (err) {
                  if (err) {
                    handleError(err);
                  }
                }
              );
            } else {
              fs.appendFile(
                copy,
                data,
                function (err) {if (err) {
                  handleError(err);
                }
                }
              );
            }
          });
        }
      });
    }
  });

}

function createAssets(original, copy){
  fs.stat(copy, function (err) {
    if (err) {
      fs.mkdir(copy, function (err) {
        if (err) {
          {
            handleError(err);
          }
        }
      });
      createCopy(original, copy);
    } else {
      createCopy(original, copy);
    }
  });

}

function createHTML(copy){
  fs.stat(copy, function (err) {
    if (err) {
      fs.mkdir(copy, function (err) {
        if (err) {
          {
            handleError(err);
          }
        }
      });
      createTemplate();
    } else {
      fs.readdir(copy, function (err) {
        if (err) {
          handleError(err);
        }
        else {
          createTemplate();
        }
      });
    }
  });

}

createHTML(projectDir);
createCSS(stylesDir, stylesCopyFile);
createAssets(assetsDir, assetsCopyDir);







