import React from 'react';
import styles from './MessageItem.module.css';
import Avatar from '../../../../Profile/Avatar/Avatar';

const MessageItem = (props) => {
  console.log(styles.messageItemAvatar);
  return (
    <div className={styles.messageItemWrapper}>
      <Avatar
        className={styles.messageItemAvatar}
        avatar={props.avatar}
        name={props.user}
      />
      <span className={styles.messageItemText}>{props.text}</span>
    </div>
  );
};

export default MessageItem;
