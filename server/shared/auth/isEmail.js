const User = require('../../db/models/user.model');

module.exports = (req, res, next) => {
  console.log('route2');
  User.findOne( { email: req.body.email })
      .then( data => {
        console.log(data);
        req.isEmail = true;
        next();
      })
      .catch( err => {
        console.log(err);
        req.isEmail = false;
        next();
      });
      console.log('route2 end');
}
