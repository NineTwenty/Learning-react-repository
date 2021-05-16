import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { api } from 'api/API';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from 'redux/utils';

const sliceName = 'posts';

// Loading reducers
const { handleRequestStart, handleRequestEnd } = createLoadingReducers();
// Loading matchers
const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);

// Adapter
const adapter = createEntityAdapter();

const initialState = adapter.getInitialState({ status: 'idle' });

const getRequest = createLoadingActions(sliceName, 'get');
const submitRequest = createLoadingActions(sliceName, 'submit');

// Slice

const postsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    setAll: adapter.setAll,
    removeOne: adapter.removeOne,
    removeMany: adapter.removeMany,
    updateOne: adapter.updateOne,
    updateMany: adapter.updateMany,
    upsertOne: adapter.upsertOne,
    upsertMany: adapter.upsertMany,
  },
  extraReducers: (builder) => {
    // setAll payload of 'success' get action
    builder.addCase(getRequest.success.type, adapter.setAll);
    builder.addCase(submitRequest.success.type, adapter.addOne);
    builder.addMatcher(isStartOfRequest, handleRequestStart);
    builder.addMatcher(isEndOfRequest, handleRequestEnd);
  },
});

// Registration data
export const postsReducer = postsSlice.reducer;
export const postsSliceName = postsSlice.name;


// Actions

// const actions = postsSlice.actions;

// Thunks

export const fetchPosts = () => async (dispatch) => {
  dispatch(getRequest.request());
  try {
    const { posts } = await api.get('posts');
    dispatch(getRequest.success(posts));
  } catch (error) {
    dispatch(getRequest.failure(error));
  }
};

export const submitPost = (newPost) => async (dispatch) => {
  dispatch(submitRequest.request());
  try {
    const { post } = await api.post('posts', newPost);
    dispatch(submitRequest.success(post));
  } catch (error) {
    dispatch(submitRequest.failure());
  }
};

// Selectors

const selectors = adapter.getSelectors((state) => state.entities[sliceName]);

const { selectIds, selectById } = selectors;

export const getIsLoadingPostStatus = (state) =>
  state.entities[sliceName].status !== 'idle';

export const selectPostsIds = (state) => selectIds(state);
export const selectPostById = (id) => (state) => selectById(state, id);
