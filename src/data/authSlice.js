import {
  createSlice,
} from '@reduxjs/toolkit';
import { api } from '../api/API';
import reducerRegistry from './reducerRegistery';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from './utils';

// Slice name

const sliceName = 'auth';

// Constants

const LOGIN_STARTED = `${sliceName}/login/started`;
const LOGIN_COMPLETED = `${sliceName}/login/completed`;

// Action creators

const loginStarted = () => ({
  type: LOGIN_STARTED,
});
const loginCompleted = () => ({
  type: LOGIN_COMPLETED,
});

const loginActions = { loginStarted, loginCompleted };
const authorizationActions = createLoadingActions(sliceName, 'authorization');
const authenticationActions = createLoadingActions(sliceName, 'authentication');

// Loading reducer setup

const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);
const { handleRequestStart, handleRequestEnd } = createLoadingReducers();

// Slice

const authSlice = createSlice({
  name: sliceName,
  initialState: {
    user: null,
    loggedIn: false,
    status: 'idle',
  },
  extraReducers: (builder) => {
    // authorizationRequest passed authorization
    builder.addCase(authorizationActions.success, (state, action) => {
      if (state.status === 'pending') {
        state.user = action.payload;
        state.loggedIn = true;
      }
    });

    // authorizationRequest failed authorization
    builder.addCase(authorizationActions.failure, (state, action) => {
      if (state.status === 'pending') {
        state.user = null;
        state.loggedIn = false;
      }
    });

    builder.addMatcher(isStartOfRequest, handleRequestStart);
    builder.addMatcher(isEndOfRequest, handleRequestEnd);
  },
});

// Thunks

// Authentication
const authenticationRequest = (login, password) => async (dispatch) => {
  dispatch(authenticationActions.request());

  try {
    // Login request
    const { body } = await api.post('auth/login', { login, password });
    const { token } = body;

    if (token) {
      // Set token
      localStorage.setItem('token', token);

      dispatch(authenticationActions.success());
    }
  } catch (err) {
    dispatch(authenticationActions.failure(err.response.body));
    // Rethrow to login form
    throw err;
  }
};

// Authorization
export const authorizationRequest = () => async (dispatch) => {
  const token = localStorage.getItem('token');

  // Check if there is token
  if (token) {
    // Dispatch start of request
    dispatch(authorizationActions.request());
    try {
      // Fetch current user
      const { user } = await api.get('auth/me');

      if (user) {
        dispatch(authorizationActions.success(user));
      }
    } catch (err) {
      // Remove token due to failed authorization
      localStorage.removeItem('token');

      dispatch(authorizationActions.failure(err.response.body));
    }
  }
};

// onSubmit thunk for loginForm
export const submitLoginForm = ({ login, password }) => async (dispatch) => {
  dispatch(loginActions.loginStarted());

  try {
    // Authentication
    await dispatch(authenticationRequest(login, password));

    // Authorization
    await dispatch(authorizationRequest());
  } catch (err) {
    // Return error to form
    return { payload: err.response.body };
  } finally {
    dispatch(loginActions.loginCompleted());
  }
};

// Registration

reducerRegistry.register(authSlice.name, authSlice.reducer);

// Selectors

export const selectLoggedInStatus = (state) => state[sliceName].loggedIn;
export const selectCurrentUserId = (state) => {
  if (state[sliceName].user) {
    return state[sliceName].user.userId;
  }
};
