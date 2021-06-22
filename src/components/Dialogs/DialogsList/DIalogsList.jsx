import React from 'react';
import styles from './DialogsList.module.scss';

export const DialogsList = ({ isOpen, children, className }) => {
  const dialogsClasses = `${styles.dialogsList} ${
    isOpen ? '' : styles.dialogsList_hidden
  } ${className}`;

  return (
    <div role='navigation' className={dialogsClasses}>
      <header className={styles.dialogsHeader}>
        <h2>Dialogs</h2>
      </header>
      <ul className={styles.dialogsListOverflowContainer}>{children}</ul>
    </div>
  );
};
