import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logoutMiddleware } from './middleware/logoutMiddleware';
import { entitiesReducer } from './entities/entitiesSlice';
import { appReducer } from './appSlice';
import { authReducer } from './authSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  entities: entitiesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [logoutMiddleware, ...getDefaultMiddleware()],
});

export default store;
