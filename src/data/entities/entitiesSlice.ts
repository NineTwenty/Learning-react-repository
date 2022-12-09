import { combineReducers } from '@reduxjs/toolkit';
import { dialogsReducer, dialogsSliceName } from './dialogsSlice';
import { feedsReducer, feedsSliceName } from './feedsSlice';
import { messagesReducer, messagesSliceName } from './messagesSlice';
import { postsReducer, postsSliceName } from './postsSlice';
import { usersReducer, usersSliceName } from './usersSlice';

const entities = {
  [dialogsSliceName]: dialogsReducer,
  [postsSliceName]: postsReducer,
  [usersSliceName]: usersReducer,
  [messagesSliceName]: messagesReducer,
  [feedsSliceName]: feedsReducer,
};

export const entitiesSliceName = 'entities';
export const entitiesReducer = combineReducers(entities);
