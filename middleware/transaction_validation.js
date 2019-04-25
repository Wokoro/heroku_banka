/* eslint-disable prefer-destructuring */
import TransactionModel from '../src/models/transaction.model';

/**
 * validates the transaction exits
 * @param {integer} transaction number
 * @returns {boolean} returns transaction number if present
 */


async function transactionNumberValidation(req, res, next) {
  const { transactionID } = req.params;
  try {
    const transaction = await TransactionModel.find('id', transactionID);
    if (transaction) {
      req.body.transaction = transaction[0];
      return next();
    }
    return res.json({ status: 400, message: 'Transaction does not exists' });
  } catch (error) {
    return res.json({ status: 500, message: `An error occured. ${error}` });
  }
}
export default transactionNumberValidation;
