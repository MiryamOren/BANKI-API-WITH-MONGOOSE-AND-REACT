const express = require('express');
const Product = require('../models/product');
const router = new express.Router();
// 1. update a product to become active/not active 
// change the value of its discount.
// - Make sure they can only update fields that we have in our
// model.
router.patch('/products/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['isActive', 'discount']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'invalid updates' })
  }

  try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      if (!product) {
          return res.status(404).send()
      }

      res.send(product)
  } catch (e) {
      res.status(400).send(e)
  }
})

module.exports = router;
