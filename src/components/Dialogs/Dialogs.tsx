import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDialogs, selectDialogs } from 'data/entities';
import { useAppSelector } from 'hooks/hooks';
import { Dialog } from 'common/entities.types';
import { Spinner } from 'components/common/Spinner';
import { HamburgerButton } from 'components/Header/HamburgerButton/HamburgerButton';
import { selectCurrentUserId } from 'data';
import { DialogItem } from './DialogItem/DialogItem';
import { DialogsList } from './DialogsList/DIalogsList';
import Chat from './Chat/Chat';
import styles from './Dialogs.module.css';

const Dialogs = () => {
  const { id: currentDialogId } = useParams<{ id: string }>();
  const userId = useAppSelector(selectCurrentUserId);
  const dialogs = useAppSelector(selectDialogs);
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

  const populateDialogs = (dialogsEntities: Dialog[]) => {
    if (isDialogsLoaded) {
      // Return filled Dialogs then
      return dialogsEntities.map((dialog) => {
        const isChosen = currentDialogId === dialog.id;
        return (
          <li key={dialog.id}>
            <DialogItem id={dialog.id} isChosen={isChosen} />
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
  const [isDialogsListOpen, setIsDialogsListOpen] = useState(!isDialogChosen);

  // Toggle visibility of dialogs list
  const toggleDialogsList = () => {
    if (isDialogChosen) {
      setIsDialogsListOpen(!isDialogsListOpen);
    }
  };

  // Autoclose list after dialog change
  // Autoopen after dialog unselecting
  // (As example by clicking link to Dialogs page, while already here)
  useEffect(() => {
    setIsDialogsListOpen(!currentDialogId);
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
