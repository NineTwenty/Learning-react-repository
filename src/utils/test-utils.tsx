import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
} from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory, MemoryHistory } from 'history';
import { PreloadedState } from 'redux';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { createStore, RootState } from 'data/store';

const iconsConfig = { className: 'react-icons' };

type RenderOptions = {
  route?: string;
  history?: MemoryHistory;
  initialState?: PreloadedState<RootState>;
} & RtlRenderOptions;

const render = (
  ui: ReactElement,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    ...renderOptions
  }: RenderOptions = {}
) => {
  const store = createStore(initialState);
  // eslint-disable-next-line react/function-component-definition, react/prop-types
  const Wrapper: React.FC = ({ children }) => {
    return (
      <Router history={history}>
        <Provider store={store}>
          <IconContext.Provider value={iconsConfig}>
            {children}
          </IconContext.Provider>
        </Provider>
      </Router>
    );
  };

  return {
    store,
    history,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

export * from '@testing-library/react';
export { render };
