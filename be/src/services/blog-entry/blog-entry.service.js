// Initializes the `BlogEntry` service on path `/blog-entry`
const { BlogEntry } = require('./blog-entry.class');
const createModel = require('../../models/blog-entry.model');
const hooks = require('./blog-entry.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/blog-entry', new BlogEntry(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('blog-entry');

  service.hooks(hooks);
};
