import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Chat from './Chat/Chat';
import { Route } from 'react-router-dom';

const Dialogs = ({ dialogsPage: { dialogs, textareaState }, dispatch }) => {
  const populateDialogs = (dialogs) => {
    return dialogs.map((data) => <Dialog key={data.id} {...data} />);
  };

  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogs}>
        <h2>Dialogs</h2>
        {populateDialogs(dialogs)}
      </div>
      <Route
        path='/dialogs/:id'
        render={() => (
          <Chat
            dialogs={dialogs}
            textareaState={textareaState}
            dispatch={dispatch}
          />
        )}
      />
    </div>
  );
};

export default Dialogs;
