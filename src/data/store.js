import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducerRegistry from './reducerRegistery';

const combinedReducers = combineReducers(reducerRegistry.getReducers());

const store = createStore(combinedReducers, applyMiddleware(thunkMiddleware));

reducerRegistry.setChangeListener((reducers) =>
  store.replaceReducer(combineReducers(reducers))
);

export default store;
