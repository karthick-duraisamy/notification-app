import { render, screen } from '@testing-library/react';
import CommonTestWrapper from '../CommonTestWrapper/CommonTestWrapper';
import { Loader } from './Loader';

it('renders Loader', () => {
  render(
    <CommonTestWrapper>
      <Loader />
    </CommonTestWrapper>
  );
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});
