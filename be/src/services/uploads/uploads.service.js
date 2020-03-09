// Initializes the `Uploads` service on path `/uploads`
const { Uploads } = require('./uploads.class');
const hooks = require('./uploads.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/uploads', new Uploads(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
