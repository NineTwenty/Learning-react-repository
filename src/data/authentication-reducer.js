import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { authAPI } from '../api/API';
import reducerRegistry from './reducerRegistery';

const reducerName = 'authentication';

// Thunks

export const submitLoginForm = createAsyncThunk(
  `${reducerName}/submitLoginForm`,
  async ({ login, password }, thunkAPI) => {
    // Login request
    const { success, user, errors } = await authAPI.authLogin(login, password);

    // // TEMPORARY: Fix errors type
    // const formatedErrors = Array.isArray(errors) ? errors : [errors];

    if (success) {
      // Cookie auth imitation workaround
      localStorage.setItem('userId', user.id);

      // On success set active user
      return user;
      // Or return submission errors back to form
    } else return thunkAPI.rejectWithValue(errors);
  }
);

// Slice

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: null,
    loggedIn: false,
    loading: 'idle',
    currentRequestId: null,
  },
  extraReducers: {
    [submitLoginForm.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [submitLoginForm.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.user = action.payload;
        state.currentRequestId = null;
        state.loggedIn = true;
      }
    },
    [submitLoginForm.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = null;
      }
    },
  },
});

// Registration

reducerRegistry.register(authSlice.name, authSlice.reducer);

// Selectors

export const getLoggedInStatus = (state) => state[reducerName].loggedIn;
