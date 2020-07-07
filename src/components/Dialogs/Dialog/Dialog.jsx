import React from 'react';
import s from './Dialog.module.css';
import { Link } from 'react-router-dom';
import Avatar from '../../Profile/Avatar/Avatar';

export default ({ avatar, username, count, time, id }) => {
  return (
    <div className={s.dialogWrapper}>
      <Avatar className={s.dialogAvatar} avatar={avatar} name={username} />
      <div className={s.dialogPreview}>
        <h5 className={s.dialogName}>{username}</h5>
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
