import React from 'react';
import styles from './Chat.module.css';

const Chat = ({ children, className }) => {
  const classes = className
    ? `${className} ${styles.chatWrapper}`
    : styles.chatWrapper;

  return <div className={classes}>{children}</div>;
};

export default Chat;
