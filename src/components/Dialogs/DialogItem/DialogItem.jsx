import React from 'react';
import { useSelector } from 'react-redux';
import styles from './DialogItem.module.css';
import { Link } from 'react-router-dom';
import Avatar from '../../Profile/Avatar/Avatar';
import { selectUserById } from 'redux/entities';
import { Spinner } from 'components/common/Spinner';

export const DialogItem = ({ id, time, count, memberId, isChosen }) => {
  const user = useSelector(selectUserById(memberId));

  if (!user) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const { avatar, firstName } = user;

  const chosenClasses = `${styles.DialogItem} ${styles.DialogItem_chosen}`;
  const wrapperClasses = isChosen ? chosenClasses : styles.DialogItem;

  return (
    <div className={wrapperClasses}>
      <Avatar
        className={styles['DialogItem-Avatar']}
        avatar={avatar}
        name={firstName}
      />
      <div className={styles['DialogItem-Preview']}>
        <h5 className={styles['DialogItem-Name']}>{firstName}</h5>
        <p className={styles['DialogItem-Message']}></p>
      </div>
      <div className={styles['DialogItem-Meta']}>
        <span className={styles['DialogItem-Count']}>{count}</span>
        <span className={styles['DialogItem-Passed']}>{time}</span>
      </div>
      <Link to={`/dialogs/${id}`} className={styles['DialogItem-Link']} />
    </div>
  );
};
