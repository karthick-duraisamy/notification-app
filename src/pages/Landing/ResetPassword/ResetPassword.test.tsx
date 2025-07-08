import { render, screen } from '@testing-library/react';
import ResetPassword from './ResetPassword';
import ResetPasswordSection from '../ResetPassword/ResetPassword.lazy';

describe('<ResetPassword />', () => {
  test('it should mount', () => {
    render(<ResetPassword />);

    const resetPassword = screen.getByTestId('ResetPassword');

    expect(resetPassword).toBeInTheDocument();
  });
  test('ResetPassword lazy Section', () => {
    render(
      <ResetPasswordSection>
        <ResetPassword />
      </ResetPasswordSection>
    );

    const resetPassword = screen.getByTestId('ResetPassword');

    expect(resetPassword).toBeInTheDocument();
  });
});
