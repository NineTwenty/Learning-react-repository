import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './data/state';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let { addMessage, updateTextareaContent } = store;

addMessage = addMessage.bind(store)
updateTextareaContent = updateTextareaContent.bind(store)

const explicitRender = (state, actions) => {
  ReactDOM.render(
    <React.StrictMode>
      <App {...state} {...actions} />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

window.store = store;

store.subscribe(explicitRender);

explicitRender(store.state, { addMessage, updateTextareaContent });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
