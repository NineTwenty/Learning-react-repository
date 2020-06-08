import React from 'react';
import styles from './ChatImputs.module.css';
import { useParams } from 'react-router-dom';

const ChatImputs = (props) => {
  const textareaRef = React.createRef();
  const { id } = useParams();

  function updateTextareaContent() {
    const value = textareaRef.current.value;
    props.updateTextareaContent(value)
  }

  function addMessage() {
    const text = textareaRef.current.value;
    props.addMessage(text, +id);
    textareaRef.current.value = ''
  };


  return (
    <div className={styles.chatImputsWrapper}>
      <textarea onChange={updateTextareaContent} ref={textareaRef} name='Message' id='' cols='20' rows='3' value={props.textareaState.text} />
      <button onClick={addMessage}>Send</button>
    </div>
  );
};

export default ChatImputs;
