const Cart = require('../../db/models/cart.model');
const mongoose = require('mongoose');
const User = require('../../db/models/user.model');
const error = require('../../shared/lib/error');
const response = require('../../shared/lib/response');

const addItem = (req, res, next) => {
  console.log(req.body);
  options = {
    _id: req._id,
    product: req.body.productId,
    quantity: req.body.quantity
  };
  User.findOne({_id: options._id})
      .populate({
        path: 'cart', model: 'Cart',
        populate: { path: 'products.product', model: 'Product'}
      })
      .exec((err, result) => {
        console.log(result);
        if(err) return error.error500(res, err);
        if(!result){
          return error.error404(res, 'user not found');
        } else {
          if(!result.cart){
            console.log('no');
            createCart(options, res);
          } else {
            console.log('yes');
            updateCart(options, res, result.cart);
          }
        }
      });
}

// update cart

function updateCart(options, res, cart) {
 let isProduct = cart.products.some( element =>  (element.product._id).toString() === (options.product).toString());
  console.log(isProduct);
  if(isProduct) {
    const query = {
                    $inc: { 'products.$.quantity' : options.quantity }
                  };
    console.log('increment');
    updateProductQuantity(options, res, cart, query);
  } else {
    //
   const query = { $push: { products: { product: options.product, quantity: options.quantity } } };
   console.log('update');
   updateCartFinal(options, res, cart, query);
    //
  }
}
// cart increment product quantity  final
function updateProductQuantity(options, res, cart, query) {
  console.log(cart);
  console.log(query);
  console.log(options);
  const query1 = {
                  _id: cart._id,
                  "products.product": options.product
                };
  console.log(query1);
  Cart.updateOne(query1, query)
      .then((result) => {
          // console.log(err);
          console.log(result);
          // if(err)
          if(!result) {
            return error.error404(res, 'problem update item in cart');
          } else {
            return response.response200(res, 'item  is add to cart', result);
          }
      }).catch( err => {
        console.log(err);
        return error.error500(res, err);
      });
}



// cart update push product final
function updateCartFinal(options, res, cart, query) {
  console.log(cart);
  console.log(query);
  console.log(options);
  const query1 = {
                  _id: cart._id,
                };
  console.log(query1);
  Cart.updateOne(query1, query)
      .then((result) => {
          // console.log(err);
          console.log(result);
          // if(err)
          if(!result) {
            return error.error404(res, 'problem update item in cart');
          } else {
            return response.response200(res, 'item  is add to cart', result);
          }
      }).catch( err => {
        console.log(err);
        return error.error500(res, err);
      });
}
// create cart
function createCart(options, res){
  const cart = new Cart({
    _id: new mongoose.Types.ObjectId(),
    products: [{
      product: options.product,
      quantity: options.quantity
    }]
  });
  // save
  cart.save()
       .then((result) => {
          if(!result){
            return error.error404(res, 'cart creation problem');
          } else {
            User.updateOne(
                { _id: options._id,  },
                {
                  $set: { cart: result._id }
                })
                .exec((err, result1) => {
                  console.log(result1);
                  if(err) return error.error500(res, err);
                  if(!result) {
                    return error.error404(res, 'update user id problem');
                  } else {
                    return response.response200(res, 'create cart & update product', result1);
                  }
                });
          }
       });
}
// delete item form cart
const removeItem = (req, res, next) => {
  console.log('=================================================');
  options = {
    _id: req._id,
    product: req.params._id
  };
  console.log(options);
  // find cartid
  User.findOne( { _id: options._id } )
      .then(result => {
        console.log(result);
        return result.cart;
      })
      .then( result => {
        console.log(result);
        Cart.updateOne( { _id: result }, {
          $pull: { products: { product: options.product } }
        }).then( data => {
          console.log(data);
          response.response200(res, 'delete', data);
        } );
      }).catch( err => { return error.error500(res, err); });
};
// change quantity
const changeQuantity = (req, res, next) => {
  let options = {
    userId: req._id,
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  // get cart id
  User.findOne( { _id: options.userId } )
      .then(result => {
        console.log(result);
        // update quantity of cart
        Cart.updateOne(
          { _id: result.cart, 'products.product': options.productId },
          { $set: { 'products.$.quantity': options.quantity } }
        ).then(resultant => {
          console.log(resultant);
          response.response200(res, 'cart quantity successful', resultant);
        });
      });
}

module.exports = {
  addItem,
  removeItem,
  changeQuantity
};
