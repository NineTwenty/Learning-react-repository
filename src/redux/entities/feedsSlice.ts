import { Feed } from 'common/entities.types';
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
import { setPosts } from './';

const sliceName = 'feeds';

// Adapter
const adapter = createEntityAdapter<Feed>();

// Initial state
const initialState = adapter.getInitialState<StatusState>({ status: 'idle' });

// State type
export type FeedsState = typeof initialState;

// Loading reducers
const { handleRequestStart, handleRequestEnd } =
  createLoadingReducers<FeedsState>();

// Loading matchers
const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);

const getRequest = createLoadingActions<Feed>(sliceName, 'get');

// Slice

const feedsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setOne: adapter.setOne,
  },
  extraReducers: (builder) => {
    // setAll payload of 'success' get action
    builder.addCase(getRequest.success.type, adapter.setOne);
    builder.addMatcher(isStartOfRequest, handleRequestStart);
    builder.addMatcher(isEndOfRequest, handleRequestEnd);
  },
});

// Registration data
export const feedsReducer = feedsSlice.reducer;
export const feedsSliceName = feedsSlice.name;

// Thunks

export const fetchFeed = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest.request());
  try {
    const { feed, posts } = await api.get(`feeds/${id}?include=posts`);
    dispatch(setPosts(posts));
    dispatch(getRequest.success(feed));
  } catch (error) {
    if (isTokenExpireResponse(error)) {
      dispatch(getRequest.failure());
      dispatch(logout());
    }
  }
};

// Selectors

const { selectById } = adapter.getSelectors(
  (state: RootState): FeedsState => state.entities[sliceName]
);

export const selectIsLoadingFeedStatus = (state: RootState) =>
  state.entities[sliceName].status !== 'idle';

export const selectFeedById = (id: EntityId) => (state: RootState) =>
  selectById(state, id);
