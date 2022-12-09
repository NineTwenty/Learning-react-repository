import { render, screen } from '@testing-library/react';
import Button from 'components/Button';

it('Renders without crashing', () => {
  render(<Button>test</Button>);
  screen.getByRole('button');
});
