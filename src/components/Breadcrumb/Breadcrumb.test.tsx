import { render, screen } from '@testing-library/react';
import CommonTestWrapper from '../CommonTestWrapper/CommonTestWrapper';
import { Breadcrumb } from './Breadcrumb';

it('renders BackButton', () => {
  render(
    <CommonTestWrapper>
      <Breadcrumb />
    </CommonTestWrapper>
  );
  expect(screen.getByTestId('breadcrum')).toBeInTheDocument();
});
