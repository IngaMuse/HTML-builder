const fs = require('fs');
const path = require('path');
const myPath = path.resolve('01-read-file', 'text.txt');

let readableStream = fs.createReadStream(myPath, 'utf8'); 
let data = '';
readableStream.on('data', chunk => data+=chunk);
readableStream.on('end', () => console.log(data));