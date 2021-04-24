const express = require('express');
const User = require('../models/user');
const router = new express.Router();

// create user
router.post('/users', (req, res) => {
  try {
    const user = new User(req.body);
    const saveRes = user.save();
    res.status(201).send(`saveRes: ${saveRes}`);
  } catch(e) {
    return res.status(400).send(e);
  }
});
// get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch(e){
    return res.status(400).send(e);
  }
});
// get a specific user
router.get('/users/:id', async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('User does not exist')
    }
    return res.status(200).send(user);
  } catch(e){
    return res.status(400).send(e);
  }
});
// delete specific user
router.delete('/users/:id', async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) {
          res.status(404).send('User does not exist')
      }
      res.send(user)
  } catch (e) {
      res.status(500).send()
  }
})

module.exports = router;