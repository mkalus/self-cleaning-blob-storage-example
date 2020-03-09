const blogEntry = require('./blog-entry/blog-entry.service.js');
const fileReference = require('./file-reference/file-reference.service.js');
const uploads = require('./uploads/uploads.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(blogEntry);
  app.configure(fileReference);
  app.configure(uploads);
};
