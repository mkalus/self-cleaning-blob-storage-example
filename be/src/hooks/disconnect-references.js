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

      const refs = await FileReference.find({ references: context.result._id }, {_id: true});
      const connectedBlobs = [];

      if (refs) {
        for (let i = 0; i < refs.length; i++) {
          console.log('Disconnecting ' + context.result._id + ' from blob ' + refs[i]._id);
          connectedBlobs.push(refs[i]._id);
        }

        // delete references from these:
        await FileReference.updateMany(
          { _id: { $in: connectedBlobs } },
          { $pull: { references: context.result._id } }
        );

        // finally, delete all orphan references within the set of the ones updated above
        const orphans = await FileReference.find({
          _id: { $in: connectedBlobs },
          $or: [
            { references: { $size: 0 } },
            { references: { $exists: false } }
          ]
        });
        if (orphans) {
          for (let i = 0; i < orphans.length; i++) {
            const ref = orphans[i];

            console.log('Deleting orphan blob ' + ref._id);

            // orphaned file -> delete it!
            await context.app.service('uploads').remove(ref._id);

            // delete via service
            await FileReference.deleteOne({_id: ref._id});
          }
        }
      }
    }

    return context;
  };
};
