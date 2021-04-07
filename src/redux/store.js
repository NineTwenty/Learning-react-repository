import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducerRegistry from './reducerRegistery';
import { logoutMiddleware } from './middleware/logoutMiddleware';

let reducers = reducerRegistry.getReducers();

reducers = !reducers.keys ? () => {} : combineReducers(reducers);

const store = configureStore({
  reducer: reducers,
  middleware: [logoutMiddleware, ...getDefaultMiddleware()]
});

reducerRegistry.setChangeListener((reducers) =>
  store.replaceReducer(combineReducers(reducers))
);

export default store;
