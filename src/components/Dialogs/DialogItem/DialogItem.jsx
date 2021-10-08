import React from 'react';
import { useSelector } from 'react-redux';
import styles from './DialogItem.module.scss';
import { Link } from 'react-router-dom';
import Avatar from '../../common/Avatar/Avatar';
import { selectDialogMemberId, selectUserById } from 'redux/entities';
import { Spinner } from 'components/common/Spinner';

export const DialogItem = ({ id, time, count, isChosen }) => {
  const memberId = useSelector(selectDialogMemberId(id));
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
      <Avatar size='medium' avatar={avatar} name={firstName} />
      <div className={styles.Preview}>
        <h5 className={styles.Name}>{firstName}</h5>
        <p className={styles.Message}></p>
      </div>
      {/* <div className={styles.Meta}>
        <span className={styles.Count}>{count}</span>
        <span className={styles.Passed}>{time}</span>
      </div> */}
      <Link to={`/dialogs/${id}`} className={styles.Link} />
    </div>
  );
};
