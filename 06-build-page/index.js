const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');
const myPath = path.resolve('06-build-page', 'project-dist');
const assetsPath = path.resolve('06-build-page', 'project-dist', 'assets');
const htmlPath = path.resolve('06-build-page', 'project-dist', 'index.html');
const cssPath = path.resolve('06-build-page', 'project-dist', 'style.css');
const assets = path.resolve('06-build-page', 'assets');
const html = path.resolve('06-build-page', 'template.html');
const components = path.resolve('06-build-page', 'components');
const styles = path.resolve('06-build-page', 'styles');

fs.mkdir(myPath, { recursive: true }, err => {
  if(err) throw err; 
});

fs.mkdir(assetsPath, { recursive: true }, err => {
  if(err) throw err; 
});

fs.writeFile(
  htmlPath,
  '',
  (err) => {
    if (err) throw err;
  }
);

fs.writeFile(
  cssPath,
  '',
  (err) => {
    if (err) throw err;
  }
);

async function createHtml() {
  try {
    let htmlComponents = await fsPromise.readdir(components, {withFileTypes: true});
    let htmlTemplate = await fsPromise.readFile(html);
    let htmlString = htmlTemplate.toString();
    let currentPart = '';
    for (let component of htmlComponents) {
      if (component.isFile() && path.extname(component.name) === '.html'){
        currentPart = await fsPromise.readFile(path.resolve(components, component.name));
        htmlString = htmlString.replace(`{{${component.name.slice(0, -5)}}}`, currentPart.toString());
      }
    }
    fsPromise.writeFile(htmlPath, htmlString);
  }  catch(err) {
    console.log((err)); 
  }
}

createHtml();

async function copyFiles(){
  try {
    const copiesDir = await fsPromise.readdir(assets, {withFileTypes: true});
    for (let copyDir of copiesDir) {
      let currentCopy = await fsPromise.readdir(path.resolve(assets, copyDir.name), { withFileTypes: true });
      fs.mkdir(path.resolve(assetsPath, copyDir.name), { recursive: true }, err => {
        if (err) throw err;
      });
      let copies = await fsPromise.readdir(path.resolve(assetsPath, copyDir.name), { withFileTypes: true });
      for (let copy of copies) {
        fs.unlink(path.resolve(assetsPath, copyDir.name, copy.name), function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
      for (let file of currentCopy) {
          fs.copyFile(path.resolve(assets, copyDir.name, file.name), path.resolve(assetsPath, copyDir.name, file.name), (err) => {
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

async function copyStyles() {
  try {
    let files = await fsPromise.readdir(styles, { withFileTypes: true });
    for (let file of files) {
      if (file.isFile() === true && path.extname(file.name) == '.css') {
        fs.readFile(path.resolve(styles, file.name), 'utf-8', (error, data) => {
          fs.appendFile(
            cssPath,
            data + '\n',
            err => {
              if (err) throw err;
            });
        });
      }
    }
  } catch (err) {
    console.log((err));
  }
}

copyStyles();