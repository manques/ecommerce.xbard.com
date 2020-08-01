const Wishlist = require('../../db/models/wishlist.model');
const User = require('../../db/models/user.model');
const mongoose = require('mongoose');
const error = require('../../shared/lib/error');
const response = require('../../shared/lib/response');

// add wishlist
const addWishlist = (req, res, next) => {

  options = {
    _id: req._id,
    product: req.params._id
  };
  console.log(options);
  User.findOne({ _id: options._id})
      .exec((err, result) => {
        if(err) return error.error500(res, err);
        if(!result) {
          console.log(result);
          return error.error404(res, 'user not found');
        } else {
          if(!result.wishlist){
            console.log('----  not result --------');
            createWishlist(options, res);
          } else {
            console.log('----   result --------');

            Wishlist.updateOne( { _id: result.wishlist }, {
              $push: { products: { product: options.product } }
            }).exec( (err, result1) => {
              if(err) return error.error500(res, err);
              if(!result1){
                return error.error404(res, 'wishlist not found');
              } else {
                console.log(result1);
                return response.response200(res, 'wishlist added product', result1);
              }
            });
          }
        }
      });

}

// create wishlist
function createWishlist(options, res) {
  const wishlist = new Wishlist({
    _id: new mongoose.Types.ObjectId(),
    products: [{
      product: options.product
    }]
  });
  wishlist.save()
          .then((result) => {
            console.log(result);
            // if(err) return error.error500(res, err);
            if(!result){
              return error.error404(res, 'not found db');
            } else {
             User.updateOne({ _id: options._id }, { $push: { wishlist: result._id }})
                 .exec((err, data) => {
                   if(err) return error.error500(res, err);
                   if(!data) {
                     return error.error404(res, 'update user wishlist');
                   } else {
                    return response.response200(res, 'wishlist save', {
                      wishlist: result, user: data
                    });
                   }
                 });
            }
          });
}

// remove wishlist
const removeWishlist = (req, res, next) => {
  console.log(req.params);
  options = {
    _id: req._id,
    product: req.params._id
  };
  console.log(options);
  User.findOne( { _id: options._id })
      .exec( (err, result) => {
        if(err) return error.error500(res, err);
        if(!result.wishlist){
          return error.error500(res, 'wishlist is not found');
        } else {
          console.log(result);
          Wishlist.updateOne( { _id: result.wishlist._id }, {
            $pull: { products: { product: options.product }}
          }).exec( (err, result1) => {
            console.log(result1);
            if(err) return error.error500(res, err);
            if(!result1) {
              return error.error404(res, 'problem remove wishlist');
            } else {
              return response.response200(res, 'remove success', result1);
            }
          });
        }
    });
}

const list  = (req, res, next) => {
  const options = {
    _id: req._id
  };
  User.findOne({ _id: options._id})
      .select('wishlist')
      .populate({
        path: 'wishlist', model: 'Wishlist',
        populate: { path: 'products.product', model: 'Product'}
      })
      .then( result => {
        response.response200(res, 'wishlist', result);
      });
}
module.exports = {
  addWishlist,
  removeWishlist,
  list
};



