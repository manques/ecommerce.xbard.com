const fs  = require('fs');

module.exports = {
  // create folder
  create: (dir) => {
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  }
};
