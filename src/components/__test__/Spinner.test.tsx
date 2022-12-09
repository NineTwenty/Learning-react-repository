import { render } from '@testing-library/react';
import Spinner from 'components/Spinner';

it('Renders without crashing', () => {
  render(<Spinner />);
});
