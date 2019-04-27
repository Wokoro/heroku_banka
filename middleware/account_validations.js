/* eslint-disable padded-blocks */
/* eslint-disable no-unused-expressions */
import AccountModel from '../src/models/account.model';

/**
 * Checks if opening balance value is greater than 0
 * @param {integer} opening balance
 * @returns {boolean} returns true or false
 */
const openingBalanceValidation = balance => balance > 1000;

/**
 * validates the opening values
 * @param {integer} opening balance
 * @returns {boolean} returns true or false
 */
const validateOpeningBalance = (req, res, next) => {

  const { openingBalance } = req.body;

  const openingBalanceStat = openingBalanceValidation(openingBalance);

  if (openingBalanceStat) { return next(); }

  return res.send({ status: 400, message: 'Minimum opening balance is 1000' });
};

/**
 * validates the account number to be valid
 * @param {integer} acount number
 * @returns {boolean} returns account number if present
 */
const accountNumberValidation = async (req, res, next) => {
  const { accountNumber } = req.params;
  try {
    const result = await AccountModel.findAccount('accountnumber', accountNumber);
    const account = result[0];
    if (account) {
      req.body.balance = account.balance;
      return next();
    }
    return res.json({ status: 400, message: 'Account do not exists' });
  } catch (err) {
    return res.json({ status: 500, message: `An error occured. ${err}` });
  }
};

export { accountNumberValidation, validateOpeningBalance };
