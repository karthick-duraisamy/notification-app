import { render } from '@testing-library/react';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';
import Templates from './Templates';

test('Template page renderd', async () => {
  render(
    <CommonTestWrapper>
      <Templates />
    </CommonTestWrapper>
  );
});
