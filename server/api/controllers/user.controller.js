const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../shared/config/config');
const User = require('../../db/models/user.model');
const error = require('../../shared/lib/error');
const response = require('../../shared/lib/response');
const getTokens = require('../../shared/auth/getTokens');
const nodemail = require('../../shared/mail/nodemailer');

//
const Wishlist = require('../../db/models/wishlist.model');
const Cart = require('../../db/models/cart.model');


// --------------  create account / signup  ---------------------
const create = (req, res, next) => {
  console.log(req);
      User.findOne({ email: req.body.email })
          .then(data => {
            console.log(data);
            if(data){
              if(data.isVerified) {
                return error.error409(res, 'email id already exist');
              } else {
                return error.error401(res, 'email id already exist -- not verified ');
              }
            } else {
              // create user
                  bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) next(err);
                    const user = new User({
                      _id: new mongoose.Types.ObjectId(),
                      name: req.body.name,
                      email: req.body.email,
                      phone: Number(req.body.phone),
                      password: hash,
                      isSeller: req.body.isSeller === '' ? false : true
                    });
                    // save
                    user.save()
                        .then( data => {
                          console.log(data);
                          if(data){
                            console.log(data);
                             //  nodemailer start
                            nodemail(req, res, next);
                             // end nodemailer
                            return response.response200(
                              res,
                               `your account is created - please verify  email ${req.body.email} - verification link send your account ${req.body.email} - link is expired 1 hour.`
                             ,
                              data
                            );
                          } else {
                            return error.error500(res, 'account not created!!');
                          }
                        })
                        .catch( err => {
                          console.log(err);
                          return error.error404(res, err);
                          error.error500(
                            res,
                            err.message || 'some error occurred while creating user'
                          );
                        });
                  });
            // end user
            }
          })
          .catch( err => {
            return error.error500(res, 'internal db server error - fetch email');
          });

}
// ------------------------  login user // generate tokens >>>>>>> (access-token ,  refresh-token) --------------

const login = (req, res, next) => {
  // is email id
  if(isNumber(req.body.username)){
    req.username = { email: req.body.username };
    responding(req, res, next);
  } else {
    req.username = { phone: req.body.username };
    responding(req, res, next);
  }
}

// isNumber
const isNumber = (x) => {
 return (isNaN(Number(x)) ? true : false);
}

const responding = (req, res, next) => {
  User.findOne(req.username)
       .then( data => {
          if(!data){
            // email id is no exist
            return error.error401(res, `User is not resgister of this id ${username}`);
          } else {
            // check password
            bcrypt.compare(req.body.password, data.password, (err, result) => {
              if(err){
                return  error.error500(res, 'db server error');
              } else {
                //  db valid
                if(result) {
                  const tokens = getTokens({
                    _id: data._id
                  });
                  return res.status(200).json(tokens);
                } else {
                  // wrong password
                 return error.error401(res, 'wrong password');
                }
              }
            });
          }
       })
       .catch(err => {
        return error.error500(res, ''+err);
       });
}

// ---------- profile ----------------------
const profile = (req, res, next) => {
 User.findOne({ _id: req._id })
     .select('name email phone isSeller image social -_id')
     .populate({ path: 'cart', populate: { path: 'products.product', model: 'Product' }})
     .populate({ path: 'wishlist', model: 'Wishlist',
                 populate: { path : 'products.product', model: 'Product' } })
     .then( data => {
        if(!data){
         return  error.error404(res, 'user data is not found');
        } else{
          // wishlistCreate(req._id);
          return response.response200(res, 'data fetch success', data);
        }
      }).catch( err => {
        return error.error500(res, 'server error: '+err);
      });
}
// -------------- refresh -----------------
const refresh = (req, res, next) => {
  const token = req.body.refreshToken ? req.body.refreshToken.slice(7) : '';
  try{
    const decoded = jwt.verify(token, process.env.refreshSecret);
    if(!decoded){
      return error.error401(res, 'refresh token invalid');
    } else {
      res.status(200).json(
        getTokens({ _id: decoded._id })
      );
    }
  } catch(err) {
    return error.error401(res, 'refresh: '+err);
  }
}

// -----------------  isSeller ---------------
const isSeller = (req, res, next) => {
  User.updateOne( { _id: req._id }, { $set: { isSeller: req.body.isSeller }})
      .then( data => {
        if(!data){
          return error.error401(res, 'update isSeller problem in db');
        } else {
          response.response200(res, 'isSeller update successful', data);
        }
      })
      .catch( (err) => {
        return error.error500(res, 'internal server error: '+err)
      });
}

//  -------------  background image ------------
const bgImage = (req, res, next) => {
  const background = `${config.protocol}${req.headers.host}/${req.file.path}`;
  User.updateOne( { _id: req._id }, { $set: { "image.background": background }})
      .then( data => {
        if(!data.n === 1){
          error.error501(res, 'db server found but not implements successful');
        } else{
          response.response200(res, 'backgroud image update successful', data);
        }
      }).catch( err => {
        error.error501(res, 'server update error: '+err);
      });
}
// ------------- profile picture ----------

const picture = (req, res, next) => {
  const pictureUrl = `${config.protocol}${req.headers.host}/${req.file.path}`;
  User.updateOne( { _id: req._id }, { $set: { "image.picture": pictureUrl }})
      .then( data => {
        if(!data.n === 1 ) {
          error.error501(res, 'db server found but not implemented successfule');
        } else {
          response.response200(res, 'profile picture update successful', data);
        }
      }).catch(err => {
        error.error501(res, 'db server update error:'+err);
      });
}

// ------- change password ----------
const changePassword = (req, res, next) => {
  User.findOne( { _id: req._id })
  .then( result => {
    if(!result){
        return error.error404(res, 'data is not found server');
    } else {
      bcrypt.compare(req.body.oldPassword, result.password, (err, isResult) => {
        if(err) error.error500(res, 'password bcrypt error: '+err);
        if(!isResult){
          return error.error401(res, 'wrong old password');
        } else {
          const hash = bcrypt.hashSync(req.body.newPassword, 10);
          User.updateOne( { _id: req._id}, { $set: { password: hash }})
          .then( resultant => {
            if(resultant.n === 1){
              response.response200(res, 'password changed', resultant);
            } else {
              error.error500(res, 'db server error ');
            }
          }).catch(
            err => { error.error500(res, 'db server error '+err); }
          );
        }
      })
    }
  }).catch(err => {
    return error.error500(res, 'internal server error'+err);
  });
}

//   ------------ update Profile -------
const updateProfile = (req, res, next) => {
    const reqData = req.body;
    if(reqData.social.length){
      const updateS = {};
      for(const key of reqData.social){
        if(reqData.social[key] === undefined && ! reqData.social[key]){
          // nothing happen
        } else {
          updateS[key] = reqData.social[key];
        }
      }
      reqData.social = updateS[key];
    }
    //  update user
    User.updateOne(
      { _id: req._id },
      { $set: reqData }
    ).then(
      result => {
        if(!result) {
          error.error400(res, 'update data unsuccessful');
        } else {
          response.response200(res, 'update profile successful', result);
        }
      }
    ).catch(
      err => error.error500(res, 'db server problem')
    );
}

//  --------------   confirmation token for email verification ----------------------
const confirmation = (req, res, next) => {
  const reqToken = req.query.token;
  const email = req.query.email;
  // check is already verified
  User.findOne({ email : email})
  .then( result => {
    if(!result) {
       return error.error404(res, 'user account not found in db')
      } else {
        if(result.isVerified === true){
          // account is already verified please login
          response.response200(res, `${email} is already verified - please login`);
        } else {
          //  check token for email verification
              jwt.verify(reqToken, process.env.nodemailerSecret, (err, decoded) => {
                if(err) {  return error.error498(res, 'email verfication link expired: ' +err); };
                if(!decoded){
                  return error.error498(res, 'email verfication link expired');
                } else {
                      //  verified
                      User.updateOne( { email: decoded.email }, { $set: { isVerified: true }})
                      .then( result => {
                        if(result.n === 1 ){
                          return response.response200(res, 'verification email is successful');
                        } else {
                          return error.error500(res, 'db update error: '+result);
                        }
                      })
                      .catch( err => { return error.error500(res, 'internal server error: '+ err); });

                }
              });
          //  end
        }
      }
  })
  .catch( err => { return error.error500(res, err)});
}

// resend email verification code

const resendEmailVerification = (req, res, next) => {
  User.findOne( { email: req.query.email })
      .then(data => {
        if(!data) {
          // not in db signup
          return error.error404(res, 'not found in db - signup  first')
        } else {
          if(data.isVerified) {
           return  response.response200(res, 'account is already verified - please login ');
          } else {
            //  resend by nodemailer
            nodemail(req, res, next);
            return response.response200(res,
                                        'email verification link send to your account',
                                        `- please verified ${req.query.email}`)
          }
        }
      })
      .catch( err => {
       return  error.error500(res, 'internal server error');
      });
}

// create wishlist & cart
function wishlistCreate(_id) {
  console.log(_id);
  // wishlist
  const wishlist = new Wishlist({
    _id: new mongoose.Types.ObjectId(),
  });
  wishlist.save().exec( (err, result) => {
    console.log(err);
    console.log(result);
    if(err){ console.log(err); }
    if(result){
      return updateUserByOtherSchema(_id, {
        $set: { wishlist: result._id }
      });
    }
  });
  //
}

function cartCreate(_id) {
   // cart
   const cart = new Cart({
    _id: new mongoose.Types.ObjectId(),
    products: []
  });
  cart.save().exec( (err, result) => {
    if(err) { console.log(err); }
    if(result){
      cart.save().exec( (err, result) => {
        if(err) {console.log(err);}
        if(result) {
          return updateUserByOtherSchema(_id, {
            $set: { cart: result._id }
          });
        }
      });
    }
  });
}

function updateUserByOtherSchema(_id, updateObj) {
  User.updateOne( { _id: _id }, updateObj)
      .exec( (err, result) => {
        console.log(err);
        console.log(result);
        if(err) {console.log(err);}
        console.log(result);
        return;
      });
}

module.exports = {
  create,
  login,
  profile,
  refresh,
  isSeller,
  bgImage,
  picture,
  changePassword,
  updateProfile,
  confirmation,
  resendEmailVerification
};
