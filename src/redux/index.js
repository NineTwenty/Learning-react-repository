import { authSliceName, authReducer } from './authSlice';
import reducerRegistry from './reducerRegistery';

// Re-export

export {
  logout,
  submitLoginForm,
  authorizationRequest,
  selectLoggedInStatus,
  selectCurrentUserId,
} from './authSlice';

// Registration

reducerRegistry.register(authSliceName, authReducer);
