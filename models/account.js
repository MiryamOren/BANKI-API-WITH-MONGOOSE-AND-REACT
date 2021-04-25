const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./user')

const Account = mongoose.model('account', {
  accountHolderID: {
    type: String,
    required: true,
    minlength: 24,
    maxlength: 24,
  },
  credit: {
    type: Number,
    default: 0,
    min: 0,
  },
  cash: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});
module.exports = Account;