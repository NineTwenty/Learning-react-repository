import React from 'react';
import styles from './LoginForm.module.css';
import {
  submitLoginForm,
} from '../../data/authentication-reducer';
import { Formik, Form } from 'formik';
import TextField from '../common/TextField';
import PasswordField from '../common/PasswordField';
import CheckboxField from '../common/Checkbox';
import SubmitField from '../common/SubmitField';
import { connect } from 'react-redux';

const validate = ({ login, password }) => {
  const error = {};

  if (!password) {
    error.password = 'Required';
  }

  if (!login) {
    error.login = 'Required';
  }

  return error;
};

const LoginForm = ({ submitLoginForm, finishLogin }) => {
  // Async submit with server-side errors handling
  const onSubmit = ({ login, password }, formUtils) => {
    // Handler function
    const handleErrors = (errors) => {
      if (errors) {
        finishWithErrors(errors);
      }

      // Finish with setting errors to form status
      function finishWithErrors(errors) {
        formUtils.setStatus({
          formErrors: [...errors],
        });
      }
    };

    return (
      submitLoginForm({ login, password })
        // Wait for any server errors from thunk
        // TEMPORARY: Workaround until 'unwrapResult' will be fixed 
        .then((action) => action.payload)
        // .then(unwrapResult)
        .then(handleErrors)
    );
  };

  // Render

  return (
    <div>
      <Formik
        initialValues={{
          login: '',
          password: '',
          rememberMe: false,
        }}
        onSubmit={onSubmit}
        validate={validate}
      >
        {() => (
          <Form className={styles.form}>
            <TextField
              name='login'
              label='Login'
              placeholder='Enter login or email'
            />

            <PasswordField
              name='password'
              label='Password'
              placeholder='Password'
            />

            <CheckboxField name='rememberMe' label='Remember Me' />

            <SubmitField />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { submitLoginForm })(LoginForm);
