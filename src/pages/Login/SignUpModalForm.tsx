import { Form, Formik, FormikErrors } from 'formik';
import { handleUserRegistration } from 'data';
import { useAppDispatch } from 'common/hooks/hooks';
import PasswordField from 'common/components/PasswordField';
import SubmitField from 'common/components/SubmitField';
import TextField from 'common/components/TextField';
import style from './SignUpModalForm.module.scss';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUpModalForm() {
  const dispatch = useAppDispatch();
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validate = (formValues: FormValues): FormikErrors<FormValues> => {
    const errors: Partial<FormValues> = {};
    const { firstName, lastName, email, password, confirmPassword } =
      formValues;

    if (!firstName) errors.firstName = 'Required';
    if (!lastName) errors.lastName = 'Required';
    if (!email) errors.email = 'Required';
    if (!password) errors.password = 'Required';
    if (!confirmPassword) errors.confirmPassword = 'Required';
    if (confirmPassword !== password)
      errors.confirmPassword = 'Passwords must be same';

    return errors;
  };

  return (
    <section>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={async (values, formUtils) => {
          const errors = await dispatch(handleUserRegistration(values));

          if (errors) {
            // Set global form error
            formUtils.setStatus({ formErrors: [...errors.payload] });
          }
        }}
      >
        <Form className={style.Form}>
          <TextField
            name='firstName'
            label='First name'
            placeholder='First name'
          />
          <TextField
            name='lastName'
            label='Last name'
            placeholder='Last name'
          />
          <TextField name='email' label='Email' placeholder='Email' />
          <PasswordField
            name='password'
            label='Password'
            placeholder='Password'
          />
          <PasswordField
            name='confirmPassword'
            label='Confirm Password'
            placeholder='Confirm Password'
          />
          <SubmitField buttonText='Sign Up' />
        </Form>
      </Formik>
    </section>
  );
}

export default SignUpModalForm;
