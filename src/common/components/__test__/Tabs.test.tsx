import { render } from '@testing-library/react';
import { Tabs } from 'common/components/Tabs';

it('Renders without crashing', () => {
  render(
    <Tabs>
      <div />
    </Tabs>
  );
});
