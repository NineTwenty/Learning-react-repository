const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

const legacyState = {
  dialogs: [
    {
      avatar: 'https://loremflickr.com/48/48?r=1',
      name: 'Charles',
      messages: [
        {
          id: 1,
          text: `I'm stupid`,
        },
      ],
      count: 16,
      time: '1min',
      id: 1,
    },
    {
      avatar: 'https://loremflickr.com/48/48?r=2',
      name: 'Lando',
      messages: [
        {
          id: 1,
          text: `Its BWOKEN`,
        },
      ],
      count: 4,
      time: '2min',
      id: 2,
    },
    {
      avatar: 'https://loremflickr.com/48/48?r=3',
      name: 'Max',
      messages: [
        {
          id: 1,
          text: `What a f*****g idiot`,
        },
      ],
      count: 0,
      time: '',
      id: 3,
    },
    {
      avatar: 'https://loremflickr.com/48/48?r=4',
      name: 'Charles',
      messages: [
        {
          id: 1,
          text: `I'm stupid`,
        },
      ],
      count: 0,
      time: '',
      id: 4,
    },
  ],
  textareaState: {
    text: 'dsfd',
  },
}

const initialState = legacyState;

export const addMessageCreator = (dialogId, text) => ({
  type: ADD_NEW_MESSAGE,
  dialogId,
  text,
});

export const updateNewMessageTextCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  text,
});

function addNewMessage(state, action) {
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

  state.dialogs[indexInState].messages.push(message)
  state.textareaState.text = ''

  return state;
}

function dialogsPage(state = initialState, action) {
  const type = action ? action.type : undefined;

  switch (type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      state.textareaState.text = action.text;
      return state;
    case ADD_NEW_MESSAGE:
      return addNewMessage(state, action);
    default:
      return state;
  }
}

export default dialogsPage;
