import { KeyboardEvent, useRef } from 'react';
import Button from 'components/common/Button';
import { TextAreaField } from 'components/common/TextAreaField';
import { Form, Formik, FormikErrors, FormikHelpers, FormikProps } from 'formik';
import { useDispatch } from 'react-redux';
import { fetchDialogs, submitMessage } from 'data/entities';
import styles from './ChatInputs.module.css';

type Props = {
  dialogId: number | string;
};

type FormValues = {
  text: string;
};

function ChatInputs({ dialogId }: Props) {
  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<FormValues>>(null);

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};

    if (!values.text) {
      errors.text = 'Required';
    }

    return errors;
  };

  const onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
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

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.handleSubmit();
    }
  };

  const initialValues: FormValues = {
    text: '',
  };

  return (
    <div className={styles.Wrapper}>
      <Formik
        initialValues={initialValues}
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
