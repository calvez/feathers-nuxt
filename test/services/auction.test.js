const assert = require('assert');
const app = require('../../src/app');

describe('\'Auction\' service', () => {
  it('registered the service', () => {
    const service = app.service('auction');

    assert.ok(service, 'Registered the service');
  });
});
