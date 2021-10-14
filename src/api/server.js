// eslint-disable-next-line
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
import jwt from 'jsonwebtoken';

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

function createJWT(user) {
  const { id: userId } = user;
  return jwt.sign({ userId }, secret, { expiresIn: '100m' });
}

function verifyJWT(authHeader) {
  let token;

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7, authHeader.length);
  }

  return jwt.verify(token, secret);
}

function authenticateUser(request) {
  const { Authorization } = request.requestHeaders;
  const { userId } = verifyJWT(Authorization);
  return userId;
}

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
        friends: hasMany('user', { inverse: 'friends' }),
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
            fullName: `${user.firstName} ${user.lastName}`,
          });
        },
        firstName: faker.name.firstName,
        lastName: faker.name.lastName,
        email: faker.internet.exampleEmail,
        address: faker.address.country,
        phoneNumber: faker.phone.phoneNumber.bind(null, '+(###) ###-####'),
        birthDate: faker.date.between('January 1, 1950', 'January 1, 2010'),
        online: false,
        lastOnlineTime: faker.date.recent,
        avatar: () => `https://picsum.photos/200?random=${Math.random()}`,
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
      this.namespace = 'api';

      // ==================
      // 4.1 Users
      // ==================

      this.get('/users');
      this.get('/users/:id');

      // ==================
      // 4.2 Dialogs
      // ==================

      this.get('/dialogs', (schema, request) => {
        const userId = authenticateUser(request);
        const { dialogIds } = schema.users.find(userId);

        return schema.dialogs.find(dialogIds);
      });

      this.post('/dialogs', (schema, request) => {
        const userId = authenticateUser(request);
        const { members } = JSON.parse(request.requestBody);

        const user = schema.users.find(userId);

        // Iterate through user's dialogs to find possible duplicate
        const isExist = !user.dialogs.models.every((dialog) => {
          // Remove userId from members list
          const dialogMembers = dialog.memberIds.filter((id) => id !== userId);

          // Check that dialog don't contain same members as provided with request
          return !dialogMembers.every((id) => members.includes(id));
        });

        if (isExist) return new Response(409);

        const dialog = {
          count: 0,
          time: null,
          memberIds: [...members, userId],
          messageIds: [],
        };

        return schema.dialogs.create(dialog);
      });

      // ==================
      // 4.3 Messages
      // ==================

      this.get('/messages', (schema, request) => {
        const userId = authenticateUser(request);
        const { dialogId, page } = request.queryParams;
        let { limit } = request.queryParams;
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
      this.delete('/posts/:id', (schema, request) => {
        const userId = authenticateUser(request);
        const { id } = request.params;

        const post = schema.posts.find(id);

        if (post.authorId === userId) {
          return post.destroy();
        }

        return new Response(403);
      });

      // ==================
      // 4.5 Authentication
      // ==================

      this.post('/auth/login', (schema, request) => {
        const errors = [];
        const { login, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ login });

        // Authentication
        if (user && user.password === password) {
          const token = createJWT(user);
          return { token };
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
        authenticateUser(request);
        const { id } = request.params;

        return schema.feeds.find(id);
      });
    },

    // ==================
    // 5. Seeds
    // ==================

    seeds(server) {
      server.createList('user', 14).forEach((user, i, userModels) => {
        // Empty array of random length
        const emptyArr = Array(Math.round(Math.random() * 10));
        // Friend id generation func
        const makeFriends = () =>
          `${Math.round(1 + Math.random() * (userModels.length - 1))}`;
        // Filter func
        const onlyUnique = (value, index, self) =>
          self.indexOf(value) === index;

        // Fill empty array with ids
        const friendsList = Array.from(emptyArr, makeFriends)
          // Filter redundant ids
          .filter(onlyUnique)
          // Map ids to models
          .map((id) => userModels[id]);

        // Update user relationships
        user.update({ friends: friendsList });

        // Create posts for all users
        const feed = server.create('feed', {
          owner: user,
        });

        server.createList('post', 2, {
          feed,
          author: user,
          views: 0,
        });
      });

      // Remove possible self reference from friends list
      server.schema.users.all().models.forEach((user) => {
        user.update(
          'friendIds',
          user.friendIds.filter((id) => id !== user.id)
        );
      });

      const admin = server.schema.users.all().models[3];

      admin.update({
        password: 'admin',
        login: 'admin',
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
