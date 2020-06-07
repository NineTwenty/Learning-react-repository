import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Chat from './Chat/Chat';
import { Route } from 'react-router-dom';

export default (props) => {
  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogs}>
        <h2>Dialogs</h2>
        {props.data.map((data) => (
          <Dialog key={data.id} {...data} />
        ))}
      </div>
      <Route
        path='/dialogs/:id'
        render={() => <Chat dialogs={props.data} addMessage={props.addMessage}/>}
      />
    </div>
  );
};
