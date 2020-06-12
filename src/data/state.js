let store = {
  state: {
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
  },

  findDialog(callback) {
    const indexInState = this.state.dialogsData.dialogs.findIndex(callback);

    return this.state.dialogsData.dialogs[indexInState];
  },

  makeNewId(entryList) {
    return entryList[entryList.length - 1].id + 1;
  },

  buildNewMessage(text, id) {
    return {
      id,
      text,
    };
  },

  addMessage(text, dialogId) {
    const isCurrentDialog = (dialog) => dialog.id === dialogId;

    const currentDialog = this.findDialog(isCurrentDialog);

    const message = this.buildNewMessage(
      text,
      this.makeNewId(currentDialog.messages)
    );

    currentDialog.messages.push(message);

    // Rerender entire view
    this.explicitRender(this.state, this.actions);
  },

  updateTextareaContent(text) {
    this.state.dialogsData.textareaState.text = text;
    this.explicitRender(this.state, this.actions());
  },

  // Bind methods to pass it as props
  actions() {
    return {
      addMessage: this.addMessage.bind(this),
      updateTextareaContent: this.updateTextareaContent.bind(this),
    };
  },

  subscribe(observer) {
    this.explicitRender = observer;
  },
};

export default store;
