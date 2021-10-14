import { createSlice, EntityId } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'common/entities.types';
import { api } from '../api/API';
import { LOGOUT } from './common/actions';
import { addUser } from './entities/usersSlice';
import { AppDispatch, RootState } from './store';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from './utils';
import { StatusState } from './utils/utils.types';

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

// State type

type AuthState = {
  userId: EntityId | null;
  loggedIn: boolean;
} & StatusState;

// Initial state

const initialState: AuthState = {
  userId: null,
  loggedIn: false,
  status: 'idle',
};

const loginActions = { loginStarted, loginCompleted };
const authorizationActions = createLoadingActions<EntityId>(
  sliceName,
  'authorization'
);
const authenticationActions = createLoadingActions(sliceName, 'authentication');

// Loading reducer setup

const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);
const { handleRequestStart, handleRequestEnd } =
  createLoadingReducers<AuthState>();

// Slice

const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* eslint-disable no-param-reassign */
    // authorizationRequest passed authorization
    builder.addCase(authorizationActions.success, (state, action) => {
      if (state.status === 'pending') {
        state.userId = action.payload;
        state.loggedIn = true;
      }
    });

    // Logout matcher
    const isLogout = ({ type }: { type: string }) =>
      type === LOGOUT || type === authorizationActions.failure.toString();

    // Logout handler
    builder.addMatcher(isLogout, (state) => {
      state.userId = null;
      state.loggedIn = false;
    });

    builder.addMatcher(isStartOfRequest, handleRequestStart);
    builder.addMatcher(isEndOfRequest, handleRequestEnd);
    /* eslint-enable no-param-reassign */
  },
});

// Registration data
export const authReducer = authSlice.reducer;
export const authSliceName = authSlice.name;

// Thunks

// Authentication
const authenticationRequest =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(authenticationActions.request());

    try {
      // Login request
      const { token } = await api.post<{ token: string }>('auth/login', {
        login,
        password,
      });

      if (token) {
        // Set token
        localStorage.setItem('token', token);

        dispatch(authenticationActions.success());
      }
    } catch (err) {
      dispatch(authenticationActions.failure());
      // Rethrow to login form
      throw err;
    }
  };

// Authorization
export const authorizationRequest = () => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem('token');

  // Check if there is token
  if (token) {
    // Dispatch start of request
    dispatch(authorizationActions.request());
    try {
      // Fetch current user
      const { user } = await api.get<{ user: User }>('auth/me');

      dispatch(addUser(user));
      dispatch(authorizationActions.success(user.id));
    } catch (err) {
      // Remove token due to failed authorization
      localStorage.removeItem('token');

      dispatch(authorizationActions.failure());
    }
  }
};

// onSubmit thunk for loginForm
export const submitLoginForm =
  ({
    login,
    password,
  }: {
    login: string;
    password: string;
    rememberMe: boolean;
  }) =>
  async (dispatch: AppDispatch): Promise<{ payload: string[] } | void> => {
    dispatch(loginActions.loginStarted());

    try {
      // Authentication
      await dispatch(authenticationRequest(login, password));

      // Authorization
      await dispatch(authorizationRequest());
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (Array.isArray(err.response?.data))
          // Return error to form
          return { payload: err.response?.data as string[] };
      }
    } finally {
      dispatch(loginActions.loginCompleted());
    }
  };

// Selectors

export const selectLoggedInStatus = (state: RootState) =>
  state[sliceName].loggedIn;
export const selectCurrentUserId = (state: RootState) =>
  state[sliceName].userId;
