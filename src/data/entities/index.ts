// Re-export

// Entities
export { entitiesReducer, entitiesSliceName } from './entitiesSlice';

// Dialogs
export {
  addDialogs,
  fetchDialogs,
  submitDialog,
  selectDialogs,
  selectDialogById,
  selectDialogsIds,
  selectDialogMemberId,
  selectDialogByMember,
} from './dialogsSlice';
export type { DialogsState } from './dialogsSlice';

// Users
export {
  addUsers,
  fetchUsers,
  submitUser,
  selectUserById,
  selectUsersIds,
  selectUsersByIds,
} from './usersSlice';
export type { UserState } from './usersSlice';

// Posts
export {
  fetchPosts,
  submitPost,
  setPosts,
  selectPostById,
  selectPostsIds,
  getIsLoadingPostStatus,
} from './postsSlice';
export type { PostsState } from './postsSlice';

// Messages
export {
  fetchMessages,
  submitMessage,
  selectMessages,
  selectMessagesIds,
  selectMessageById,
  selectLoadedMessagesByIds,
  clearMessages,
} from './messagesSlice';
export type { MessagesState } from './messagesSlice';

// Feeds
export {
  fetchFeed,
  selectFeedById,
  selectIsLoadingFeedStatus,
} from './feedsSlice';
export type { FeedsState } from './feedsSlice';
