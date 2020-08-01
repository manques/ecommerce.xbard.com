const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: { type: String, required: true, unique: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Category'},
  isVerify: { type: Boolean, default: true }
});


module.exports = mongoose.model('Category', categorySchema);
