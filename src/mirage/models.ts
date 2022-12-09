import { belongsTo, hasMany, Model } from 'miragejs';

export default {
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
};
