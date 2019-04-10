/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */
const request = require('request');
const { expect } = require('chai');

describe('Account deactivation tests: PATCH /account/<account-number>', () => {
  const data = {};
  const params = 'accountNumber=123456';
  before((done) => {
    request.patch(`http://localhost:3000/api/v1/account?${params}`, (error, response, body) => {
      const responseBody = JSON.parse(body);
      data.status = responseBody.status;
      data.body = responseBody.data;
      done();
    });
  });
  it('Status 200', () => {
    expect(data.status).to.equal(200);
  });
  it('Response must be defined', () => {
    expect(data.body).not.to.be.undefined;
  });
  it('Response must contain account number', () => {
    expect(data.body.accountNumber).not.to.be.undefined;
  });
  it('Response must contain account status', () => {
    expect(data.body.status).not.to.be.undefined;
  });
  it('User account must be deactivated', () => {
  });
});
