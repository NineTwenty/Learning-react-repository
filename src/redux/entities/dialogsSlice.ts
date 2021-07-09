// @ts-nocheck
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { api } from 'api/API';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from 'redux/utils';
import { addUsers } from './usersSlice';
import { selectCurrentUserId } from '..';

const sliceName = 'dialogs';

// Loading reducers
const { handleRequestStart, handleRequestEnd } = createLoadingReducers();
// Loading matchers
const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);

// Adapter
const adapter = createEntityAdapter();

const initialState = adapter.getInitialState({ status: 'idle' });

// Loading actions
const getRequest = createLoadingActions(sliceName, 'get');
const submitRequest = createLoadingActions(sliceName, 'submit');

// Slice

const dialogsSlice = createSlice({
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
export const dialogsReducer = dialogsSlice.reducer;
export const dialogsSliceName = dialogsSlice.name;

// Actions

export const addDialogs = dialogsSlice.actions.addMany;

// Thunks

export const fetchDialogs = () => async (dispatch) => {
  dispatch(getRequest.request());
  try {
    const { dialogs, users } = await api.get('dialogs?include=members');
    dispatch(getRequest.success(dialogs));
    dispatch(addUsers(users));
  } catch (error) {
    dispatch(getRequest.failure(error));
  }
};

export const submitDialog = (newDialog) => async (dispatch) => {
  dispatch(submitRequest.request());
  try {
    const { dialog } = await api.post('dialogs', newDialog);
    dispatch(submitRequest.success(dialog));
  } catch (error) {
    dispatch(submitRequest.failure());
  }
};

// Selectors

const selectors = adapter.getSelectors((state) => state.entities[sliceName]);

const { selectIds, selectById, selectAll } = selectors;

export const selectDialogs = (state) => selectAll(state);
export const selectDialogsIds = (state) => selectIds(state);
export const selectDialogById = (id) => (state) => selectById(state, id);
export const selectDialogMemberId = (dialogId) => (state) => {
  // Get current user
  const userId = selectCurrentUserId(state);
  // Get dialog
  const dialog = selectDialogById(dialogId)(state);
  // If dialog defined find member which is not current user
  const memberId = dialog
    ? dialog.members.find((member) => member !== userId)
    : undefined;

  return memberId;
};
