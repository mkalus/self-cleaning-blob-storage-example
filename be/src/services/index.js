const blogEntry = require('./blog-entry/blog-entry.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(blogEntry);
};
