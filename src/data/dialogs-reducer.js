import { fetchDialogs } from '../api/APIUtils';

const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

export const addNewMessage = (dialogId, text) => ({
  type: ADD_NEW_MESSAGE,
  dialogId,
  text,
});

// Textarea state update
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

export const updateNewMessage = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  text,
});

// Dialog fetching part
const FETCH_DIALOGS_REQUEST = 'FETCH_DIALOGS_REQUEST';
const FETCH_DIALOGS_SUCCESS = 'FETCH_DIALOGS_SUCCESS';
const FETCH_DIALOGS_FAILURE = 'FETCH_DIALOGS_FAILURE';

const dialogsFetchRequest = () => ({
  type: FETCH_DIALOGS_REQUEST,
});

const dialogsFetchSuccess = (data) => ({
  type: FETCH_DIALOGS_SUCCESS,
  receivedAt: Date.now(),
  dialogs: data.dialogs,
});

const dialogsFetchFailed = (error) => ({
  type: FETCH_DIALOGS_FAILURE,
  error,
});

// Dialogs fetch thunk
export const getDialogs = (userId) => (dispatch) => {
  // Set isFetching flag to true
  dispatch(dialogsFetchRequest());

  // Fetch and set dialogs
  fetchDialogs(userId).then((data) => dispatch(dialogsFetchSuccess(data)));
};

// Message creating handler
function handleAddNewMessage(state, action) {
  function makeNewId(entryList) {
    return entryList[entryList.length - 1].id + 1;
  }

  const isCurrentDialog = (dialog) => dialog.id === action.dialogId;
  const indexInState = state.dialogs.findIndex(isCurrentDialog);

  const messages = state.dialogs[indexInState].messages;

  const message = {
    id: makeNewId(messages),
    text: action.text,
  };

  state.dialogs[indexInState].messages.push(message);
  state.textareaState.text = '';

  return state;
}

const initialState = {
  dialogs: null,
  selectedDialog: null,
  isLoaded: false,
  isFetching: false,
  error: null,
};

function dialogsPage(state = initialState, action) {
  const type = action ? action.type : undefined;

  switch (type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      state.textareaState.text = action.text;
      return state;
    case ADD_NEW_MESSAGE:
      return handleAddNewMessage(state, action);
    case FETCH_DIALOGS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_DIALOGS_SUCCESS:
      const dialogs = action.dialogs;
      return { ...state, isFetching: false, isLoaded: true, dialogs };
    case FETCH_DIALOGS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}

export default dialogsPage;
