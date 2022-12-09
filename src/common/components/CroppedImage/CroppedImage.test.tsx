import { render, screen } from '@testing-library/react';
import CroppedImage from './CroppedImage';

it('Renders without crashing', () => {
  render(<CroppedImage src='https://picsum.photos/200' alt='test alt' />);
  screen.getByRole('img', { name: 'test alt' });
});
