const fs = require('fs');
const path = require('path');

module.exports = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach( file => {
    console.log(file);
      const dirFiles = path.join(dir, file);
      fs.unlinkSync(dirFiles);
  });
}
