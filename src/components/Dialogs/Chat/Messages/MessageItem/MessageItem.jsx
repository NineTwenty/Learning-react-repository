import React from 'react';
import styles from './MessageItem.module.css';
import Avatar from '../../../../Profile/Avatar/Avatar';

const MessageItem = ({ avatar, username, text}) => {
  return (
    <div className={styles.messageItemWrapper}>
      <Avatar
        className={styles.messageItemAvatar}
        avatar={avatar}
        name={username}
      />
      <span className={styles.messageItemText}>{text}</span>
    </div>
  );
};

export default MessageItem;
