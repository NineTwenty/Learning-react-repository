import { render, screen } from '@testing-library/react';
import Gallery from './Gallery';

const fakeChildren: JSX.Element[] = [];
// Generate 8 children
for (let i = 0; i < 8; i += 1) {
  fakeChildren.push(<div key={i}>test</div>);
}

it('Renders with passed children', () => {
  render(<Gallery>{fakeChildren}</Gallery>);

  const children = screen.getAllByText('test');
  expect(children).toHaveLength(8);
});

it('Limit showed children by specified number', () => {
  render(<Gallery limit={4}>{fakeChildren}</Gallery>);

  const children = screen.getAllByText('test');
  expect(children).toHaveLength(4);
});
