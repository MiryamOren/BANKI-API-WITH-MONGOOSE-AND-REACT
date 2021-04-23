const express = require('express');
const Product = require('../models/product');
const router = new express.Router();

// 1. Get all products
router.get('/products', (req, res) => {
    Product.find({}).then((products) => {
        res.send(products)
    }).catch((e) => {
        res.status(500).send(e)
    })
})
// 2. Get a specific product
router.get('/products/:id', (req, res) => {
    const _id = req.params.id
    Product.findById(_id).then((product) => {
        if (!product) {
            return res.status(404).send('product is not exist')
        }
        res.send(product)
    }).catch((e) => {
      res.status(500).send(e);
    })
})

// 3. Get products that are active
router.get('/active-products', (req, res) => {
  console.log('got /products/active-products req ')
  Product.find({ 'isActive': true }).then((products) => {
      if (!products) {
          return res.status(404).send('there is no active products')
      }
      res.send(products)
      console.log(products)
  }).catch((e) => {
      console.log.log(e);
      res.status(500).send(e)
  })
})
// 4. Get products with a specific price range
// (example min = 50 max = 500)
router.get('/products-price-range', (req, res) => {
  const {min, max} = req.body;
  Product.find({ "details.price" : {$gte: min, $lt: max} }).then((products) => {
      if (!products) {
          return res.status(404).send('there products in this price range')
      }
      res.send(products)
  }).catch((e) => {
      res.status(500).send(e)
  })
})

module.exports = router;