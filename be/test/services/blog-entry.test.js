const assert = require('assert');
const app = require('../../src/app');

describe('\'BlogEntry\' service', () => {
  it('registered the service', () => {
    const service = app.service('blog-entry');

    assert.ok(service, 'Registered the service');
  });
});
