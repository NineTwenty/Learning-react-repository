import reducerRegistry from 'data/reducerRegistery';
import { combineReducers } from 'redux';
// forced export to include module in webpack bundle
export const workaround = 'workaround';

const sliceName = 'entities';
const entities = {
};

const entitiesReducer = combineReducers(entities);

reducerRegistry.register(sliceName, entitiesReducer);
