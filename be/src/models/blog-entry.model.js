// BlogEntry-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'blogEntry';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
    images: [{ type: String }], // references to blobs
    attachment: { type: String } // reference to blob
  }, {
    timestamps: true,
    versionKey: false
  });

  // create an index to find last changed entries more easily
  schema.index({ updatedAt: -1 });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
