import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { api } from 'api/API';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from 'redux/utils';

const sliceName = 'messages';

// Adapter
const adapter = createEntityAdapter();

const initialState = adapter.getInitialState({ status: 'idle' });

// Setup loading parts
// Loading reducers
const { handleRequestStart, handleRequestEnd } = createLoadingReducers();
// Loading matchers
const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);
// Loading actions
const getRequest = createLoadingActions(sliceName, 'get');
const submitRequest = createLoadingActions(sliceName, 'submit');

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

export const fetchMessages = (page, dialogId) => async (dispatch) => {
  dispatch(getRequest.request());
  try {
    const { messages } = await api.get(
      `messages?page=${page}&limit=10&dialogId=${dialogId}`
    );
    dispatch(getRequest.success(messages));
  } catch (error) {
    dispatch(getRequest.failure(error));
  }
};

export const submitMessage = (newMessage) => async (dispatch) => {
  dispatch(submitRequest.request());
  try {
    const { message } = await api.post('messages', newMessage);
    dispatch(submitRequest.success(message));
  } catch (error) {
    dispatch(submitRequest.failure());
  }
};

// Selectors

const selectSlice = (state) => state.entities[sliceName];

const selectors = adapter.getSelectors(selectSlice);

const { selectIds, selectById, selectAll } = selectors;

export const selectMessages = (state) => selectAll(state);
export const selectMessagesIds = (state) => selectIds(state);
export const selectMessageById = (id) => (state) => selectById(state, id);
export const selectLoadedMessagesByIds = createSelector(
  [
    selectSlice,
    (_, props) => {
      return props;
    },
  ],
  ({ entities }, ids) => {
    if (ids) {
      // Make array of loaded messages
      return ids.reduce((acc, id) => {
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
