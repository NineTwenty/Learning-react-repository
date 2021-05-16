import reducerRegistry from 'redux/reducerRegistery';
import { entitiesReducer, entitiesSliceName } from './entitiesSlice';

// Re-export

// Dialogs
export {
  addDialogs,
  fetchDialogs,
  submitDialog,
  selectDialogs,
  selectDialogById,
  selectDialogsIds,
  selectDialogMemberId
} from './dialogsSlice';

// Users
export {
  addUsers,
  fetchUsers,
  submitUser,
  selectUserById,
  selectUsersIds,
} from './usersSlice';

// Posts
export {
  fetchPosts,
  submitPost,
  selectPostById,
  selectPostsIds,
  getIsLoadingPostStatus,
} from './postsSlice';

// Registration

reducerRegistry.register(entitiesSliceName, entitiesReducer);
