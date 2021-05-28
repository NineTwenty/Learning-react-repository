import React from 'react';
import Button from 'components/common/Button';
import { TextAreaField } from 'components/common/TextAreaField';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { fetchDialogs, submitMessage } from 'redux/entities';
import styles from './ChatInputs.module.css';

const ChatInputs = (props) => {
  const dispatch = useDispatch();

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
      dialogId: props.dialogId,
    };

    // Submit message
    dispatch(submitMessage(message));
    dispatch(fetchDialogs());

    actions.setSubmitting(false);

    // Clear form
    actions.resetForm();
  };

  return (
    <div className={styles.chatInputsWrapper}>
      <Formik
        initialValues={{
          text: '',
        }}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(props) => (
          <Form>
            <TextAreaField
              name='text'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.text}
              cols='20'
              rows='3'
            />
            <Button type='submit'>Send</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChatInputs;
