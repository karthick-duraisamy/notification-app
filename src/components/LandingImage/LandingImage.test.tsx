import { render, screen } from '@testing-library/react';
import CommonTestWrapper from '../CommonTestWrapper/CommonTestWrapper';
import { LandingImage } from './LandingImage';

it('renders LandingImage', () => {
  render(
    <CommonTestWrapper>
      <LandingImage />
    </CommonTestWrapper>
  );
  expect(screen.getByTestId('landingimage')).toBeInTheDocument();
});
