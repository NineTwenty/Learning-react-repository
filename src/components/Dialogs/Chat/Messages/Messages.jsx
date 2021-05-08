import React from 'react';
import styles from './Messages.module.css';

const Messages = ({ children }) => {
  return <div className={styles.messagesWrapper}>{children}</div>;
};

export default Messages;
