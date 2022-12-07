const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPsw: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  orders: Array
})

module.exports = mongoose.model('type12-users-final', userSchema)