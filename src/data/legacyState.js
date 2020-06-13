// import dialogsPage from "./dialogs-reducer";


// let store = {
//   _state: {
//     dialogsPage: {
//       dialogs: [
//         {
//           avatar: 'https://loremflickr.com/48/48?r=1',
//           name: 'Charles',
//           messages: [
//             {
//               id: 1,
//               text: `I'm stupid`,
//             },
//           ],
//           count: 16,
//           time: '1min',
//           id: 1,
//         },
//         {
//           avatar: 'https://loremflickr.com/48/48?r=2',
//           name: 'Lando',
//           messages: [
//             {
//               id: 1,
//               text: `Its BWOKEN`,
//             },
//           ],
//           count: 4,
//           time: '2min',
//           id: 2,
//         },
//         {
//           avatar: 'https://loremflickr.com/48/48?r=3',
//           name: 'Max',
//           messages: [
//             {
//               id: 1,
//               text: `What a f*****g idiot`,
//             },
//           ],
//           count: 0,
//           time: '',
//           id: 3,
//         },
//         {
//           avatar: 'https://loremflickr.com/48/48?r=4',
//           name: 'Charles',
//           messages: [
//             {
//               id: 1,
//               text: `I'm stupid`,
//             },
//           ],
//           count: 0,
//           time: '',
//           id: 4,
//         },
//       ],
//       textareaState: {
//         text: 'dsfd',
//       },
//     },
//   },

//   _callSubscribers() {
//     this.explicitRender();
//   },

//   findDialog(callback) {
//     const indexInState = this.state.dialogsData.dialogs.findIndex(callback);

//     return this.state.dialogsData.dialogs[indexInState];
//   },

//   makeNewId(entryList) {
//     return entryList[entryList.length - 1].id + 1;
//   },

//   buildNewMessage(text, id) {
//     return {
//       id,
//       text,
//     };
//   },

//   subscribe(observer) {
//     this.explicitRender = observer;
//   },

//   getState() {
//     return this._state;
//   },

//   dispatch(action) {
//     this.getState().dialogsData = dialogsPage(this.getState().dialogsData, action);

//     this._callSubscribers();
//   },
// };

// export default store;
