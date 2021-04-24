const mongoose = require('mongoose');
const validator = require('validator');
const Account = require('./account');

const Transaction = mongoose.model('transaction', {
  accountID: {
    type: String,
    required: true,
    validator(accountID){
      try {
        const account = await Account.findById(accountID);
        if (!account) {
            throw new Error('Account not found');
        }
      } catch (e) {
        throw new Error(e)
      }
    },
  },
  transactionType:{
    type: String,
    require: true,
    validate(type){
      const types = ['transfer', 'withdraw', 'deposit'];
      if (!types.includes(type)){
        throw new Error('Invalid transaction type');
      }
    }
  },
  amount: {
    type: Number,
    require: true,
    min: 0,
  },
  toAccount: {
    type: String,
    validator(accountID){
      try {
        const account = await Account.findById(accountID);
        if (!account) {
            throw new Error('Account not found');
        }
      } catch (e) {
        throw new Error(e)
      }
    },
  }

});
module.exports = Transaction;