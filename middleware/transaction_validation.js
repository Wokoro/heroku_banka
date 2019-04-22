import transactionModel from '../src/models/transaction.model';

/**
 * validates the transaction exits
 * @param {integer} transaction number
 * @returns {boolean} returns transaction number if present
 */


function transactionNumberValidation(req, res, next) {
  const { transactionID } = req.params;
  const transaction = transactionModel.findByTransactionID(transactionID);

  if (transaction) {
    req.body.transaction = transaction;
    return next();
  }

  return res.json({ status: 400, message: 'Transaction does exists' });
}
export default transactionNumberValidation;
