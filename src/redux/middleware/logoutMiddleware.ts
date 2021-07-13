import { Middleware } from 'redux';
import { LOGOUT } from 'redux/common/actions';

// Middleware to perform cleanup side effects after logout

export const logoutMiddleware: Middleware = (store) => (next) => (action) => {
  const { type } = action;

  if (type === LOGOUT) {
    localStorage.removeItem('token');
  }

  return next(action);
};
