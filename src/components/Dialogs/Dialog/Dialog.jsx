import React from 'react';
import { useSelector } from 'react-redux';
import s from './Dialog.module.css';
import { Link } from 'react-router-dom';
import Avatar from '../../Profile/Avatar/Avatar';
import { selectUserById } from 'redux/entities';

export default ({ id, time, count, memberId }) => {
  const user = useSelector(selectUserById(memberId));
  if (!user) {
    return (<div>Loading</div>)
  }
  const { avatar, firstName } = user;
  return (
    <div className={s.dialogWrapper}>
      <Avatar className={s.dialogAvatar} avatar={avatar} name={firstName} />
      <div className={s.dialogPreview}>
        <h5 className={s.dialogName}>{firstName}</h5>
        <p className={s.dialogMessage}></p>
      </div>
      <div className={s.dialogMeta}>
        <span className={s.dialogCount}>{count}</span>
        <span className={s.dialogPassed}>{time}</span>
      </div>
      <Link to={`/dialogs/${id}`} className={s.dialogLink} />
    </div>
  );
};
