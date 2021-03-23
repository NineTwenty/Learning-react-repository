import React from 'react';
import styles from './Dialogs.module.css';
import { useParams } from 'react-router-dom';

import Dialog from './Dialog/Dialog';
import Chat from './Chat/Chat';
import ChatHeader from './Chat/ChatHeader/ChatHeader';
import Messages from './Chat/Messages/Messages';
import MessageItem from './Chat/Messages/MessageItem/MessageItem';
import ChatInputs from './Chat/ChatInputs/ChatInputs';

const Dialogs = ({
  dialogs,
  members,
  userId,
  isFetching,
  membersIsFetching,
}) => {
  const { id: idParam } = useParams();
  const isDialogChosen = !!idParam;

  const populateDialogs = (dialogs) => {
    // Func to find correct members for every dialog
    const determinateMember = (dialog) =>
      dialog.members.find((member) => member !== userId);
    // Check if dialogs and members is not null
    if (dialogs && members) {
      // And return filled Dialogs then
      return dialogs.map((dialog) => {
        const memberId = determinateMember(dialog);
        return <Dialog key={dialog.id} {...dialog} memberId={memberId} />;
      });
    }
  };

  const populateMessages = (messages) => {
    return messages.map(({ text, id }) => <MessageItem />);
  };

  // const selectedDialog = dialogs.filter((user) => user.id === +id)[0];

  // <Messages>{id ? populateMessages() : ''}</Messages>

  // Show Chat if dialog is chosen
  const wrapperClasses = `${styles.dialogsWrapper} ${
    isDialogChosen ? styles.dialogChosen : ''
  }`;

  return (
    <div className={wrapperClasses}>
      <div className={styles.dialogs}>
        <h2>Dialogs</h2>
        {isFetching || membersIsFetching ? 'Loading' : populateDialogs(dialogs)}
      </div>

      <div className={styles.dialogsChat}>
        <Chat>
          <ChatHeader />
          {idParam ? `${idParam}` : 'null'}
          <ChatInputs />
        </Chat>
      </div>
    </div>
  );
};

export default Dialogs;
