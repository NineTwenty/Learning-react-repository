import React from 'react';
import styles from './ChatImputs.module.css';
import { useParams } from 'react-router-dom';

const ChatImputs = (props) => {
  const textareaRef = React.createRef();
  const { id } = useParams();

  const addMessage = () => {
    const text = textareaRef.current.value;
    console.dir(props.addMessage)
    props.addMessage(text, +id);
  };

  return (
    <div className={styles.chatImputsWrapper}>
      <textarea ref={textareaRef} name='Message' id='' cols='20' rows='3'>
        {props.textareaMessage}
      </textarea>
      <button onClick={addMessage}>Send</button>
    </div>
  );
};

export default ChatImputs;
