const multer = require('multer');
const fs = require('fs');
const userFSOperation = require('../file-system/user/userFSOperation');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const dir = userFSOperation(req);
      cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}--${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

module.exports = {
  upload
}
