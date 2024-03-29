import { Formik, Form, FormikErrors } from 'formik';
import type { FormikProps } from 'formik';
import { useAppDispatch } from 'utils/hooks/hooks';
import { submitLoginForm } from 'data';
import TextField from 'components/TextField';
import PasswordField from 'components/PasswordField';
import CheckboxField from 'components/Checkbox';
import SubmitField from 'components/SubmitField';
import Spinner from 'components/Spinner';
import styles from './LoginForm.module.css';

interface LoginFormValues {
  login: string;
  password: string;
  rememberMe: boolean;
}

const validate = ({ login, password }: LoginFormValues) => {
  const error: FormikErrors<LoginFormValues> = {};

  if (!password) {
    error.password = 'Required';
  }

  if (!login) {
    error.login = 'Required';
  }

  return error;
};

function LoginForm() {
  const dispatch = useAppDispatch();

  const inititalValues: LoginFormValues = {
    login: '',
    password: '',
    rememberMe: false,
  };

  // Render
  return (
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={inititalValues}
        onSubmit={({ login, password, rememberMe }, formUtils) =>
          // Async submit with server-side errors handling
          dispatch(submitLoginForm({ login, password, rememberMe }))
            // Wait for any server errors from thunk
            .then((action) => action?.payload)
            .then((errors) => {
              if (errors) {
                // Finish with setting errors to form status
                formUtils.setStatus({
                  formErrors: [...errors],
                });
              }
            })
        }
        validate={validate}
      >
        {({ isSubmitting }: FormikProps<LoginFormValues>) => (
          <Form data-testid='loginForm' className={styles.form}>
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

            <SubmitField buttonText='Sign in' isSubmiting={isSubmitting} />
            {isSubmitting ? (
              <div className={styles.SpinnerContainer}>
                <Spinner />
              </div>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
