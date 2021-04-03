import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDialogs } from 'redux/entities/dialogsSlice';
import styles from './Dialogs.module.css';

import Dialog from './Dialog/Dialog';
import Chat from './Chat/Chat';
import ChatHeader from './Chat/ChatHeader/ChatHeader';
import Messages from './Chat/Messages/Messages';
import MessageItem from './Chat/Messages/MessageItem/MessageItem';
import ChatInputs from './Chat/ChatInputs/ChatInputs';

const Dialogs = ({ dialogs, userId }) => {
  const { id: idParam } = useParams();
  const isDialogChosen = !!idParam;
  const isDialogsLoaded = dialogs && dialogs.length;

  const dispatch = useDispatch();

  // Periodically fetch dialogs
  useEffect(() => {
    dispatch(fetchDialogs());
    const interval = setInterval(() => {
      dispatch(fetchDialogs());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);


  const populateDialogs = (dialogs) => {
    // Func to find correct members for every dialog
    const determinateMember = (dialog) =>
      dialog.members.find((member) => member !== userId);

    if (isDialogsLoaded) {
      // Return filled Dialogs then
      return dialogs.map((dialog) => {
        const memberId = determinateMember(dialog);
        return <Dialog key={dialog.id} {...dialog} memberId={memberId} />;
      });
    }
  };

  const populateMessages = (messages) => {
    return messages.map(({ text, id }) => <MessageItem />);
  };

  // Show Chat if dialog is chosen
  const wrapperClasses = `${styles.dialogsWrapper} ${
    isDialogChosen ? styles.dialogChosen : ''
  }`;

  return (
    <div className={wrapperClasses}>
      <div className={styles.dialogs}>
        <h2>Dialogs</h2>
        {isDialogsLoaded ? populateDialogs(dialogs) : 'Loading'}
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

export default React.memo(Dialogs);
