import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logoutMiddleware } from './middleware/logoutMiddleware';
import { entitiesReducer } from './entities';
import { appReducer } from '.';
import { authReducer } from '.';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  entities: entitiesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // @ts-expect-error
  middleware: [logoutMiddleware, ...getDefaultMiddleware()],
});

export default store;
