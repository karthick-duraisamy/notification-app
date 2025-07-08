import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppRoute } from './index.route';
import CommonTestWrapper from '../components/CommonTestWrapper/CommonTestWrapper';

it('renders Header', () => {
  render(
    <CommonTestWrapper>
      <AppRoute />
    </CommonTestWrapper>
  );
});
