import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from 'types/entities.types';
import { api } from 'utils/api/API';
import { addUser } from './entities/usersSlice';
import type { AppDispatch, RootState } from './store';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from './utils';
import type { StatusState } from './utils/utils.types';

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
  userId: User['id'] | null;
  loggedIn: boolean;
} & StatusState;

// Initial state

const initialState: AuthState = {
  userId: null,
  loggedIn: false,
  status: 'idle',
};

const loginActions = { loginStarted, loginCompleted };
const logoutActions = createLoadingActions(sliceName, 'logout');
const registrationActions = createLoadingActions(sliceName, 'registration');
const authorizationActions = createLoadingActions<User['id']>(
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
      type === logoutActions.success.toString() ||
      type === authorizationActions.failure.toString();

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
      const response = await api.post('auth/login', {
        login,
        password,
      });

      if (response) {
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
  // Dispatch start of request
  dispatch(authorizationActions.request());
  try {
    // Fetch current user
    const { user } = await api.get<{ user: User }>('auth/me');

    dispatch(addUser(user));
    dispatch(authorizationActions.success(user.id));
  } catch (err) {
    dispatch(authorizationActions.failure());
  }
};

export const logoutRequest = () =>
  async function logoutThunk(dispatch: AppDispatch) {
    dispatch(logoutActions.request());
    try {
      await api.post('auth/logout', {});
      dispatch(logoutActions.success());
    } catch (error) {
      dispatch(logoutActions.failure());
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

export const handleUserRegistration =
  (
    userData: Partial<User> &
      Pick<User, 'firstName' | 'lastName' | 'email'> & {
        password: string;
      }
  ) =>
  async (dispatch: AppDispatch): Promise<{ payload: string[] } | void> => {
    dispatch(registrationActions.request());

    try {
      // Registration
      const { token } = await api.post<{ token: string }>(
        '/registration',
        userData
      );

      if (token) {
        dispatch(registrationActions.success());

        // Authorize user after successful registration
        await dispatch(authorizationRequest());
      }
    } catch (err) {
      dispatch(registrationActions.failure());
      if (axios.isAxiosError(err)) {
        if (Array.isArray(err.response?.data))
          // Return error to form
          return { payload: err.response?.data as string[] };
      }
    }
  };

// Selectors

export const selectLoggedInStatus = (state: RootState) =>
  state[sliceName].loggedIn;
export const selectCurrentUserId = (state: RootState) =>
  state[sliceName].userId;
