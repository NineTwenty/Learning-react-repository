import { Post } from 'common/entities.types';
import { StatusState } from 'redux/utils/utils.types';
import { createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import { api } from 'api/API';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from 'redux/utils';

const sliceName = 'posts';

// Adapter
const adapter = createEntityAdapter<Post>();

// Initial state
const initialState = adapter.getInitialState<StatusState>({ status: 'idle' });

// State type
export type PostsState = typeof initialState;

// Loading reducers
const { handleRequestStart, handleRequestEnd } =
  createLoadingReducers<PostsState>();

// Loading matchers
const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);

const getRequest = createLoadingActions<Post[]>(sliceName, 'get');
const submitRequest = createLoadingActions<Post>(sliceName, 'submit');

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

// Thunks

export const fetchPosts = () => async (dispatch: any) => {
  dispatch(getRequest.request());
  try {
    const { posts } = await api.get('posts');
    dispatch(getRequest.success(posts));
  } catch (error) {
    dispatch(getRequest.failure());
  }
};

export const submitPost = (newPost: Post) => async (dispatch: any) => {
  dispatch(submitRequest.request());
  try {
    const { post } = await api.post('posts', newPost);
    dispatch(submitRequest.success(post));
  } catch (error) {
    dispatch(submitRequest.failure());
  }
};

// Selectors

const selectors = adapter.getSelectors(
  (state: any): PostsState => state.entities[sliceName]
);

const { selectIds, selectById } = selectors;

export const getIsLoadingPostStatus = (state: any) =>
  state.entities[sliceName].status !== 'idle';

export const selectPostsIds = (state: PostsState) => selectIds(state);
export const selectPostById = (id: EntityId) => (state: PostsState) =>
  selectById(state, id);
