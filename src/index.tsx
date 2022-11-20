import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'data/store';
import { IconContext } from 'react-icons';
import * as serviceWorker from './serviceWorker';

import App from './app/App';

const iconsConfig = { className: 'react-icons' };

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <IconContext.Provider value={iconsConfig}>
          <App />
        </IconContext.Provider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
