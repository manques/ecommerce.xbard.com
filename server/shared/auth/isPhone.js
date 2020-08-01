const User = require('../../db/models/user.model');

module.exports = (req, res, next) => {
  User.findOne({ phone: req.body.phone })
      .then( data => {
        console.log(data);
        req.isPhone = true;
        next();
      })
      .catch(err => {
        console.log(err);
        req.isPhone = false;
        next();
      });
}
