/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */
const request = require('request');
const { expect } = require('chai');

describe('Bank account deletion tests: PATCH /account/<account-number>', () => {
  const data = {};
  const params = 'accountNumber=123456';
  before((done) => {
    request.delete(`http://localhost:3000/api/v1/accounts?${params}`, (error, response, body) => {
      const responseBody = JSON.parse(body);
      data.status = responseBody.status;
      data.message = responseBody.message;
      done();
    });
  });
  it('Status 200', () => {
    expect(data.status).to.equal(200);
  });
  it('Response message must be defined', () => {
    expect(data.message).not.to.be.undefined;
  });
  it('Bank account must be deleted', () => {
    expect(false).to.be.true;
  });
});
