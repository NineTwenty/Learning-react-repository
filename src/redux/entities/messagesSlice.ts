import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityId,
} from '@reduxjs/toolkit';
import { api } from 'api/API';
import { isTokenExpireResponse } from 'api/APIUtils';
import { Message } from 'common/entities.types';
import { logout } from 'redux/common/actions';
import { AppDispatch, RootState } from 'redux/store';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from 'redux/utils';
import { StatusState } from 'redux/utils/utils.types';

const sliceName = 'messages';

// Adapter
const adapter = createEntityAdapter<Message>();

// Initital state
const initialState = adapter.getInitialState<StatusState>({ status: 'idle' });

// State type
type MessagesState = typeof initialState;

// Setup loading parts
// Loading reducers
const { handleRequestStart, handleRequestEnd } =
  createLoadingReducers<MessagesState>();

// Loading matchers
const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);

// Loading actions
const getRequest = createLoadingActions<Message[]>(sliceName, 'get');
const submitRequest = createLoadingActions<Message>(sliceName, 'submit');

// Slice

const messagesSlice = createSlice({
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
    removeAll: adapter.removeAll,
  },
  extraReducers: (builder) => {
    // Add messages on successful get request
    builder.addCase(getRequest.success.type, adapter.addMany);
    // Add message on successful post request
    builder.addCase(submitRequest.success.type, adapter.addOne);
    builder.addMatcher(isStartOfRequest, handleRequestStart);
    builder.addMatcher(isEndOfRequest, handleRequestEnd);
  },
});

// Registration data
export const messagesReducer = messagesSlice.reducer;
export const messagesSliceName = messagesSlice.name;

// Actions

export const addMessages = messagesSlice.actions.addMany;
export const clearMessages = () => messagesSlice.actions.removeAll();

// Thunks

export const fetchMessages =
  (page: number, dialogId: EntityId) => async (dispatch: AppDispatch) => {
    dispatch(getRequest.request());
    try {
      const { messages } = await api.get(
        `messages?page=${page}&limit=10&dialogId=${dialogId}`
      );
      dispatch(getRequest.success(messages));
    } catch (error) {
      if (isTokenExpireResponse(error)) {
        dispatch(getRequest.failure());
        dispatch(logout());
      }
    }
  };

export const submitMessage =
  (newMessage: Partial<Message>) => async (dispatch: AppDispatch) => {
    dispatch(submitRequest.request());
    try {
      const { message } = await api.post('messages', newMessage);
      dispatch(submitRequest.success(message));
    } catch (error) {
      if (isTokenExpireResponse(error)) {
        dispatch(submitRequest.failure());
        dispatch(logout());
      }
    }
  };

// Selectors

const selectSlice = (state: RootState) => state.entities[sliceName];

const { selectIds, selectById, selectAll, selectEntities } =
  adapter.getSelectors(selectSlice);

export const selectMessages = (state: RootState) => selectAll(state);
export const selectMessagesIds = (state: RootState) => selectIds(state);
export const selectMessageById = (id: EntityId) => (state: RootState) =>
  selectById(state, id);
export const selectLoadedMessagesByIds = createSelector(
  [
    selectEntities,
    (_: unknown, props: EntityId[]) => {
      return props;
    },
  ],
  (entities, ids) => {
    if (ids) {
      // Make array of loaded messages
      return ids.reduce((acc: Message[], id) => {
        const message = entities[id];

        // Filter out not loaded messages
        if (message) {
          acc.push(message);
        }

        return acc;
      }, []);
    }
  }
);
