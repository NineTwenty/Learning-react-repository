import { createSlice } from '@reduxjs/toolkit';
import { authorizationRequest } from './';

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

// Slice

const appSlice = createSlice({
  name: sliceName,
  initialState: {
    isInitialized: false,
  },
  extraReducers: {
    [INITIALIZATION_FINISH]: (state, action) => {
      state.isInitialized = true;
    },
  },
});

// Registration data
export const appReducer = appSlice.reducer;
export const appSliceName = appSlice.name;

// Thunks

export const initialization = () => async (dispatch) => {
  dispatch(initializationStarted());

  try {
      // Authorization request in case the JWT is present in localStorage
    await dispatch(authorizationRequest());
  } finally {
    dispatch(initializationFinished());
  }
};

// Selectors

export const selectIsAppInitialized = (state) => state[sliceName].isInitialized;
