[![Build Status](https://travis-ci.org/Wokoro/banka_api.svg?branch=develop)](https://travis-ci.org/Wokoro/banka_api)[![Coverage Status](https://coveralls.io/repos/github/Wokoro/banka_api/badge.svg?branch=develop)](https://coveralls.io/github/Wokoro/banka_api?branch=develop)
# bankaApi
Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money.

It has three categories of users
1. Admin
2. Cashier
3. Public user


### Available Endpoints

>- Create user account POST /auth/signup
>- Login a user POST /auth/signin
>- Create a bank account POST /accounts
>- Activate or deactivate an account PATCH /account/<account-number>
>- Delete a specific bank account DELETE /accounts/<account-number>
>- Debit a bank account POST /transactions/<account-number>/debit
>- Credit a bank account POST /transactions/<account-number>/credit
>- Get a single a bank account GET /accounts/<account-number>
>- Get a single a account transaction GET /trasactions/<transaction-number>


### Useful links

* Pivotal tracker: https://www.pivotaltracker.com/n/projects/2326660
* Travic CI: https://travis-ci.org/Wokoro/banka_api
* Coveralls: https://coveralls.io/github/Wokoro/banka_api
