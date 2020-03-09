const assert = require('assert');
const app = require('../../src/app');

describe('\'FileReference\' service', () => {
  it('registered the service', () => {
    const service = app.service('file-reference');

    assert.ok(service, 'Registered the service');
  });
});
