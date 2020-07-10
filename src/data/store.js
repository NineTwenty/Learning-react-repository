import { createStore, combineReducers, applyMiddleware } from 'redux';
import dialogsPage from './dialogs-reducer';
import authentication from './authentication-reducer';
import thunkMiddleware from 'redux-thunk';

const combinedReducers = combineReducers({
  authentication,
  dialogsPage,
});

const store = createStore(combinedReducers, applyMiddleware(thunkMiddleware));

export default store;
