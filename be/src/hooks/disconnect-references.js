// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 * Disconnects all file reference to id
 * @returns {function(*): *}
 */
module.exports = () => {
  return async context => {
    // check result exists?
    if (context && context.result && context.result._id) {
      // get Mongoose model
      const FileReference = context.app.service('file-reference').Model;

      const refs = await FileReference.find({ references: context.result._id });

      if (refs) {
        for (let i = 0; i < refs.length; i++) {
          const ref = refs[i];

          const pos = ref.references.indexOf(context.result._id);
          if (pos < 0) continue;

          // remove _id from list
          ref.references.splice(pos, 1);
          if (ref.references.length === 0) {
            // delete via service
            await context.app.service('uploads').remove(ref._id);

            // orphaned file -> delete it!
            await FileReference.deleteOne({_id: ref._id});
          } else {
            // update data set
            await FileReference.updateOne(
              {_id: ref._id},
              {$set: {references: ref.references}}
            );
          }
        }
      }
    }

    return context;
  };
};
