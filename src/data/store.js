import { combineReducers } from 'redux';
import reducerRegistry from './reducerRegistery';
import { configureStore } from '@reduxjs/toolkit';
// forced import to include module in webpack bundle
import { workaround } from './entitiesSlice';
let fix = workaround;

let reducers = reducerRegistry.getReducers();

reducers = !reducers.keys ? () => {} : combineReducers(reducers);

const store = configureStore({
  reducer: reducers,
});

reducerRegistry.setChangeListener((reducers) =>
  store.replaceReducer(combineReducers(reducers))
);

export default store;
