import { render, screen } from '@testing-library/react';
import { HamburgerButton } from './HamburgerButton';

it('Renders without crashing', () => {
  render(<HamburgerButton isOpen>test</HamburgerButton>);
  screen.getByRole('button');
});
