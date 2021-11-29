import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer, authReducer } from 'data';
import { logoutMiddleware } from './middleware/logoutMiddleware';
import { entitiesReducer } from './entities';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  entities: entitiesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logoutMiddleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
