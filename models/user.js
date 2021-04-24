const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('user', {
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    validate(str){
      if (!validator.isEmail(str)){
        throw new Error('Invalid email');
      }
    }
  },
});
module.exports = User;