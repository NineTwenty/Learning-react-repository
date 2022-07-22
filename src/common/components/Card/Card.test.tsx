import { render, screen } from '@testing-library/react';
import { Card } from './Card';

it('Renders without crashing', () => {
  render(<Card header='test header'>test children</Card>);
  screen.getByRole('heading', { name: /test header/i });
  screen.getByText('test children');
});
