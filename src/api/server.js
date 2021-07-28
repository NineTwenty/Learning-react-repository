import {
  Server,
  Model,
  hasMany,
  belongsTo,
  RestSerializer,
  Factory,
  Response,
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
// ==================

const secret =
  'B850B9761597B154641D8C3D7768F8AE500FE6BBA5409C1616D0DFC15495F4E5';

export function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,

    // ==================
    // 1. Serializers
    // ==================

    serializers: {
      application: RestSerializer.extend({
        include: (request) => {
          return [request.queryParams.include];
        },
      }),
    },

    // ==================
    // 2. Models
    // ==================

    models: {
      user: Model.extend({
        dialogs: hasMany(),
        messages: hasMany(),
        posts: hasMany(),
        feed: belongsTo(),
      }),

      dialog: Model.extend({
        members: hasMany('user'),
        messages: hasMany(),
      }),

      message: Model.extend({
        author: belongsTo('user'),
        dialog: belongsTo(),
      }),

      feed: Model.extend({
        owner: belongsTo('user'),
        posts: hasMany(),
      }),

      post: Model.extend({
        author: belongsTo('user'),
        feed: belongsTo(),
      }),
    },

    // ==================
    // 3. Factories
    // ==================

    factories: {
      user: Factory.extend({
        afterCreate: (user) => {
          user.update({
            friends: user.friends.filter((id) => user.id !== id),
          });
        },
        firstName: faker.name.firstName,
        lastName: faker.name.lastName,
        email: faker.internet.exampleEmail,
        address: faker.address.country,
        phoneNumber: faker.phone.phoneNumber.bind(null,'+(###) ###-####'),
        birthDate: faker.date.between('January 1, 1950', 'January 1, 2010'),
        online: false,
        lastOnlineTime: faker.date.recent,
        avatar: () => `https://picsum.photos/200?random=${Math.random()}`,
        friends: () => {
          const arr = Array(Math.round(Math.random() * 15));
          const makeFriends = () =>
            `${Math.round(1 + Math.random() * (21 - 1))}`;
          const onlyUnique = (value, index, self) =>
            self.indexOf(value) === index;

          return Array.from(arr, makeFriends).filter(onlyUnique);
        },
        music: [],
        images: (id) => {
          const images = [
            `https://picsum.photos/1280/920?random=${Math.random()}`,
            `https://picsum.photos/947?random=${Math.random()}`,
            `https://picsum.photos/700/1280?random=${Math.random()}`,
            `https://picsum.photos/1280?random=${Math.random()}`,
            `https://picsum.photos/1280/590?random=${Math.random()}`,
            `https://picsum.photos/700/1280?random=${Math.random()}`,
            `https://picsum.photos/1280/329?random=${Math.random()}`,
            `https://picsum.photos/560?random=${Math.random()}`,
            `https://picsum.photos/947?random=${Math.random()}`,
            `https://picsum.photos/1280/329?random=${Math.random()}`,
          ];

          return images.map((src, i) => ({
            src,
            // if id or i == 0 and generated value is null then regenerate
            // with explicitly defined numbers
            id: Date.now() / id / i ?? Date.now() / 99 / 99,
          }));
        },
      }),

      dialog: Factory.extend({
        count: null,
        time: null,
      }),

      message: Factory.extend({
        text: () => faker.lorem.sentence(Math.floor(Math.random() * 14) + 1),
        unread: true,
        created: Date.now(),
      }),
      post: Factory.extend({
        postText: () => faker.lorem.sentences(),
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
          text: faker.lorem.sentence(),
          unread: true,
        });
      }
      // function handlePost() {
      //   return handleWithDefaultValues('posts', {
      //     postText: faker.lorem.sentences(),
      //     views: 0,
      //   });
      // }

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
        const userId = authenticateUser(request);
        const { dialogIds } = schema.users.find(userId);

        return schema.dialogs.find(dialogIds);
      });
      this.post('/dialogs', handleDialog());

      // ==================
      // 4.3 Messages
      // ==================

      this.get('/messages', (schema, request) => {
        const userId = authenticateUser(request);
        let { dialogId, limit, page } = request.queryParams;
        limit = limit ? +limit : 10;

        const user = schema.users.find(userId);

        // Decline if the dialog doesn't belong to requesting user
        if (!user.dialogIds.includes(dialogId)) {
          return new Response(403);
        }

        // Take messages from dialog
        const { messages } = schema.dialogs.find(dialogId);
        // Sort newest first
        const sortedMessages = messages.sort((a, b) => b.id - a.id);

        // Pagination
        const start = (page - 1) * limit;
        const end = limit * page;

        return sortedMessages.slice(start, end);
      });
      this.post('/messages', (schema, request) => {
        const userId = authenticateUser(request);
        const message = JSON.parse(request.requestBody);

        if (message && message.text) {
          message.authorId = userId;
          return schema.messages.create(message);
        }
      });

      // ==================
      // 4.4 Posts
      // ==================

      this.get('/posts', (schema, request) => {
        const userId = authenticateUser(request);
        const { postIds } = schema.users.find(userId);

        return schema.posts.find(postIds);
      });
      this.post('/posts', (schema, request) => {
        const userId = authenticateUser(request);

        const post = JSON.parse(request.requestBody);
        if (post && post.postText) {
          post.authorId = userId;
          post.views = 0;
          return schema.posts.create(post);
        }
      });

      // ==================
      // 4.5 Authentication
      // ==================

      function createJWT(user) {
        const { id: userId } = user;
        const jwt = require('jsonwebtoken');
        return jwt.sign({ userId }, secret, { expiresIn: '100m' });
      }

      function verifyJWT(authHeader) {
        let token;

        if (authHeader.startsWith('Bearer ')) {
          token = authHeader.substring(7, authHeader.length);
        }

        const jwt = require('jsonwebtoken');
        return jwt.verify(token, secret);
      }

      function authenticateUser(request) {
        const { Authorization } = request.requestHeaders;
        const { userId } = verifyJWT(Authorization);
        return userId;
      }

      this.post('/auth/login', (schema, request) => {
        const errors = [];
        const { login, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ login });

        // Authentication
        if (user && user.password === password) {
          const token = createJWT(user);
          return { body: { token } };
        }

        // Add error
        errors.push('Wrong login or password');
        // Return submission erros
        return new Response(401, {}, errors);
      });

      // Get current user
      this.get('/auth/me', (schema, request) => {
        const userId = authenticateUser(request);
        return schema.users.find(userId);
      });

      // ==================
      // 4.6 Feeds
      // ==================

      this.get('/feeds/:id', (schema, request) => {
        const userId = authenticateUser(request);
        const { id } = request.params

        return schema.feeds.find(id)
      });
    },

    // ==================
    // 5. Seeds
    // ==================

    seeds(server) {
      server.createList('user', 3);

      const admin = server.create('user', {
        login: 'admin',
        password: 'admin',
      });

      server.createList('user', 21);

      // Create posts for all users
      server.schema.users.all().models.forEach((user) => {
        const feed = server.create('feed', {
          owner: user,
        });

        server.createList('post', 2, {
          feed,
          author: user,
          views: 0,
        });
      });

      // Create two dialogs for main user
      [
        server.create('dialog', {
          memberIds: [admin.id, `${+admin.id + 1}`],
        }),
        server.create('dialog', {
          memberIds: [admin.id, `${+admin.id + 2}`],
        }),
      ].forEach((dialog) => {
        // Create messages for each
        server.createList('message', 34, {
          authorId: () => {
            // Randomize author
            return dialog.memberIds[Math.round(Math.random())];
          },
          dialog,
        });
      });
    },
  });
}
