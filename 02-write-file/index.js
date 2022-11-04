const fs = require('fs');
const process = require('process');
const { stdin, stdout } = process;
const path = require('path');
let out = fs.createWriteStream(path.join(__dirname, 'file.txt'));
console.log('Пожалуйста, введите текст');

stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') {
    console.log('Вы решили выйти. До встречи!');
    process.exit();     
  }
  console.log('Пожалуйста, введите текст');
  out.write(data);  
});

process.stdin.resume();

process.on('SIGINT', () => {
  console.log('Удачи в изучении Node.js!');
  process.exit(); 
});