const mongoose = require('mongoose');
const validator = require('validator');


const Product = mongoose.model('product', {
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
  },
  isActive: { 
    type: Boolean,
    default: true
  },
  details: {
    description: { 
      type: String,
      required: true,
      minLength: 10,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    images: {
      type: [{type: String }],
      validate(array){
        if (array.length < 2){
          throw new Error('There must be at least two pictures.')
        }
      }
    },
    phoneNumber: {
      type: String,
      required: true,
      validate(str){
        if (!validator.isMobilePhone(str, "he-IL")) {
          throw new Error("phone number most be a valid isrealy phone number");
        }
      }
    },
    DateAdded: {
      type: Object,
      default: new Date(),
    }
  }

});

module.exports = Product;

