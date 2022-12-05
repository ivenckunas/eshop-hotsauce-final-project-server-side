const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  hashedPsw: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('type12-users-final', userSchema)