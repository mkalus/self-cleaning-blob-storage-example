import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import feathersVuex from 'feathers-vuex';
import axios from 'axios';

const restClient = rest('http://localhost:3030');

const feathersClient = feathers()
        .configure(restClient.axios(axios))
    /* .hooks({
      before: {
        all: [
          iff(
            context => ['create', 'update', 'patch'].includes(context.method),
            discard('__id', '__isTemp')
          )
        ]
      }
    }) */;

export default feathersClient;

// Setting up feathers-vuex
const { makeServicePlugin, BaseModel, models, FeathersVuex } = feathersVuex(
    feathersClient, {
        serverAlias: 'api',
        idField: '_id',
        whitelist: ['$regex', '$options']
    }
);

export { makeServicePlugin, BaseModel, models, FeathersVuex };
