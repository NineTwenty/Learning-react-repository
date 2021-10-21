import { Dialog, User } from 'common/entities.types';
import { createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import { api } from 'api/API';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from 'redux/utils';
import { addUsers } from './';
import { selectCurrentUserId } from '..';
import { AppDispatch, RootState } from 'redux/store';
import { StatusState } from 'redux/utils/utils.types';
import { isTokenExpireResponse } from 'api/APIUtils';
import { logout } from 'redux/common/actions';
import { redirectTo } from 'redux/appSlice';

const sliceName = 'dialogs';

// Adapter
const adapter = createEntityAdapter<Dialog>();

// Initial state
const initialState = adapter.getInitialState<StatusState>({ status: 'idle' });

// State type
type DialogsState = typeof initialState;

// Loading reducers
const { handleRequestStart, handleRequestEnd } =
  createLoadingReducers<DialogsState>();

// Loading matchers
const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);

// Loading actions
const getRequest = createLoadingActions<Dialog[]>(sliceName, 'get');
const submitRequest = createLoadingActions<Dialog>(sliceName, 'submit');

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

export const fetchDialogs = () => async (dispatch: AppDispatch) => {
  dispatch(getRequest.request());
  try {
    const { dialogs, users } = await api.get<{
      dialogs: Dialog[];
      users: User[];
    }>('dialogs?include=members');

    dispatch(getRequest.success(dialogs));
    dispatch(addUsers(users));
  } catch (error) {
    if (isTokenExpireResponse(error)) {
      dispatch(getRequest.failure());
      dispatch(logout());
    }
  }
};

export const submitDialog = (id: EntityId) => async (dispatch: AppDispatch) => {
  const newDialog: Pick<Dialog, 'members'> = {
    members: [id],
  };

  dispatch(submitRequest.request());
  try {
    const { dialog } = await api.post<{ dialog: Dialog }>('dialogs', newDialog);
    dispatch(submitRequest.success(dialog));
    dispatch(redirectTo(`/dialogs/${dialog.id}`));
    return dialog;
  } catch (error) {
    if (isTokenExpireResponse(error)) {
      dispatch(submitRequest.failure());
      dispatch(logout());
    }
  }
};

// Selectors

const selectors = adapter.getSelectors(
  (state: RootState) => state.entities[sliceName]
);

const { selectIds, selectById, selectAll } = selectors;

export const selectDialogs = (state: RootState) => selectAll(state);
export const selectDialogsIds = (state: RootState) => selectIds(state);
export const selectDialogById = (id: EntityId) => (state: RootState) =>
  selectById(state, id);
export const selectDialogMemberId =
  (dialogId: EntityId) => (state: RootState) => {
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
