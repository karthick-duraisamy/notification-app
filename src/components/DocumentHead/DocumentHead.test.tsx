import { render } from '@testing-library/react';
import { DocumentHead } from './DocumentHead';
import CommonTestWrapper from '../CommonTestWrapper/CommonTestWrapper';

describe('<DocumentHead />', () => {
  test('for login page', () => {
    render(<CommonTestWrapper>{<DocumentHead data="/login" />}</CommonTestWrapper>);
  });
  test('for forgot password page', () => {
    render(<CommonTestWrapper>{<DocumentHead data="/forgot-password" />}</CommonTestWrapper>);
  });
  test('for reset password page', () => {
    render(<CommonTestWrapper>{<DocumentHead data="/reset-password" />}</CommonTestWrapper>);
  });
  test('for dashboard page', () => {
    render(<CommonTestWrapper>{<DocumentHead data="/dashboard" />}</CommonTestWrapper>);
  });
});
