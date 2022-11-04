const fs = require('fs');
const path = require('path');
const myPath = path.resolve('03-files-in-folder', 'secret-folder');

fs.readdir(myPath, 
  { withFileTypes: true },
  (err, files) => {
  console.log("\nCurrent directory files:");
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile() === true) {
        const newPath = path.resolve(myPath, file.name);
        fs.stat(newPath, (error, stats) => {
          console.log(`${file.name.split('.').slice(0, -1).join('.')} - ${path.extname(file.name)} - ${stats.size} bytes`);
        });
      }
      else if (file.isDirectory() === true) {
        return;
          }
      })
    }
})