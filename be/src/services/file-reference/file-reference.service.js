// Initializes the `FileReference` service on path `/file-reference`
const { FileReference } = require('./file-reference.class');
const createModel = require('../../models/file-reference.model');
const hooks = require('./file-reference.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app)
  };

  // Initialize our service with any options it requires
  app.use('/file-reference', new FileReference(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('file-reference');

  service.hooks(hooks);
};
