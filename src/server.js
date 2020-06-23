import {
  Server,
  Model,
  hasMany,
  belongsTo,
  RestSerializer,
  Factory,
} from 'miragejs';

export function makeServer() {
  return new Server({
    serializers: {
      application: RestSerializer.extend({
        serializeIds: 'always',
      }),
      user: RestSerializer.extend({
        include: ['dialogs'],
      }),
      dialog: RestSerializer.extend({
        include: ['messages'],
      }),
    },

    models: {
      user: Model.extend({
        dialogs: hasMany(),
        messages: hasMany(),
      }),

      dialog: Model.extend({
        members: hasMany('user'),
        messages: hasMany(),
      }),

      message: Model.extend({
        author: belongsTo('user'),
        dialog: belongsTo(),
      }),
    },

    factories: {
      user: Factory.extend({
        online: false,
        lastOnlineTime: '15min ago',
        avatar: null,
        friends: [],
        music: [],
      }),

      dialog: Factory.extend({
        count: null,
        time: null,
      }),

      message: Factory.extend({
        text: 'Placeholder',
        unread: true,
      }),
    },

    routes() {
      function handleWithDefaultValues(schemaName, defaultValues) {
        return function (schema, request) {
          const attrs = this.normalizedRequestAttrs();

          return schema[schemaName].create({ ...defaultValues, ...attrs });
        };
      }

      function handleUser() {
        return handleWithDefaultValues('users', {
          online: false,
          lastOnlineTime: '15min ago',
          avatar: null,
          friends: [],
          music: [],
        });
      }
      function handleDialog() {
        return handleWithDefaultValues('dialogs', {
          count: null,
          time: null,
          memberIds: [],
        });
      }
      function handleMessage() {
        return handleWithDefaultValues('messages', {
          text: 'Placeholder',
          unread: true,
        });
      }

      this.namespace = 'api';

      this.get('/users');
      this.get('/users/:id');
      this.post('/users', handleUser());

      // Dialogs routes
      this.get('/dialogs');
      this.get('/dialogs/:id');
      this.post('/dialogs', handleDialog());

      // Messages routes
      this.get('/dialogs/:id/messages');
      this.post('/messages', handleMessage());
    },

    seeds(server) {
      server.create('user', {
        name: 'Charles',
        avatar: 'https://loremflickr.com/48/48?r=1',
      });
      server.create('user', {
        name: 'Lando',
        avatar: 'https://loremflickr.com/48/48?r=1',
      });
      server.create('user', {
        name: 'Max',
        avatar: 'https://loremflickr.com/48/48?r=1',
      });
      server.create('user', {
        name: 'NineTwenty',
        avatar: 'https://loremflickr.com/48/48?r=1',
      });

      server.create('dialog', {
        count: 16,
        time: '1min',
        memberIds: [1, 4],
      });
      server.create('dialog', {
        count: 13,
        time: '4min',
        memberIds: [2, 4],
      });

      server.create('message', {
        text: `I'm stupid`,
        authorId: 1,
        dialogId: 1,
      });
    },
  });
}
