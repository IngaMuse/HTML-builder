const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');
const myPath = path.resolve('04-copy-directory', 'files');
const myCopyPath = path.resolve('04-copy-directory', 'files-copy');

fs.mkdir(myCopyPath, { recursive: true }, err => {
  if(err) throw err;
});

async function copyFiles(){
  try {
    const copies = await fsPromise.readdir(myCopyPath, {withFileTypes: true});
    for (let copy of copies){
      fs.unlink(path.resolve(myCopyPath, copy.name), function(err){
        if (err) {
          console.log(err);
        } 
      });
    }
    const files = await fsPromise.readdir(myPath, {withFileTypes: true});
    for (const file of files) {
      if (file.isFile()){
        fs.copyFile(path.resolve(myPath, file.name), path.resolve(myCopyPath, file.name), (err) => {
          if (err) {
            console.log('Error Found:', err);
          }   
        });
      }
    }
  } catch(err) {
    console.log((err)); 
  }
}

copyFiles();