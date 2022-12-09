import { render, screen } from '@testing-library/react';
import Button from 'common/components/Button';

it('Renders without crashing', () => {
  render(<Button>test</Button>);
  screen.getByRole('button');
});
