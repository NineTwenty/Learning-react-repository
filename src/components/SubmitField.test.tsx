import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import SubmitField from './SubmitField';

it('render and trigger submit on click', async () => {
  const user = userEvent.setup();
  const initialValues = { text: '' };

  const onSubmit = jest.fn(
    (values, actions: FormikHelpers<typeof initialValues>) => {
      actions.resetForm();
    }
  );

  const { getByRole } = render(
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Field name='text' />
        <SubmitField buttonText='test' />
      </Form>
    </Formik>
  );

  const string = 'Test string';
  const textbox = getByRole('textbox');

  await user.type(textbox, string);
  expect(textbox).toHaveValue(string);

  await user.click(getByRole('button'));
  await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

  expect(textbox).toHaveValue('');
});
