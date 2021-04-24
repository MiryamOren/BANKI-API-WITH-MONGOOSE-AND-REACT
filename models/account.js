const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./user')

const Account = mongoose.model('account', {
  AccountHolderID: {
    type: String,
    required: true,
    validator(userID){
      try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).send('Account holder not found')
        }
      } catch (e) {
        res.status(400).send(e)
      }
    },
  },
  credit: {
    type: Number,
    default: 0,
  },
  cash: {
    type: Number,
    default: 0,
  }
});
module.exports = Account;