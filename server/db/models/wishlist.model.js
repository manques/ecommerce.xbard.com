const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  _id: Schema.Types.ObjectId,
  products: [{
    product: Schema.Types.ObjectId
  }]
});


module.exports = mongoose.model('Wishlist', wishlistSchema);
