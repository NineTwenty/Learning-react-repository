import { createSlice } from '@reduxjs/toolkit';
import { authorizationRequest } from './authSlice';
import type { AppDispatch, RootState } from './store';

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
};

// Initital state

const initialState: AppState = {
  isInitialized: false,
};

// Slice

const appSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  /* eslint-disable no-param-reassign */
  extraReducers: (builder) => {
    builder.addCase(INITIALIZATION_FINISH, (state) => {
      state.isInitialized = true;
    });
  },
  /* eslint-enable no-param-reassign */
});

// Registration data
export const appReducer = appSlice.reducer;
export const appSliceName = appSlice.name;

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
