import React from 'react';
import s from './Dialog.module.css';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div className={s.dialogWrapper}>
      <img className={s.dialogAvatar} src={props.avatar} alt='' />
      <div className={s.dialogInfo}>
        <div className={s.dialogPreview}>
          <h5 className={s.dialogName}>{props.name}</h5>
          <p className={s.dialogMessage}>{props.messages}</p>
        </div>
        <div className={s.dialogMeta}>
          <span className={s.dialogCount}>{props.count}</span>
          <span className={s.dialogPassed}>{props.time}</span>
        </div>
      </div>
      <Link to={`/dialogs/${props.id}`} className={s.dialogLink} />
    </div>
  );
};
