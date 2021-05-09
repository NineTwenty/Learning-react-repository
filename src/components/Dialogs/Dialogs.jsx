import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDialogs, selectDialogById } from 'redux/entities';
import styles from './Dialogs.module.css';

import { DialogItem } from './DialogItem/DialogItem';
import Chat from './Chat/Chat';
import ChatHeader from './Chat/ChatHeader/ChatHeader';
import Messages from './Chat/Messages/Messages';
import ChatInputs from './Chat/ChatInputs/ChatInputs';
import { Spinner } from 'components/common/Spinner';
import Button from 'components/common/Button';

// Dialogs sidenav control component to use in childrens
const DialogsHamburgerButton = ({ isOpen, toggleState, label }) => {
  return (
    <Button
      onClick={toggleState}
      type='button'
      aria-label={label}
      aria-expanded={isOpen}
    >
      <span className={styles.toggleIcon}>{isOpen ? '🢀' : '🢂'}</span>
    </Button>
  );
};

const Dialogs = ({ dialogs, userId }) => {
  const { id: currentDialogId } = useParams();
  const isDialogChosen = !!currentDialogId;
  const isDialogsLoaded = dialogs && dialogs.length;

  const currentDialog = useSelector(selectDialogById(currentDialogId));
  const messagesIds = currentDialog && currentDialog.messages;

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
        return (
          <li key={dialog.id}>
            <DialogItem {...dialog} memberId={memberId} />
          </li>
        );
      });
    }
  };

  // Show Chat if dialog is chosen
  const wrapperClasses = `${styles.dialogsWrapper} ${
    isDialogChosen ? styles.dialogChosen : ''
  }`;

  // Setup state for dialogs list control
  const [isDialogsListOpen, setIsDialogsListOpen] = useState(true);
  const dialogsClasses = `${styles.dialogsList} ${
    isDialogsListOpen ? '' : styles.dialogsList_hidden
  }`;

  // Toggle visibility of dialogs list
  const toggleDialogsList = () => {
    if (isDialogChosen) {
      setIsDialogsListOpen(!isDialogsListOpen);
    }
  };

  // Render
  return (
    <div className={wrapperClasses}>
      <div role='navigation' className={dialogsClasses}>
        <header className={styles.dialogsHeader}>
          <h2>Dialogs</h2>
          {
            // Show toggle here only if list is open & dialog is chosen
            isDialogChosen && isDialogsListOpen && (
              <DialogsHamburgerButton
                isOpen={isDialogsListOpen}
                toggleState={toggleDialogsList}
                label='toggle dialogs list'
              />
            )
          }
        </header>
        <ul className={styles.dialogsListOverflowContainer}>
          {isDialogsLoaded ? populateDialogs(dialogs) : <Spinner />}
        </ul>
      </div>

      {isDialogChosen && (
        <Chat className={styles.dialogsChat}>
          <ChatHeader>
            {
              // Show toggle here only if list is closed
              // so the button in the dialogs list is not visible
              !isDialogsListOpen && (
                <DialogsHamburgerButton
                  isOpen={isDialogsListOpen}
                  toggleState={toggleDialogsList}
                  label='toggle dialogs list'
                />
              )
            }
          </ChatHeader>
          <Messages
            dialogId={currentDialogId}
            messagesIds={messagesIds}
            userId={userId}
          />
          <ChatInputs />
        </Chat>
      )}
    </div>
  );
};

export default React.memo(Dialogs);
