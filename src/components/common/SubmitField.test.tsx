import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import SubmitField from './SubmitField';

it('render and trigger submit on click', async () => {
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
        <SubmitField />
      </Form>
    </Formik>
  );

  const string = 'Test string';
  const textbox = getByRole('textbox');

  userEvent.type(textbox, string);
  expect(textbox).toHaveValue(string);

  userEvent.click(getByRole('button'));
  await waitFor(() => expect(onSubmit).toBeCalledTimes(1));

  expect(textbox).toHaveValue('');
});
