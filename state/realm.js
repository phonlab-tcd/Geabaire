import { createRealmContext } from '@realm/react';

class Profile extends Realm.Object {
    static schema = {
      name: 'Profile',
      properties: {
        _id: 'objectId',
        name: 'string',
      },
      primaryKey: '_id',
    };
  }


// Create a configuration object
const realmConfig = {
    schema: [Profile],
};

const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(realmConfig);

export { RealmProvider, useRealm, useObject, useQuery }