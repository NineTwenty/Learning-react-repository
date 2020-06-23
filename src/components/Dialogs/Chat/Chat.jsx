import React from 'react';
import styles from './Chat.module.css';

const Chat = ({ children }) => {

  return (
    <div className={styles.chatWrapper}>
      {children}
    </div>
  );
};

export default Chat;
