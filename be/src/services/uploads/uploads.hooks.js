const { disallow } = require('feathers-hooks-common');
const createReference = require('../../hooks/create-reference');

module.exports = {
  before: {
    all: [],
    find: [
      [
        disallow('external') // only internal access granted
      ]
    ],
    get: [
      [
        disallow('external') // only internal access granted
      ]
    ],
    create: [], // only create is allowed internally
    update: [
      disallow('external') // only internal access granted
    ],
    patch: [
      disallow('external') // only internal access granted
    ],
    remove: [
      disallow('external') // only internal access granted
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ createReference() ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
