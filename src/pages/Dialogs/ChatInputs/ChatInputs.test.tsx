import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatInputs from './ChatInputs';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const testString = 'Test string';

test('Change value when something typed in', async () => {
  const { getByRole } = render(<ChatInputs dialogId='1' />);
  const textarea = getByRole('textbox');

  userEvent.type(textarea, testString);

  await waitFor(() => expect(textarea).toHaveValue(testString));
});

test('Reset Value on submit', async () => {
  const { getByRole } = render(<ChatInputs dialogId='1' />);
  const textarea = getByRole('textbox');

  userEvent.type(textarea, testString);
  userEvent.click(getByRole('button'));

  await waitFor(() => expect(textarea).toBeEmptyDOMElement());
});

test('Type new line on shift + enter keypress', async () => {
  const { getByRole } = render(<ChatInputs dialogId='1' />);
  const textarea = getByRole('textbox');

  userEvent.type(textarea, testString);
  userEvent.keyboard('{Shift>}{Enter}{/Shift}');

  await waitFor(() => expect(textarea).toHaveValue(`${testString}\n`));
});
