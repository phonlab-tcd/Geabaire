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

export {Profile}