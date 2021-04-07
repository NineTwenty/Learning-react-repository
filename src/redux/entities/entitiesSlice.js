import { combineReducers } from 'redux';
import { dialogsReducer, dialogsSliceName } from './dialogsSlice';
import { postsReducer, postsSliceName } from './postsSlice';
import { usersReducer, usersSliceName } from './usersSlice';

const entities = {
  [dialogsSliceName]: dialogsReducer,
  [postsSliceName]: postsReducer,
  [usersSliceName]: usersReducer
};

export const entitiesSliceName = 'entities';
export const entitiesReducer = combineReducers(entities);
