import { Formik, Form, FormikErrors } from 'formik';
import { useAppDispatch } from 'hooks/hooks';
import { submitLoginForm } from 'data';
import styles from './LoginForm.module.css';
import TextField from '../common/TextField';
import PasswordField from '../common/PasswordField';
import CheckboxField from '../common/Checkbox';
import SubmitField from '../common/SubmitField';

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

            <SubmitField buttonText='Sign in' />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
