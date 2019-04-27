/* eslint-disable padded-blocks */
/* eslint-disable no-unused-expressions */
import AccountModel from '../src/models/account.model';

/**
 * Checks if opening balance value is greater than 0
 * @param {integer} opening balance
 * @returns {boolean} returns true or false
 */
const openingBalanceValidation = balance => balance > 1000;

const checkType = value => value === 'savings' || value === 'current';

const checkStatus = value => value === 'domant' || value === 'draft' || value === 'active';

/**
 * validates the opening values
 * @param {integer} opening balance
 * @returns {boolean} returns true or false
 */
const validateAccountCreationFields = (req, res, next) => {
  const errorMessages = [];

  const { openingBalance, status, type } = req.body;

  const openingBalanceStat = openingBalanceValidation(openingBalance);
  const typeStat = checkType(type);
  const statStat = checkStatus(status);

  if (!openingBalanceStat) { errorMessages.push('Opening amount should be greater than 1000'); }
  if (!typeStat) { errorMessages.push('Account type can either be savings or current'); }
  if (!statStat) { errorMessages.push('Account stat can either be domant, active or draft'); }

  if (errorMessages.length === 0) { return next(); }
  return res.json({ status: 400, message: errorMessages });
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

export { accountNumberValidation, validateAccountCreationFields };
