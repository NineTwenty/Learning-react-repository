import {
  Server,
  Model,
  hasMany,
  belongsTo,
  RestSerializer,
  Factory,
} from 'miragejs';
import faker from 'faker';

// ==================
// 1. Serializers
// 2. Models
// 3. Factories
// 4. Routes
//  4.0 Utils
//  4.1 Users
//  4.2 Dialogs
//  4.3 Messages
//  4.4 Posts
//  4.5 Authentication
// 5. Seeds
//  5.1 Users
//  5.2 Dialogs
//  5.3 Messages
// ==================

export function makeServer({ environment = 'development' }) {
  return new Server({
    environment,

    // ==================
    // 1. Serializers
    // ==================

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

    // ==================
    // 2. Models
    // ==================

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
      post: Model.extend({
        author: belongsTo('user'),
      }),
    },

    // ==================
    // 3. Factories
    // ==================

    factories: {
      user: Factory.extend({
        firstName: faker.name.firstName,
        lastName: faker.name.lastName,
        email: faker.internet.exampleEmail,
        addres: faker.address.country,
        phoneNumber: faker.phone.phoneNumber,
        bithDate: faker.date.between('January 1, 1950', 'January 1, 2010'),
        online: false,
        lastOnlineTime: faker.date.recent,
        avatar: faker.internet.avatar,
        friends: [],
        music: [],
      }),

      dialog: Factory.extend({
        count: null,
        time: null,
      }),

      message: Factory.extend({
        text: faker.lorem.sentence(),
        unread: true,
      }),
      post: Factory.extend({
        text: faker.lorem.sentences(),
      }),
    },

    // ==================
    // 4. Routes
    // ==================

    routes() {
      // ==================
      // 4.0 Utils
      // ==================

      // Func to form appropriate relationships object
      function createRelationshipsBySchema(schemaName, userId) {
        switch (schemaName) {
          case 'posts':
            return {
              authorId: userId,
            };
          default:
            return {};
        }
      }

      function handleWithDefaultValues(schemaName, defaultValues) {
        return function (schema, request) {
          try {
            const attrs = this.normalizedRequestAttrs();
            const userId = request.requestHeaders.userId;
            // Form relationship object
            const relationships = createRelationshipsBySchema(
              schemaName,
              userId
            );

            const entity = schema[schemaName].create({
              ...defaultValues,
              ...attrs,
              ...relationships,
            });

            const response = {
              resultCode: 1,
              data: {
                [schemaName]: [entity],
              },
            };

            return response;
          } catch (err) {
            return {
              resultCode: 0,
            };
          }
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
      function handlePost() {
        return handleWithDefaultValues('posts', {
          postText: faker.lorem.sentences(),
          views: 0,
        });
      }

      this.namespace = 'api';

      // ==================
      // 4.1 Users
      // ==================

      this.get('/users');
      this.get('/users/:id');
      this.post('/users', handleUser());

      // ==================
      // 4.2 Dialogs
      // ==================

      this.get('/dialogs', (schema, request) => {
        const userId = request.requestHeaders.userId;
        const { dialogIds } = schema.users.find(userId);

        return schema.dialogs.find(dialogIds);
      });
      this.post('/dialogs', handleDialog());

      // Dialogs members
      this.get('/dialogs/members', (schema, request) => {
        const isNotRequester = (id) => !(id === +userId);
        const filterMembers = (acc, dialog) => [
          ...acc,
          ...dialog.attrs.memberIds.filter(isNotRequester),
        ];

        // Requster id
        const { userId } = request.requestHeaders;

        // Find id of requester dialogs
        const {
          attrs: { dialogIds },
        } = schema.users.find(userId);

        // Find dialogs
        const { models: dialogs } = schema.dialogs.find(dialogIds);

        // Take ids of dialogs members
        // Except of requester
        const membersIds = dialogs.reduce(filterMembers, []);

        // Find by ids and return
        return schema.users.find(membersIds);
      });

      // ==================
      // 4.3 Messages
      // ==================

      this.get('/dialogs/:id/messages');
      this.post('/messages', handleMessage());

      // ==================
      // 4.4 Posts
      // ==================

      this.get('/posts/:id');
      this.post('/posts', handlePost());

      // ==================
      // 4.5 Authentication
      // ==================

      this.put('/login', (schema, request) => {
        const errors = [];
        const { login, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ login });

        // Validation
        if (user && user.password === password) {
          return { success: true, user };
        }

        errors.push('Wrong login or password');
        // Return submission erros
        return { success: false, errors };
      });
    },

    // ==================
    // 5. Seeds
    // ==================

    seeds(server) {
      // ==================
      // 5.1 Users
      // ==================

      server.create('user', {
        name: 'Charles',
        avatar: 'https://loremflickr.com/48/48?r=1',
        login: 'charlesleclerc',
        password: 'shitbox',
      });
      server.create('user', {
        name: 'Lando',
        avatar: 'https://loremflickr.com/48/48?r=1',
        login: 'landobot',
        password: 'scenario7',
      });
      server.create('user', {
        name: 'Max',
        avatar: 'https://loremflickr.com/48/48?r=1',
        login: 'maxsupermax',
        password: 'verstappening',
      });
      server.create('user', {
        name: 'NineTwenty',
        avatar: 'https://loremflickr.com/48/48?r=1',
        login: 'admin',
        password: 'admin',
      });
      server.create('user');

      // ==================
      // 5.2 Dialogs
      // ==================

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

      // ==================
      // 5.3 Messages
      // ==================

      server.create('message', {
        text: `I'm stupid`,
        authorId: 1,
        dialogId: 1,
      });
    },
  });
}
