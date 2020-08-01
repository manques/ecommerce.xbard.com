const fs = require('fs');
const path = require('path');

module.exports = (req) => {
  const pathDir = `./uploads/products${req.body.path}/${req.body.name} -- ${req.body.sku}`;
  if(!fs.existsSync(pathDir)){
    fs.mkdirSync(pathDir, { recursive: true });
  } else {
    const files = fs.readdirSync(pathDir);
    while(files.length > 10) {
      let tt = Infinity ;
      let tFile = null;
      let tIndex = -100;
      files.forEach( (file, index) => {
        let time = file.split('--').pop().split('.');
          time.pop();
          time = time.join('.');
          time = time.split('T');
          time = new Date(time[0] + ', '+time[1]);
          time = time.getTime();
        if(Number(time) < tt) {
          tt = time;
          tFile = file;
          tIndex = index;
        }
      });
      fs.unlinkSync(`${pathDir}/${tFile}`);
      files.splice(tIndex, 1)
    }
  }
  return pathDir;
}
