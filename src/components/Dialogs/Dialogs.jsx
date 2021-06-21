import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDialogs } from 'redux/entities';
import styles from './Dialogs.module.css';

import { DialogItem } from './DialogItem/DialogItem';
import Chat from './Chat/Chat';
import { Spinner } from 'components/common/Spinner';
import { HamburgerButton } from 'components/Header/HamburgerButton/HamburgerButton';

const Dialogs = ({ dialogs, userId }) => {
  const { id: currentDialogId } = useParams();
  const isDialogChosen = !!currentDialogId;
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
    if (isDialogsLoaded) {
      // Return filled Dialogs then
      return dialogs.map((dialog) => {
        const isChosen = currentDialogId === dialog.id;
        return (
          <li key={dialog.id}>
            <DialogItem {...dialog} isChosen={isChosen} />
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
  const [isDialogsListOpen, setIsDialogsListOpen] = useState(
    isDialogChosen ? false : true
  );
  const dialogsClasses = `${styles.dialogsList} ${
    isDialogsListOpen ? '' : styles.dialogsList_hidden
  }`;

  // Toggle visibility of dialogs list
  const toggleDialogsList = () => {
    if (isDialogChosen) {
      setIsDialogsListOpen(!isDialogsListOpen);
    }
  };

  // Autoclose list after dialog change
  useEffect(() => {
    if (currentDialogId) setIsDialogsListOpen(false);
  }, [currentDialogId]);

  const DialogsControlBtn = () => {
    return (
      <HamburgerButton
        isOpen={isDialogsListOpen}
        onClick={toggleDialogsList}
        iconType='arrows'
        aria-label='toggle dialogs list'
      />
    );
  };

  // Render
  return (
    <div className={wrapperClasses}>
      <div role='navigation' className={dialogsClasses}>
        <header className={styles.dialogsHeader}>
          <h2>Dialogs</h2>
          {
            // Show button here only if list is open & dialog is chosen
            isDialogChosen && isDialogsListOpen && <DialogsControlBtn />
          }
        </header>
        <ul className={styles.dialogsListOverflowContainer}>
          {isDialogsLoaded ? populateDialogs(dialogs) : <Spinner />}
        </ul>
      </div>

      {isDialogChosen && (
        <Chat
          className={styles.dialogsChat}
          dialogId={currentDialogId}
          userId={userId}
          isDialogsListOpen={isDialogsListOpen}
          dialogsControlBtn={DialogsControlBtn}
        />
      )}
    </div>
  );
};

export default React.memo(Dialogs);
