// eslint-disable-next-line
import {
  Server,
  Model,
  hasMany,
  belongsTo,
  RestSerializer,
  Response,
} from 'miragejs';
import { UnsecuredJWT } from 'jose';
import fixtures from 'mirage/fixtures';

// ==================
// 1. Serializers
// 2. Models
// 3. Fixtures
// 4. Routes
//  4.0 Utils
//  4.1 Users
//  4.2 Dialogs
//  4.3 Messages
//  4.4 Posts
//  4.5 Authentication
//  4.7 Registration
// ==================

function createJWT(user) {
  const { id: userId } = user;

  return new UnsecuredJWT({ userId })
    .setIssuedAt()
    .setExpirationTime('100m')
    .encode();
}

function verifyJWT(authHeader) {
  let token;

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7, authHeader.length);
  }

  return UnsecuredJWT.decode(token).payload;
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
    // 3. Fixtures
    // ==================

    fixtures,

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
          post.created = Date.now();
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

      // ==================
      // 4.7 Registration
      // ==================

      this.post('/registration', (schema, request) => {
        const {
          firstName,
          lastName,
          email,
          login,
          password,
          address,
          phoneNumber,
          birthDate,
        } = JSON.parse(request.requestBody);

        const isUserExist = schema.users.findBy({ email });

        if (isUserExist) {
          return new Response(409, {}, [
            'Account with such email already exists',
          ]);
        }

        const user = schema.users.create({
          fullName: `${firstName} ${lastName}`,
          firstName,
          lastName,
          email,
          login,
          password,
          address,
          phoneNumber,
          birthDate,
          online: false,
          lastOnlineTime: Date.now(),
          avatar: 'https://picsum.photos/200?random=0.885343491559527585',
          music: [],
          images: [],
          feed: schema.feeds.create(),
        });

        const token = createJWT(user);

        return new Response(200, {}, { token });
      });
    },
  });
}
