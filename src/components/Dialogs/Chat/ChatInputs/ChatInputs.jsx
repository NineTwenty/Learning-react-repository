import React from 'react';
import styles from './ChatImputs.module.css';
import { useParams } from 'react-router-dom';
import {
  addMessageCreator,
  updateNewMessageTextCreator,
} from '../../../../data/dialogs-reducer';

const ChatImputs = (props) => {
  // { dispatch, textareaState: {text} }
  // const { id } = useParams();


  // function updateTextareaContent(event) {
  //   const text = event.target.value;
  //   const action = updateNewMessageTextCreator(text);
  //   dispatch(action);
  // }

  // function addMessage() {
  //   const action = addMessageCreator(+id, text);
  //   dispatch(action);
  // }

  return (
    <div className={styles.chatImputsWrapper}>
      <textarea
        // onChange={updateTextareaContent}
        name='Message'
        id=''
        cols='20'
        rows='3'
        // value={text}
      />
      {/* <button onClick={addMessage}>Send</button> */}
    </div>
  );
};

export default ChatImputs;
