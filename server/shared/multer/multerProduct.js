const multer = require('multer');
const createDir = require('../../shared/file-system/product/product-create.path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, `${ createDir(req)}`);

  },
  filename: (req, file, cb) => {
    const filename = file.originalname.split('.'+file.originalname.split('.').pop())[0];
    cb(null,
      `${filename} -- ${ new Date().toISOString()}.${file.mimetype.split('/')[1]}`);
  }
});

const upload = multer({
  storage: storage
});


module.exports = upload;
