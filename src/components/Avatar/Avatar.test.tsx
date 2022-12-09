import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

it('Renders without crashing', () => {
  render(<Avatar name='Test Name' />);
  screen.getByAltText(/test name/i);
});
