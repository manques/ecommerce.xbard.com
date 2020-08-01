module.exports = (req, res, next ) => {
  console.log('--headers--');
  console.log(req.headers);
  console.log('--body--');
  console.log(req.body);
  console.log('--file--');
  console.log(req.file);
  console.log('--params--');
  console.log(req.params);
  console.log('--isEmail--');
  console.log(req.isEmail);
  console.log('--isPhone--');
  console.log(req.isPhone);
  next();
}
