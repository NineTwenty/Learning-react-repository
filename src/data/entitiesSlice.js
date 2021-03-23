import reducerRegistry from 'data/reducerRegistery';
import { combineReducers } from 'redux';
import { postsReducer } from './postSlice/postsSlice';
// forced export to include module in webpack bundle
export const workaround = 'workaround';
const sliceName = 'entities';
const entities = {
  posts: postsReducer
};

const entitiesReducer = combineReducers(entities);

reducerRegistry.register(sliceName, entitiesReducer);
