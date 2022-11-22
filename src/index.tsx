import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'data/store';
import { IconContext } from 'react-icons';

import App from './App';

// Eslint false positive
// eslint-disable-next-line react/jsx-no-constructed-context-values
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
