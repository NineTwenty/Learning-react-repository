import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from 'utils/test-utils';
import Login from './Login';

it('Show login page', () => {
  render(<Login loggedIn={false} />);

  screen.getByRole('button', { name: /sign in/i });
  screen.getByRole('heading', { name: /don't have/i });
});

it('Show sign up page', async () => {
  const user = userEvent.setup();
  render(<Login loggedIn={false} />);

  screen.getByRole('button', { name: /sign in/i });

  await user.click(screen.getByRole('button', { name: /sign up/i }));
  await screen.findByRole('heading', { name: /already have/i });
});

it('Redirect to profile if logged in', async () => {
  const testString = 'test string';
  render(
    <Routes>
      <Route path='/login' element={<Login loggedIn />} />
      <Route path='/profile' element={<h1>{testString}</h1>} />
    </Routes>,
    { route: '/login' }
  );
  expect(window.location.pathname).toBe('/profile');
  await screen.findByRole('heading', { name: testString });
});
