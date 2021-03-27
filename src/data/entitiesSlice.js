import reducerRegistry from 'data/reducerRegistery';
import { combineReducers } from 'redux';
import { postsReducer } from './postSlice/postsSlice';
import { usersReducer } from './usersSlice';
// forced export to include module in webpack bundle
export const workaround = 'workaround';
const sliceName = 'entities';
const entities = {
  posts: postsReducer,
  users: usersReducer
};

const entitiesReducer = combineReducers(entities);

reducerRegistry.register(sliceName, entitiesReducer);
