var fs = require('fs');

module.exports = {
  create: (req, res, next) => {

    const arr = req.baseUrl.split('/');
    const n = arr.length;

    if(n > 1){
      const subdir = arr[n-1];
      console.log(subdir);
      let dir = `./uploads/${subdir}`;
      // create dir
      if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
    }
    next();
  }
}
