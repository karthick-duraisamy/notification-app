import { fireEvent, render, screen } from '@testing-library/react';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';
import Mailer from './Mailer';
import MailerForm from './MailerForm';

describe('Mailer page testing', () => {
  it('rendered Mailer page', () => {
    render(
      <CommonTestWrapper>
        <Mailer />
      </CommonTestWrapper>
    );
    const create_mailer_btn = screen.getByTestId('create_mailer_btn');
    if (create_mailer_btn) fireEvent.click(create_mailer_btn);
  });
  it('rendered Mailer form page', () => {
    render(
      <CommonTestWrapper>
        <MailerForm />
      </CommonTestWrapper>
    );
    fireEvent.change(screen.getByPlaceholderText(/Mailer name/i), {
      target: { value: 'Jest testing' }
    });
    fireEvent.select(screen.getByPlaceholderText(/Select setting/i), {
      target: { value: '2' }
    });
    fireEvent.select(screen.getByPlaceholderText(/Select Action/i), {
      target: { value: '2' }
    });
    fireEvent.select(screen.getByPlaceholderText(/Select folder/i), {
      target: { value: '1' }
    });
    fireEvent.select(screen.getByPlaceholderText(/Select language/i), {
      target: { value: '1' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Select template/i), {
      target: { value: 'air' }
    });
    fireEvent.select(screen.getByPlaceholderText(/Select template/i), {
      target: { value: 1 }
    });
    const create_mailer_btn = screen.getByTestId('submit_mailer_form');
    if (create_mailer_btn) fireEvent.click(create_mailer_btn);
  });
});
