/* eslint-disable padded-blocks */
/* eslint-disable no-unused-expressions */
import AccountModel from '../src/models/account.model';


/**
 * Checks if opening balance value is greater than 0
 * @param {integer} opening balance
 * @returns {boolean} returns true or false
 */
const openingBalanceValidation = balance => balance > 0;

/**
 * validates the opening values
 * @param {integer} opening balance
 * @returns {boolean} returns true or false
 */
function validateOpeningBalance(req, res, next) {

  const { openingBalance } = req.body;

  const openingBalanceStat = openingBalanceValidation(openingBalance);

  if (openingBalanceStat) { return next(); }

  return res.send({ status: 401, message: 'Invalid opening balance' });
}

/**
 * validates the account number to be valid
 * @param {integer} acount number
 * @returns {boolean} returns account number if present
 */
function accountNumberValidation(req, res, next) {

  const { accountNumber } = req.params;
  const account = AccountModel.findByAccountNumber(accountNumber);

  if (account) {
    req.body.account = account;

    return next();
  }

  return res.json({ status: 401, message: 'Account do not exists' });
}

export { accountNumberValidation, validateOpeningBalance };
