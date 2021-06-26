import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDialogs } from 'redux/entities';
import styles from './Dialogs.module.css';

import { DialogItem } from './DialogItem/DialogItem';
import Chat from './Chat/Chat';
import { Spinner } from 'components/common/Spinner';
import { HamburgerButton } from 'components/Header/HamburgerButton/HamburgerButton';
import { DialogsList } from './DialogsList/DIalogsList';

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

  // Render
  return (
    <div className={wrapperClasses}>
      {isDialogChosen && (
        <HamburgerButton
          className={styles.ControlButton}
          isOpen={isDialogsListOpen}
          onClick={toggleDialogsList}
          iconType='hamburger'
          styleType='borderless'
          aria-label='toggle dialogs list'
        />
      )}

      <DialogsList isOpen={isDialogsListOpen} className={styles.dialogsList}>
        {isDialogsLoaded ? populateDialogs(dialogs) : <Spinner />}
      </DialogsList>

      {isDialogChosen && (
        <Chat
          className={styles.dialogsChat}
          dialogId={currentDialogId}
          userId={userId}
        />
      )}
    </div>
  );
};

export default React.memo(Dialogs);
