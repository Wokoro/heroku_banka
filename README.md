# bankaApi

This is an API for powering bank UI.

### Available Endpoints


* Create user account POST /auth/signup
* Login a user POST /auth/signin
* Create a bank account POST /accounts
* Activate or deactivate an account PATCH /account/<account-number>
* Delete a specific bank account DELETE /accounts/<account-number>
* Debit a bank account POST /transactions/<account-number>/debit
* Credit a bank account POST /transactions/<account-number>/credit
