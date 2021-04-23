const express = require('express');
const Product = require('../models/product');
const router = new express.Router();
// 1. update a product to become active/not active 
// change the value of its discount.
// - Make sure they can only update fields that we have in our
// model.
router.delete('/products/:id', async (req, res) => {
  try {
      const product = await Product.findByIdAndDelete(req.params.id)

      if (!product) {
          res.status(404).send()
      }

      res.send(product)
  } catch (e) {
      res.status(500).send()
  }
})

module.exports = router;
