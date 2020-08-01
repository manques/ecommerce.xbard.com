const bcrypt = require('bcrypt');

module.exports = (pass, req, res, next) => {
  bcrypt.hash(pass, 10, (err, hash) => {
    if(err) error.error500(res, err);
    if(!hash){
      return error.error500(res, err);
    } else {
      req._hash = hash;
      next();
    }
  });
}
