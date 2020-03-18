// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 * Connects a file reference fileId with id, if not already done
 * @param fields names of fields to be consider when connecting files
 * @returns {function(*): *}
 */
module.exports = (...fields) => {
  return async context => {
    // fail silently
    if (!fields || fields.length === 0) {
      console.error('connect-references: No fields defined');
      return context;
    }

    // get Mongoose model
    const FileReference = context.app.service('file-reference').Model;

    // gather connected ids for this model
    const connectedIds = [];

    fields.forEach(field => {
      if (context.result[field]) {
        // single string field?
        if (typeof context.result[field] === 'string') {
          connectedIds.push(context.result[field]);
        }
        // array of fields?
        else if (Array.isArray(context.result[field])) {
          context.result[field].forEach(id => {
            if (id) connectedIds.push(id);
          });
        }
      }
    });

    // now we have gathered all the ids - connect them
    for (let i = 0; i < connectedIds.length; i++) {
      console.log('Connecting ' + context.result._id + ' to blob ' + connectedIds[i]);
      await FileReference.updateOne(
        { _id: connectedIds[i] }, // find or create file id
        { $addToSet: { references: context.result._id } }, // add reference id
        { upsert: true, omitUndefined: true } // update or insert!
      );
    }

    // now find all elements that are not connected
    const unconnectedReferences = await FileReference.find({ references: context.result._id, _id: { $nin: connectedIds } });
    if (unconnectedReferences) {
      for (let i = 0; i < unconnectedReferences.length; i++) {
        console.log('Disconnecting ' + context.result._id + ' from blob ' + connectedIds[i]);
        // update data set - pull id from list
        await FileReference.updateOne(
          {_id: unconnectedReferences[i]._id},
          { $pull: { references: context.result._id } }
        );
      }
    }

    // finally, delete stale all orphan references
    const staleOrphans = await FileReference.find({
      updatedAt: {
        $lte: new Date().getTime()-60*5*1000 // find entries older than 5 minutes (60 * 5 * 1000 ms)
      },
      $or: [
        { references: { $size: 0 } },
        { references: { $exists: false } }
      ]
    });
    if (staleOrphans) {
      for (let i = 0; i < staleOrphans.length; i++) {
        const ref = staleOrphans[i];

        console.log('Deleting stale orphan blob ' + ref._id);

        // orphaned file -> delete it!
        await context.app.service('uploads').remove(ref._id);

        // delete via service
        await FileReference.deleteOne({_id: ref._id});
      }
    }

    return context;
  };
};

