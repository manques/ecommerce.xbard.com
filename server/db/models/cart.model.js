const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  _id: Schema.Types.ObjectId,
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', require: true } ,
      quantity: { type: Number }
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
