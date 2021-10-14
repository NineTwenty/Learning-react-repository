import { Post } from 'common/entities.types';
import { AppDispatch, RootState } from 'redux/store';
import { StatusState } from 'redux/utils/utils.types';
import { createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import { api } from 'api/API';
import { isTokenExpireResponse } from 'api/APIUtils';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from 'redux/utils';
import { logout } from 'redux/common/actions';

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
const deleteRequest = createLoadingActions<EntityId>(sliceName, 'delete');

// Slice

const postsSlice = createSlice({
  /* eslint-disable @typescript-eslint/unbound-method */

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
    builder.addCase(deleteRequest.success.type, adapter.removeOne);
    builder.addMatcher(isStartOfRequest, handleRequestStart);
    builder.addMatcher(isEndOfRequest, handleRequestEnd);
  },
  /* eslint-enable @typescript-eslint/unbound-method */
});

// Registration data
export const postsReducer = postsSlice.reducer;
export const postsSliceName = postsSlice.name;

// Action creators

export const setPosts = postsSlice.actions.setAll;

// Thunks

export const fetchPosts = () => async (dispatch: AppDispatch) => {
  dispatch(getRequest.request());
  try {
    const { posts } = await api.get<{ posts: Post[] }>('posts');

    dispatch(getRequest.success(posts));
  } catch (error) {
    if (isTokenExpireResponse(error)) {
      dispatch(getRequest.failure());
      dispatch(logout());
    }
  }
};

export const submitPost = (newPost: Post) => async (dispatch: AppDispatch) => {
  dispatch(submitRequest.request());
  try {
    const { post } = await api.post<{ post: Post }>('posts', newPost);

    dispatch(submitRequest.success(post));
  } catch (error) {
    if (isTokenExpireResponse(error)) {
      dispatch(submitRequest.failure());
      dispatch(logout());
    }
  }
};

export const deletePost = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(deleteRequest.request());
  try {
    await api.delete(`posts/${id}`);
    dispatch(deleteRequest.success(id));
  } catch (error) {
    dispatch(deleteRequest.failure());
    if (isTokenExpireResponse(error)) {
      dispatch(logout());
    }
  }
};

// Selectors

const selectors = adapter.getSelectors(
  (state: RootState): PostsState => state.entities[sliceName]
);

const { selectIds, selectById } = selectors;

export const getIsLoadingPostStatus = (state: RootState) =>
  state.entities[sliceName].status !== 'idle';

export const selectPostsIds = (state: RootState) => selectIds(state);
export const selectPostById = (id: EntityId) => (state: RootState) =>
  selectById(state, id);
