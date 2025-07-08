import { fireEvent, render, screen } from '@testing-library/react';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';
import Contacts from './Contacts';
import ContactsForm from './ContactsForm';
import { Form } from './Form';
import { useContactsForm } from '../../../hooks/ContactsForm.hook';

describe('Contacts page testing', () => {
  it('rendered contacts page', () => {
    render(
      <CommonTestWrapper>
        <Contacts />
      </CommonTestWrapper>
    );
  });
  it('clicking create contacts button', () => {
    render(
      <CommonTestWrapper>
        <Contacts />
      </CommonTestWrapper>
    );
    const create_contacts_btn = screen.getByTestId('create_contacts_btn');
    if (create_contacts_btn) fireEvent.click(create_contacts_btn);
    // const submit_btn = screen.getByText('Submit');
    // if (submit_btn) fireEvent.click(submit_btn);
  });
  it('creating new contacts info', () => {
    render(
      <CommonTestWrapper>
        <ContactsForm />
      </CommonTestWrapper>
    );
    const contactpage_upload_btn = screen.getByTestId('contactpage_upload_btn');
    if (contactpage_upload_btn) fireEvent.click(contactpage_upload_btn);
  });
  it('rendered contacts form', () => {
    const { form, onFinish, resetFields, isSaving } = useContactsForm();
    render(
      <CommonTestWrapper>
        <Form resetFields={resetFields} form={form} formSubmit={onFinish} isSaving={isSaving} />
      </CommonTestWrapper>
    );
    fireEvent.change(screen.getByPlaceholderText(/First name/i), {
      target: { value: 'Jest' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Last name/i), {
      target: { value: 'testing' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Phone number/i), {
      target: { value: '9807654321' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Email ID/i), {
      target: { value: 'infiniti@infi.com' }
    });
    const contactpage_upload_btn = screen.getByTestId('contactpage_upload_btn');
    if (contactpage_upload_btn) fireEvent.click(contactpage_upload_btn);
    const contactform_minus_icon = screen.getByTestId('contactform_minus_icon');
    if (contactform_minus_icon) fireEvent.click(contactform_minus_icon);
  });
});
