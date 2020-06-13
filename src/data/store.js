import { createStore, combineReducers } from 'redux';
import dialogsPage from './dialogs-reducer';

const combinedReducers = combineReducers({
  dialogsPage
})

const store = createStore(combinedReducers);

export default store;
