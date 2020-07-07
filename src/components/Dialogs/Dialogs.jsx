import React from 'react';
import s from './Dialogs.module.css';
import { useParams } from 'react-router-dom';

import Dialog from './Dialog/Dialog';

import Chat from './Chat/Chat';
import ChatHeader from './Chat/ChatHeader/ChatHeader';
import Messages from './Chat/Messages/Messages';
import MessageItem from './Chat/Messages/MessageItem/MessageItem';
import ChatInputs from './Chat/ChatInputs/ChatInputs';

const Dialogs = ({ dialogs, userId, isFetching }) => {
  const { idParam } = useParams();

  const populateDialogs = (dialogs) => {
    if (dialogs) {
      return dialogs.map((dialog) => <Dialog key={dialog.id} {...dialog} />);
    }
  };

  const populateMessages = (messages) => {
    return messages.map(({ text, id }) => <MessageItem />);
  };

  // const selectedDialog = dialogs.filter((user) => user.id === +id)[0];

  // <Messages>{id ? populateMessages() : ''}</Messages>
  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogs}>
        <h2>Dialogs</h2>
        {isFetching ? 'Loading' : populateDialogs(dialogs)}
      </div>

      <Chat>
        <ChatHeader />
        {idParam ? `${idParam}` : 'null'}
        <ChatInputs />
      </Chat>
    </div>
  );
};

export default Dialogs;
