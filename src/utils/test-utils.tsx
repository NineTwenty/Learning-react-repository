import type { RootState } from 'data/store';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
} from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { createStore } from 'data/store';

const iconsConfig = { className: 'react-icons' };

type RenderOptions = {
  route?: string;
  initialState?: PreloadedState<RootState>;
} & RtlRenderOptions;

type WrapperProps = {
  children: React.ReactNode;
};

const render = (
  ui: ReactElement,
  { route = '/', initialState, ...renderOptions }: RenderOptions = {}
) => {
  const store = createStore(initialState);
  // eslint-disable-next-line react/function-component-definition, react/prop-types
  const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    window.history.pushState({}, 'test page', route);
    return (
      <BrowserRouter>
        <Provider store={store}>
          <IconContext.Provider value={iconsConfig}>
            {children}
          </IconContext.Provider>
        </Provider>
      </BrowserRouter>
    );
  };

  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';
export { default as createPreloadedState } from './createPreloadedState';
export { render };
