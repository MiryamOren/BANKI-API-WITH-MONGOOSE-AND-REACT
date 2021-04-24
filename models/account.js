const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./user')

const Account = mongoose.model('account', {
  accountHolderID: {
    type: String,
    required: true,
    minlength: 24,
    maxlength: 24,
    // validator(userID){
    //   const isValid = async () => {
    //     try {
    //       const user = await User.findById(userID);
    //       if (!user) {
    //           throw new Error('Account holder not found');
    //       }
    //     } catch (e) {
    //       throw new Error(e)
    //     }
    //   }
    //   isValid();
    // },
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