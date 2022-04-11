import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Formik, FormikHelpers } from 'formik';
import SubmitField from 'common/components/SubmitField';
import { TextAreaField } from './TextAreaField';

it('Render and correctly integrate with form', async () => {
  const initialValues = {
    text: '',
  };

  const onSubmit = jest.fn(
    (values, actions: FormikHelpers<typeof initialValues>) => {
      actions.resetForm();
    }
  );

  const { getByRole } = render(
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <TextAreaField name='text' />
        <SubmitField buttonText='Post' />
      </Form>
    </Formik>
  );

  const string = 'Test string';
  const textarea = getByRole('textbox');

  userEvent.type(textarea, string);

  expect(textarea).toHaveValue(string);

  // Submit
  userEvent.click(getByRole('button'));
  await waitFor(() => expect(onSubmit).toBeCalledTimes(1));

  // Assert that form reset work correctly
  expect(textarea).toBeEmptyDOMElement();
});
