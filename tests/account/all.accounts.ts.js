/* eslint-disable no-unused-expressions */

const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');

const server = require('../../server');

chai.use(chaiHttp);

describe('Get all bank accounts GET /accounts', () => {
  after(() => { server.close(); });
  describe('tests for successful returning of accounts', () => {
    let res = {};
    before(async () => {
      res = await chai.request(server).get('/api/v1/accounts').send();
    });
    it('Response must have status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Response must contain list of accounts', () => {
      expect(res.body.data).to.have.property('accounts');
    });
  });
});
