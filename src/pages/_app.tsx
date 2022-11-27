import '../index.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { IconContext } from 'react-icons';
import store from 'data/store';

// Eslint false positive
// eslint-disable-next-line react/jsx-no-constructed-context-values
const iconsConfig = { className: 'react-icons' };

export default function App({ Component }: AppProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <IconContext.Provider value={iconsConfig}>
          <Head>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <title>RRP</title>
          </Head>
          <Component />
        </IconContext.Provider>
      </Provider>
    </React.StrictMode>
  );
}
