import { render } from '@testing-library/react';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';
import { ForgotPassword } from './ForgotPassword';

describe('<ForgotPassword />', () => {
  test('it should mount', () => {
    render(
      <CommonTestWrapper>
        <ForgotPassword />
      </CommonTestWrapper>
    );
  });
});
