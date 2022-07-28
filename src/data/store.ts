import { combineReducers, PreloadedState } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer, authReducer } from 'data';
import { logoutMiddleware } from './middleware/logoutMiddleware';
import { entitiesReducer } from './entities';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  entities: entitiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function createStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logoutMiddleware),
    preloadedState,
  });
}

const store = createStore();

export default store;
export type AppDispatch = typeof store.dispatch;
