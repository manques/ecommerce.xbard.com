const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'normal' }, // normal(buyer), admin,
  isSeller: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  wishlist: { type: Schema.Types.ObjectId, ref: 'Wishlist' },
  address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  image: {
    background: { type: String },
    picture: { type: String }
  },
  social: {
    facebook: { type: String },
    twitter: { type: String },
    github: { type: String },
    instagram: { type: String }
  }
});

module.exports = mongoose.model('User', userSchema);
