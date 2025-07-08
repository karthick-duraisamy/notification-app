import { render } from '@testing-library/react';
import Integration from './Integration';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';

test('renders app without error', async () => {
  render(
    <CommonTestWrapper>
      <Integration />
    </CommonTestWrapper>
  );
});
