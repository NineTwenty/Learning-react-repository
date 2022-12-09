import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { fetchDialogs, selectDialogs } from 'data/entities';
import { useAppDispatch, useAppSelector, useIdParam } from 'common/hooks/hooks';
import { Dialog } from 'common/entities.types';
import Spinner from 'common/components/Spinner';
import HamburgerButton from 'common/components/HamburgerButton';
import { selectCurrentUserId } from 'data';
import DialogItem from './DialogItem/DialogItem';
import DialogsList from './DialogsList/DialogsList';
import Chat from './Chat/Chat';
import styles from './Dialogs.module.css';

function Dialogs() {
  const currentDialogId = useIdParam();
  const userId = useAppSelector(selectCurrentUserId);
  const dialogs = useAppSelector(selectDialogs);
  const isDialogChosen = !!currentDialogId;
  const isDialogsLoaded = dialogs;

  const dispatch = useAppDispatch();

  // Periodically fetch dialogs
  useEffect(() => {
    void dispatch(fetchDialogs());
    const interval = setInterval(() => {
      void dispatch(fetchDialogs());
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
  const wrapperClasses = cx(styles.dialogsWrapper, {
    [styles.dialogChosen]: isDialogChosen,
  });

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
      <DialogsList isOpen={isDialogsListOpen}>
        {isDialogsLoaded ? populateDialogs(dialogs) : <Spinner />}
      </DialogsList>
      {/* TODO: Redo userId type to account protected routes and loggedIn state */}
      {userId && isDialogChosen && (
        <Chat
          className={cx(styles.dialogsChat, {
            [styles.dialogsChat_overlapped]: isDialogsListOpen,
          })}
          dialogId={currentDialogId}
          userId={userId}
        />
      )}
    </div>
  );
}

export default React.memo(Dialogs);
