const express = require('express');
const Account = require('../models/account');
const User = require('../models/user');
const router = new express.Router();
// Add account
// Can add account to the bank. Each user has the following:
// passport id, cash(default 0), credit(default 0).
// create user
router.post('/accounts', async (req, res) => {
  const {credit, cash} = req.body;
  if (credit + cash < 0){
    return res.status(400).send('Error: Credit exceeding.')
  }
  try {
    const user = await User.findById(req.body.accountHolderID);
    if (!user){
      return res.status(400).send('Error: Account holder not found');
    }
    const account = new Account(req.body);
    const saveRes = await account.save();
    res.status(201).send(account);
  } catch(e) {
    return res.status(400).send(e);
  }
});
// Show details of user
// Can fetch all details of a particular user
// Show details of all users

// get all accounts
router.get('/accounts', async (req, res) => {
  try {
    const accounts = await Account.find({});
    return res.status(200).send(accounts);
  } catch(e){
    return res.status(400).send(e);
  }
});
// get a specific account
router.get('/accounts/:id', async(req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      res.status(404).send('account does not exist')
    }
    return res.status(200).send(account);
  } catch(e){
    return res.status(400).send(e);
  }
});
// Depositing
// Can deposit cash to a user. (by the account passport id and
// amount of cash)
router.patch('/accounts/deposit/:id', async (req,res) => {
  if (req.body.amount <= 0){
    return res.status(400).send('Error: deposit amount should be a positive number');
  }
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).send('account does not exist')
    }
    const updatedAccount = await Account.findByIdAndUpdate(req.params.id, {"cash" : account.cash + req.body.amount}, { new: true, runValidators: true });
    return res.status(200).send(updatedAccount);
  } catch(e){
    return res.status(400).send(e);
  }
});
// Update credit
// Can update a users credit (only positive numbers)
router.patch('/accounts/update-credit/:id', async (req,res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!account){
      return res.status(404).send('account does not exist')
    }
    return res.status(200).send(account);
  } catch(e){
    return res.status(400).send(e);
  }
})
// Withdraw money
// Can withdraw money from the user with cash (can withdraw
// money until the cash and credit run out. Your cash can be in
// minus up to the credit limit)
router.patch('/accounts/withdraw/:id', async (req,res) => {
  if (req.body.amount <= 0){
    return res.status(400).send('Error: withdraw amount should be a positive number');
  }
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).send('account does not exist')
    }
    if (((account.cash + account.credit) - req.body.amount) < 0){
      return res.status(400).send('Error: Credit exceeding.')
    }
    const updatedAccount = await Account.findByIdAndUpdate(req.params.id, {"cash" : account.cash - req.body.amount}, { new: true, runValidators: true });
    return res.status(200).send(updatedAccount);
  } catch(e){
    return res.status(400).send(e);
  }
});
// Transferring
// Can transfer money from one user to another with cash(can
// transfer money until the cash and credit run out. Your cash can
// be in minus up to the credit limit)
router.patch('/accounts/transfer', async (req,res) => {
  if (req.body.amount <= 0){
    return res.status(400).send('Error: transfer amount should be a positive number');
  }
  try {
    const fromAccount = await Account.findById(req.body.fromAccount);
    const toAccount = await Account.findById(req.body.toAccount);
    if (!fromAccount || !toAccount) {
      return res.status(404).send('account does not exist')
    }
    if (((fromAccount.cash + fromAccount.credit) - req.body.amount) < 0){
      return res.status(400).send('Error: Credit exceeding.')
    }
    const updatedFromAccount = await Account.findByIdAndUpdate(req.body.fromAccount, {"cash" : fromAccount.cash - req.body.amount}, { new: true, runValidators: true });
    const updatedToAccount = await Account.findByIdAndUpdate(req.body.toAccount, {"cash" : toAccount.cash + req.body.amount}, { new: true, runValidators: true });
    return res.status(200).send([updatedFromAccount, updatedToAccount]);
  } catch(e){
    return res.status(400).send(e);
  }
});

// delete specific account
router.delete('/accounts/:id', async (req, res) => {
  try {
      const account = await Account.findByIdAndDelete(req.params.id)
      if (!account) {
          res.status(404).send('account does not exist')
      }
      res.send(account)
  } catch (e) {
      res.status(500).send()
  }
})

module.exports = router;