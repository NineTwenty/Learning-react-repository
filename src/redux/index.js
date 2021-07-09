import {
  appReducer,
  appSliceName,
  initialization,
  selectIsAppInitialized,
} from './appSlice';
import { authSliceName, authReducer } from './authSlice';
import reducerRegistry from './reducerRegistery';

// Re-export

// Auth
export {
  logout,
  submitLoginForm,
  authorizationRequest,
  selectLoggedInStatus,
  selectCurrentUserId,
} from './authSlice';

// App
export { initialization, selectIsAppInitialized };

// Registration

reducerRegistry.register(appSliceName, appReducer);
reducerRegistry.register(authSliceName, authReducer);
