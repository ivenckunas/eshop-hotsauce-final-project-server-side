const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: String,
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  info: {
    type: String,
    required: true,
  },
  reviews: {
    type: Array
  },
  cartQty: {
    type: Number,
    default: 1,
  }
})

module.exports = mongoose.model('type12-products-final', productSchema)