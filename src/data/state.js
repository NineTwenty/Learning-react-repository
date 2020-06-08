import explicitRender from './../render';

let state = {
  dialogsData: {
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
  },
};

const findDialog = (callback) => {
  const indexInState = state.dialogsData.dialogs.findIndex(callback);

  return state.dialogsData.dialogs[indexInState];
};

const makeNewId = (entryList) => entryList[entryList.length - 1].id + 1;

const buildNewMessage = (text, id) => {
  return {
    id,
    text,
  };
};

export const addMessage = (text, dialogId) => {
  const isCurrentDialog = (dialog) => dialog.id === dialogId;

  const currentDialog = findDialog(isCurrentDialog);

  const message = buildNewMessage(text, makeNewId(currentDialog.messages));

  currentDialog.messages.push(message);

  explicitRender(state, { addMessage, updateTextareaContent });
};

export function updateTextareaContent(text) {
  state.dialogsData.textareaState.text = text;
  explicitRender(state, { addMessage, updateTextareaContent });
}

export default state;
