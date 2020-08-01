const fs = require('fs');

module.exports = {
  delete: (dir)=> {
    fs.unlinkSync(dir);
  }
}
