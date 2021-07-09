import { combineReducers } from 'redux';
import { dialogsReducer, dialogsSliceName } from './dialogsSlice';
import { messagesReducer, messagesSliceName } from './messagesSlice';
import { postsReducer, postsSliceName } from './postsSlice';
import { usersReducer, usersSliceName } from './usersSlice';

const entities = {
  [dialogsSliceName]: dialogsReducer,
  [postsSliceName]: postsReducer,
  [usersSliceName]: usersReducer,
  [messagesSliceName]: messagesReducer
};

export const entitiesSliceName = 'entities';
export const entitiesReducer = combineReducers(entities);
