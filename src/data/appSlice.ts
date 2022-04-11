import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authorizationRequest } from './authSlice';
import { AppDispatch, RootState } from './store';

const sliceName = 'app';

// Types

const INITIALIZATION_START = `${sliceName}/initialization/start`;
const INITIALIZATION_FINISH = `${sliceName}/initialization/finish`;

// Action creators

const initializationStarted = () => ({
  type: INITIALIZATION_START,
});

const initializationFinished = () => ({
  type: INITIALIZATION_FINISH,
});

// State type
type AppState = {
  isInitialized: boolean;
  redirectLink: string | undefined;
};

// Initital state

const initialState: AppState = {
  isInitialized: false,
  redirectLink: undefined,
};

// Slice

const appSlice = createSlice({
  name: sliceName,
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    redirected: (state) => {
      state.redirectLink = undefined;
    },
    redirectTo: (state, action: PayloadAction<string>) => {
      state.redirectLink = action.payload;
    },
  },
  extraReducers: {
    [INITIALIZATION_FINISH]: (state) => {
      state.isInitialized = true;
    },
  },
  /* eslint-enable no-param-reassign */
});

// Registration data
export const appReducer = appSlice.reducer;
export const appSliceName = appSlice.name;

// Action creators

export const { redirected } = appSlice.actions;
export const { redirectTo } = appSlice.actions;

// Thunks

export const initialization = () => async (dispatch: AppDispatch) => {
  dispatch(initializationStarted());

  try {
    // Authorization request in case the JWT is present in localStorage
    await authorizationRequest()(dispatch);
  } finally {
    dispatch(initializationFinished());
  }
};

// Selectors

export const selectIsAppInitialized = (state: RootState) =>
  state[sliceName].isInitialized;
export const selectRedirectLink = (state: RootState) =>
  state[sliceName].redirectLink;
