/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Page not found test', () => {
  let res = {};
  after(() => { server.close(); });
  before(async () => {
    res = await chai.request(server).get('/api/v1/pagenotfound').send();
  });
  it('Status 404', () => {
    expect(res.body).to.have.status(404);
  });
  it('Response must contain error message', () => {
    expect(res.body).to.have.property('message');
  });
});
