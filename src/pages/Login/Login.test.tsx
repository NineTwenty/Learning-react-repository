import userEvent from '@testing-library/user-event';
import { render, screen } from 'utils/test-utils';
import Login from './Login';

it('Show login page', () => {
  render(<Login loggedIn={false} />);

  screen.getByRole('button', { name: /sign in/i });
  screen.getByRole('heading', { name: /don't have/i });
});

it('Show sign up page', async () => {
  render(<Login loggedIn={false} />);

  screen.getByRole('button', { name: /sign in/i });

  userEvent.click(screen.getByRole('button', { name: /sign up/i }));
  await screen.findByRole('heading', { name: /already have/i });
});

it('Redirect to profile if logged in', () => {
  const { history } = render(<Login loggedIn />, { route: '/login' });
  expect(history.location.pathname).toBe('/profile');
});
