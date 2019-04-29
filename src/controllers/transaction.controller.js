import TransactionModel from '../models/transaction.model';

export default {
  /**
  * Function to get all transactions
  * @param {string} req
  * @param {string} res
  * @returns {object} returns an array of all transactions
  */
  async getAllTransactions(req, res) {
    try {
      const transactions = await TransactionModel.getAllTransactions();
      if (transactions.length > 0) { return res.json({ status: 200, transactions }); }
      return res.status(400).json({ status: 400, message: 'No transation available' });
    } catch (error) {
      return res.status(500).json({ status: 500, message: `An error occored. ${error}` });
    }
  },

  /**
  * Function to debit an account
  * @param {string} req
  * @param {string} res
  * @returns {object} returns the transaction details if succesful
  */
  async debitAccount(req, res) {
    const { amount, balance, token } = req.body;
    const { accountNumber } = req.params;
    const newBalance = Number(balance) - Number(amount);
    try {
      const transactionDetails = await TransactionModel.createTransaction('debit', amount, token.id, balance, newBalance, accountNumber);
      res.status(200).json({ message: 'Debit operation successful', status: 200, data: transactionDetails });
    } catch (error) {
      res.status(500).json({ status: 500, message: `An error occured. ${error}` });
    }
  },

  /**
* Function to get a specific transaction
* @param {string} req
* @param {string} res
* @returns {object} returns the transaction details if succesful
*/
  async getTransaction(req, res) {
    const { transactionID } = req.params;
    try {
      const result = await TransactionModel.findTransaction('id', transactionID);
      const transaction = result[0];
      if (result.length > 0) {
        return res.json({ status: 200, transaction });
      }
      return res.json({ status: 400, message: 'Transaction does not exist' });
    } catch (error) {
      return res.json({ status: 500, message: `An error occured. ${error}` });
    }
  },

  /**
  * Function credit a user account
  * @param {string} req
  * @param {string} res
  * @returns {object} returns transaction details
  */
  async creditAccount(req, res) {
    const { amount, balance, token } = req.body;
    const { accountNumber } = req.params;

    const newBalance = Number(balance) + Number.parseInt(amount, 10);
    try {
      const transactionDetails = await TransactionModel.createTransaction('credit', amount, token.id, balance, newBalance, accountNumber);
      res.status(200).json({ message: 'Credit operation successful', status: 200, data: transactionDetails });
    } catch (error) {
      res.status(500).json({ status: 500, message: `An error occured. ${error}` });
    }
  },
};
