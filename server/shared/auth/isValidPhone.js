const { error400 } = require('../lib/error');

module.exports = (req, res, next) => {
  if(isNaN(Number(req.body.phone))){
    error400(
      res,
      'invalid phone number'
    );
  }
   next();
}
