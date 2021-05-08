import React from 'react';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ children }) => {
  return <div className={styles.chatHeaderWrapper}>{children}</div>;
};

export default ChatHeader;
