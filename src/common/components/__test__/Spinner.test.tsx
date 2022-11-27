import { render } from '@testing-library/react';
import Spinner from 'common/components/Spinner';

it('Renders without crashing', () => {
  render(<Spinner />);
});
