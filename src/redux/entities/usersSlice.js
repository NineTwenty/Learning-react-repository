import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { api } from 'api/API';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from 'redux/utils';

const sliceName = 'users';

// Loading reducers
const { handleRequestStart, handleRequestEnd } = createLoadingReducers();
// Loading matchers
const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);

// Adapter
const adapter = createEntityAdapter();

const initialState = adapter.getInitialState({ status: 'idle' });

// Actions
const getRequest = createLoadingActions(sliceName, 'get');
const submitRequest = createLoadingActions(sliceName, 'submit');

// Slice

const usersSlice = createSlice({
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
export const usersReducer = usersSlice.reducer;
export const usersSliceName = usersSlice.name;


// Exported actions

export const addUser = usersSlice.actions.addOne
export const addUsers = usersSlice.actions.addMany

// Thunks

export const fetchUsers = () => async (dispatch) => {
  dispatch(getRequest.request());
  try {
    const { users } = await api.get('users');
    dispatch(getRequest.success(users));
  } catch (error) {
    dispatch(getRequest.failure(error));
  }
};

export const submitUser = (newUser) => async (dispatch) => {
  dispatch(submitRequest.request());
  try {
    const { user } = await api.post('users', newUser);
    dispatch(submitRequest.success(user));
  } catch (error) {
    dispatch(submitRequest.failure());
  }
};

// Selectors

const selectors = adapter.getSelectors((state) => state.entities[sliceName]);

const { selectIds, selectById, selectEntities } = selectors;

export const selectUsersIds = (state) => selectIds(state);
export const selectUserById = (id) => (state) => selectById(state, id);
export const selectUsersByIds = (ids) => (state) => {
  const entities = selectEntities(state);

  return ids.map((id) => entities[id]).filter(Boolean);
};
