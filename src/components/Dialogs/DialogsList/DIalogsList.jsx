import { useState } from 'react';
import Button from 'components/common/Button';
import styles from './DialogsList.module.scss';
import { NewChatDialog } from '../NewChatDialog/NewChatDialog';

export function DialogsList({ isOpen, children, className = '' }) {
  const [NewChatDialogIsOpen, setNewChatDialogIsOpen] = useState();

  const dialogsClasses = `${styles.Wrapper} ${
    isOpen ? '' : styles.Wrapper_hidden
  } ${className}`;

  return (
    <div role='navigation' className={dialogsClasses}>
      <header className={styles.Header}>
        <h2>Dialogs</h2>
      </header>
      <ul className={styles.List}>{children}</ul>
      <Button
        className={styles.AddButton}
        onClick={() => {
          setNewChatDialogIsOpen(true);
        }}
      >
        NEW
      </Button>
      {NewChatDialogIsOpen && (
        <NewChatDialog
          onClose={() => {
            setNewChatDialogIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
