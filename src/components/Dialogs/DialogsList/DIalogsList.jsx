import React from 'react';
import styles from './DialogsList.module.scss';

export const DialogsList = ({ isOpen, children, className }) => {
  const dialogsClasses = `${styles.Wrapper} ${
    isOpen ? '' : styles.Wrapper_hidden
  } ${className}`;

  return (
    <div role='navigation' className={dialogsClasses}>
      <header className={styles.Header}>
        <h2>Dialogs</h2>
      </header>
      <ul className={styles.List}>{children}</ul>
    </div>
  );
};
