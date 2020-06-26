import { createStore, combineReducers } from 'redux';
import dialogsPage from './dialogs-reducer';
import authentication from './authentication-reducer'

const combinedReducers = combineReducers({
  authentication,
  dialogsPage
})

const store = createStore(combinedReducers);

export default store;
