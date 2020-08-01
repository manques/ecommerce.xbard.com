const jwt = require('jsonwebtoken');
const error = require('../lib/error');

module.exports = (req, res, next) => {
  console.log(req.body);
  const token = req.headers.authorization ? req.headers.authorization.slice(7) : '';
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    console.log(decoded);
    if(!decoded){
      console.log('no decoded');
      return error.error401(res, 'unauthorized user');
    } else {
      req._id = decoded._id;
      next();
    }
  } catch(err){
    console.log(err);
    return error.error401(res, 'jwt expired!!!:' + err);
  }
}
