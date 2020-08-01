const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const error = require('../lib/error');

module.exports = (req, res, next) => {
  console.log('nodemailer start');
  // transporter object
  console.log(process.env.nodemailerPass);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.nodemailerUser,
      pass: process.env.nodemailerPass
    }
  });
  console.log(transporter);
  const confirmationToken = jwt.sign({ email: req.body.email || req.query.email },
                                     process.env.nodemailerSecret,
                                     { expiresIn: 60 * 60 });
  const link = `${req.headers.origin}/confirmation/?id=${req.body.email || req.query.email}&token=${confirmationToken}`;


  // mail options
  const mailOptions = {
    from: 'no-reply@helpect.com',
    to: req.body.email || req.query.email,
    subject: 'Confirm your email account',
    html: `
        <div style="width: 500px; height: auto; display: flex; justify-content: center; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; color: #3f51b5;">
          <div style="width: 400px; padding: 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border-radius: 10px;">
            <div style="display: flex; justify-content: center">
              <img src="https://avatars0.githubusercontent.com/u/20739204?s=460&u=4c17c750e0e3c32af1dcbc6b4071c9092fa4d1e2&v=4" style="width: 100px; height: 100px;">
            </div>
            <div style="display: flex; justify-content: center; margin: 0px; padding: 0px;">
              <h2 style="text-align: center; margin: 0px; padding: 5px;">Helpect</h2>
            </div>
            <div style="display: flex; justify-content: center; margin: 0px; padding: 0px;">
              <h3 style="text-align: center; margin: 0px; padding: 3px;">Please confirm your email id</h3>
            </div>
            <div style="display: flex; justify-content: center; margin: 0px; padding: 0px;">
              <h3 style="text-decoration: none; margin: 0px; padding: 0px;">
                <a style="text-decoration: none; margin: 0px; padding: 2px;" href="${link}">click here</a>
              </h3>
            </div>
          <div>
        </div>
      `
  };
  console.log(confirmationToken);

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      console.log(err);
      console.log('nodemailer err');
      return error.error500(res, 'nodemailer error: '+err);
    } else {
      console.log(info);
      console.log('nodemailer success');
      next();
    }
  });
}
