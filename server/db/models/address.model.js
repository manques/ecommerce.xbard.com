const mongoose = require('mongoose');
const { model } = require('./category.model');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  _id: Schema.Types.ObjectId,
    name: { type: String, require: true },
    phone: { type: Number, require: true },
    country: { type: String, require: true },
    state: { type: String, require: true },
    district: { type: String, require: true },
    address: { type: String, require: true },
    pincode: { type: Number, require: true },
    locality: { type: String, require: true },
    landmark: { type:  String },
    alternativePhone: { type: Number, require: true },
    addressType: { type: String, enum: ['home', 'office'], require: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Address', addressSchema);


