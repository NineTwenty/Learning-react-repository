import {
  createSlice,
  createAsyncThunk,
  combineReducers,
  createReducer,
} from '@reduxjs/toolkit';
import reducerRegistry from 'data/reducerRegistery';
import { formByIdsList, reducerLoadingMap } from 'data/utils';
import { postsAPI } from 'api/API';

const sliceName = 'posts';

// Thunks

export const submitPost = createAsyncThunk(
  `${sliceName}/submitPost`,
  async (posts, thunkAPI) => {
    try {
      return await postsAPI.sumbitPost(posts);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Slice

const postsSlice = createSlice({
  name: sliceName,
  initialState: {
    byId: {},
    allIds: [],
  },
  extraReducers: {
    [submitPost.fulfilled]: (state, action) => {
      // Format new posts
      const posts = formByIdsList(action.payload);

      state.byId = { ...state.byId, ...posts };
      // Add new ids
      state.allIds.push(...Object.keys(posts).map(Number));
    },
  },
});

// Create complete reducer

const postsLoading = createReducer(false, reducerLoadingMap(submitPost));

export const postsReducer = combineReducers({
  data: postsSlice.reducer,
  isLoading: postsLoading,
});

// Registration

reducerRegistry.register(postsSlice.name, postsReducer);

// Selectors

export const getIsLoadingPostStatus = state => state[postsSlice.name].isLoading
