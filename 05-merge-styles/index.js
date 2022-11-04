const fs = require('fs');
const path = require('path');
const myPath = path.resolve('05-merge-styles', 'project-dist', 'bundle.css');
const stylePath = path.resolve('05-merge-styles', 'styles');

fs.writeFile(
  myPath,
  '',
  (err) => {
    if (err) throw err;
  });

fs.readdir(stylePath, {withFileTypes: true}, function(err, files) {
  for (let file of files) {
    if (file.isFile() === true && path.extname(file.name) == '.css') {
      fs.readFile(path.resolve(stylePath, file.name), 'utf-8', (error, data) => {
        data = data + '\n';
        fs.appendFile(
          myPath,
          data,
          err => {
            if (err) throw err;
          });
      });
    }
  }
});