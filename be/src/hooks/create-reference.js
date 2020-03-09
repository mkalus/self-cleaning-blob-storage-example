/**
 * Creates bare file reference in db, so we know the file exists
 * @returns {function(*): *}
 */
module.exports = () => {
  return async context => {
    // check result exists?
    if (context && context.result && context.result.id) {
      // get Mongoose model
      const FileReference = context.app.service('file-reference').Model;

      try {
        await FileReference.updateOne(
          { _id: context.result.id },
          { _id: context.result.id },
          { upsert: true }
        );
      } catch (e) {
        console.error('fileReferenceCreate: error ' + e);
      }
    }

    return context;
  };
};
