import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Chat from './Chat/Chat';

export default (props) => {
  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogs}>
        <h2>Dialogs</h2>
        {props.data.map((data) => (
          <Dialog key={data.id} {...data} />
        ))}
      </div>
      <Chat />
    </div>
  );
};
