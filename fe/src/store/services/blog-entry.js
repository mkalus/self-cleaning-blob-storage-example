import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class BlogEntry extends BaseModel {
    constructor(data, options) {
        super(data, options);
    }
    // Required for $FeathersVuex plugin to work after production transpile.
    static modelName = 'BlogEntry';

    // Define default properties here
    static instanceDefaults() {
        return {
            title: '',
            text: '',
            images: [],
            attachment: ''
        };
    }
}
const servicePath = 'blog-entry';
const servicePlugin = makeServicePlugin({
    Model: BlogEntry,
    service: feathersClient.service(servicePath),
    servicePath
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },
    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },
    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
});

export default servicePlugin;
