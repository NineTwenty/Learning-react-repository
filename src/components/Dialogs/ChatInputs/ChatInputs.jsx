import { useRef } from 'react';
import Button from 'components/common/Button';
import { TextAreaField } from 'components/common/TextAreaField';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { fetchDialogs, submitMessage } from 'data/entities';
import styles from './ChatInputs.module.css';

function ChatInputs({ dialogId }) {
  const dispatch = useDispatch();
  const formRef = useRef();

  const validate = (values) => {
    const errors = {};

    if (!values.text) {
      errors.text = 'Required';
    }

    return errors;
  };

  const onSubmit = (values, actions) => {
    const { text } = values;

    // Create message
    const message = {
      created: Date.now(),
      text,
      unread: true,
      dialogId,
    };

    // Submit message
    dispatch(submitMessage(message));
    dispatch(fetchDialogs());

    actions.setSubmitting(false);

    // Clear form
    actions.resetForm();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current.handleSubmit();
    }
  };

  return (
    <div className={styles.Wrapper}>
      <Formik
        initialValues={{
          text: '',
        }}
        onSubmit={onSubmit}
        validate={validate}
        innerRef={formRef}
      >
        <Form className={styles.Form}>
          <TextAreaField
            className={styles.TextArea}
            name='text'
            onKeyPress={handleKeyPress}
            cols='20'
            rows='3'
          />
          <Button type='submit'>
            <span className={styles.SubmitButtonText}>SEND</span>
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default ChatInputs;
