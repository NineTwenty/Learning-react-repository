import { appReducer, appSliceName } from './appSlice';
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
export { initialization, selectIsAppInitialized } from './appSlice';

// Registration

reducerRegistry.register(appSliceName, appReducer);
reducerRegistry.register(authSliceName, authReducer);
