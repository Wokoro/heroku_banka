import TransactionModel from '../models/transaction.model';

export default {
  /**
  * Function to get all transactions
  * @param {string} req
  * @param {string} res
  * @returns {object} returns an array of all transactions
  */
  index(req, res) {
    const transactions = TransactionModel.all();

    if (transactions) { return res.json({ status: 200, transactions }); }

    return res.json({ status: 400, message: 'No transation available' });
  },

  /**
  * Function to debit an account
  * @param {string} req
  * @param {string} res
  * @returns {object} returns the transaction details if succesful
  */
  debit(req, res) {
    const { token } = req.body;
    const { amount, account } = req.body;
    const { accountNumber } = account;
    const oldBalance = account.balance;
    const newBalance = account.debit(amount);

    const transaction = new TransactionModel('debit', amount, token.id, oldBalance, accountNumber, newBalance);

    TransactionModel.save(transaction);

    res.json({ status: 200, data: transaction });
  },


  /**
* Function to get a specific transaction
* @param {string} req
* @param {string} res
* @returns {object} returns the transaction details if succesful
*/
  show(req, res) {
    const { transactionID } = req.params;
    const transaction = TransactionModel.findByTransactionID(transactionID);
    res.json({
      status: 200,
      data: { transaction },
    });
  },

  /**
  * Function credit a user account
  * @param {string} req
  * @param {string} res
  * @returns {object} returns transaction details
  */
  credit(req, res) {
    const { token } = req.body;
    const { amount, account } = req.body;
    const { accountNumber } = account;
    const oldBalance = account.balance;
    const newBalance = account.credit(amount);

    const transaction = new TransactionModel('credit', amount, token.id, oldBalance, accountNumber, newBalance);

    TransactionModel.save(transaction);

    res.json({ status: 200, data: transaction });
  },
};
