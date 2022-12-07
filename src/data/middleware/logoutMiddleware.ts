import type { Action, Middleware } from '@reduxjs/toolkit';
import type { AppDispatch } from 'data/store';
import { logoutRequest } from 'data/authSlice';
import { LOGOUT } from 'data/common/actions';

// Middleware to perform cleanup side effects after logout

export const logoutMiddleware: Middleware =
  (storeApi) => (next) => (action: Action<string>) => {
    const { type } = action;
    // Middleware type fail to infer dispatch type correctly without circular dependency
    // https://github.com/reduxjs/redux-toolkit/issues/368
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const dispatch = storeApi.dispatch as AppDispatch;

    if (type === LOGOUT) {
      localStorage.removeItem('token');
      void dispatch(logoutRequest());
    }

    return next(action);
  };
