const express = require('express');
const Product = require('../models/product');
const router = new express.Router();

// 1.Create a product
router.post('/products', (req, res) => {
    const product = new Product(req.body)
    product.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

module.exports = router;