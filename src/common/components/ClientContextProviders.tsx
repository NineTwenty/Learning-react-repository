import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import store from 'data/store';

// Eslint false positive
// eslint-disable-next-line react/jsx-no-constructed-context-values
const iconsConfig = { className: 'react-icons' };

type Props = {
  children: React.ReactNode;
};

export default function ClientContextProviders({ children }: Props) {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <IconContext.Provider value={iconsConfig}>
            {children}
          </IconContext.Provider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
