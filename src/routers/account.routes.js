const express = require('express');
const AccountController = require('../controllers/account.controller');
const verifyToken = require('../../utils/auth');

const router = express.Router();

router.post('/', verifyToken, AccountController.create);
router.get('/:accountNumber', (req, res) => {
  res.status(200).json({
    message: 'single account details',
  });
});


module.exports = router;
