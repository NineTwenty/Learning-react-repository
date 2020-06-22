import './index.css';
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './data/store';
import App from './App';

import { makeServer } from './server';
import ky from 'ky';

// Run Mirage mock server
makeServer();

window.ky = ky;
window.store = store;

const explicitRender = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App {...store.getState()} dispatch={store.dispatch.bind(store)} />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

explicitRender(store);

store.subscribe(explicitRender);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
