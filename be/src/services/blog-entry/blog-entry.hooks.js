const connectReference = require('../../hooks/connect-references');
const disconnectReference = require('../../hooks/disconnect-references');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ connectReference('images', 'attachment') ],
    update: [ connectReference('images', 'attachment') ],
    patch: [ connectReference('images', 'attachment') ],
    remove: [ disconnectReference() ]
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
