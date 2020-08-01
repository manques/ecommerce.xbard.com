const mongoose = require('mongoose');
const { schema } = require('./category.model');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId,ref: 'Category', required: true },
  quantity: { type: String, required: true },
  wishlist: { type: Boolean, default: false },
  image: {
    main: { type: String, required: true },
    gallery: [{ type: String, required: true }]
  },
  description: {
    short: { type: String, required: true },
    long: { type: String, required: true },
    features: [{
      title: { type: String },
      value: { type: String }
    }]
  },
  address: { type: Schema.Types.ObjectId, ref: 'Address' },
  sale: { type: Boolean, default: false },
  weight: {
    value: { type: Number },
    units: { type: String }
  },
  dimensions: {
    length: { type: Number },
    breadth: { type: Number },
    height: { type: Number },
    units: { type: String }
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  tags: { type: String },
  created: { type: Date, default: new Date() }
});


module.exports = mongoose.model('Product', productSchema);
