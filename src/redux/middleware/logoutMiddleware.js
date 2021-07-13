import { logout } from '../common/actions';

// Middleware to intercept and react on
// failure actions with error api response as payload

export const logoutMiddleware = ((dispatchedActions) => {
  // Check if actions array been provided
  if (Array.isArray(dispatchedActions)) {
    // return actual middleware func
    return (store) => (next) => (action) => {
      const { payload } = action;

      // Check if payload is error
      if (payload instanceof Error) {
        const isApiError = payload.response && payload.response.body.message;

        if (isApiError) {
          const message = payload.response.body.message;

          // Is it JWT error
          if (message === 'jwt expired') {
            // Then dispatch every provided action
            return dispatchedActions.forEach((action) => {
              store.dispatch(action());
            });
          }
        }
      }
      // If it's not, pass action forward
      return next(action);
    };
  }
})([logout]);
