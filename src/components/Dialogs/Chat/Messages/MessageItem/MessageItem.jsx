import React from 'react';
import styles from './MessageItem.module.css';
import Avatar from '../../../../Profile/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { selectUserById } from 'redux/entities';
import { Spinner } from 'components/common/Spinner';

const MessageItem = ({ text, id, authorId, isMine }) => {
  const wrapperClasses = `${styles.messageItemWrapper} ${
    isMine ? styles.messageItemWrapper_positionLeft : ''
  }`;

  const author = useSelector(selectUserById(authorId));

  if (author) {
    const { avatar, username } = author;
    return (
      <div className={wrapperClasses}>
        <Avatar
          className={styles.messageItemAvatar}
          size='small'
          avatar={avatar}
          name={username}
          key={id}
        />
        <span className={styles.messageItemText}>{text}</span>
      </div>
    );
  } else {
    return (
      <div className={styles.messageItemWrapper}>
        <Spinner />
      </div>
    );
  }
};

export default MessageItem;
