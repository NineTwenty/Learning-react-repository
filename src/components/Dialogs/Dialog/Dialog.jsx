import React from 'react';
import s from './Dialog.module.css';
import { Link } from 'react-router-dom';
import Avatar from '../../Profile/Avatar/Avatar';

export default (props) => {
  const lastMessage = props.messages[props.messages.length - 1];

  return (
    <div className={s.dialogWrapper}>
      <Avatar
        className={s.dialogAvatar}
        avatar={props.avatar}
        name={props.name}
      />
      <div className={s.dialogPreview}>
        <h5 className={s.dialogName}>{props.name}</h5>
        <p className={s.dialogMessage}>{lastMessage.text}</p>
      </div>
      <div className={s.dialogMeta}>
        <span className={s.dialogCount}>{props.count}</span>
        <span className={s.dialogPassed}>{props.time}</span>
      </div>
      <Link to={`/dialogs/${props.id}`} className={s.dialogLink} />
    </div>
  );
};
