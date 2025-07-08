import { fireEvent, render, screen } from '@testing-library/react';
import { HeaderItems } from './Header';
import TestWrapper from '../CommonTestWrapper/CommonTestWrapper';
const { Login } = require('shared');

it('renders Header', () => {
  render(
    <TestWrapper>
      <HeaderItems />
    </TestWrapper>
  );
  expect(screen.getByTestId('header')).toBeInTheDocument();
});
it('toogle screen', () => {
  render(
    <TestWrapper>
      <HeaderItems />
    </TestWrapper>
  );
  const selectEle = screen.getByTestId('header_toggle_screen');
  if (selectEle) fireEvent.click(selectEle);
  if (selectEle) fireEvent.click(selectEle);
  // expect(screen.getByTestId('header_toggle_screen')).toBeInTheDocument();
});
it('tesing log in section', () => {
  render(
    <TestWrapper>
      <HeaderItems />
    </TestWrapper>
  );
  const selectEle = screen.getByTestId('log_out_ele');
  if (selectEle) fireEvent.click(selectEle);
  if (selectEle) fireEvent.click(selectEle);
  expect(screen.getByTestId('header_toggle_screen')).toBeInTheDocument();
});
it('tesing log in component', () => {
  render(
    <TestWrapper>
      <Login />
    </TestWrapper>
  );
  const selectEle = screen.getByTestId('log_in_textarea');
  if (selectEle) fireEvent.click(selectEle);
  fireEvent.change(screen.getByPlaceholderText(/email_id_help/i), {
    target: { value: 'infiniti@infi.com' }
  });

  const selectElement = screen.getByTestId('log_in_pwdarea');
  if (selectEle) fireEvent.click(selectElement);
  fireEvent.change(screen.getByPlaceholderText(/password_help/i), {
    target: { value: 'Infi@1234' }
  });
  const loginBtn = screen.getByTestId('log_in_btn');
  if (selectEle) fireEvent.click(loginBtn);
  if (selectEle) fireEvent.click(selectEle);
  if (selectEle) fireEvent.click(selectEle);
  expect(screen.getByTestId('header_toggle_screen')).toBeInTheDocument();
});
