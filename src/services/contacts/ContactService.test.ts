import { fireEvent, render, screen } from '@testing-library/react';
import { useAddContactsMutation, useGetContactMutation, useLazyGetContactsQuery } from './Contact';
import { Contact } from './ContactTypes';

it('checking getcontacts api service call', () => {
  const [getContacts, getContactsData] = useLazyGetContactsQuery();
  const filterData = {
    status: undefined,
    project: 1
  };
  getContacts(filterData);
  expect(getContactsData?.isSuccess).toBe(true);
});

it('checking addContacts api service call', () => {
  const item: Contact = {
    email_id: 'karthick12de@gmail.com',
    first_name: 'karthick',
    last_name: 'Duraisamy',
    phone_number: '9807654321',
    status: 1
  };
  const [addContactservice] = useAddContactsMutation();
  addContactservice({ contact: item });
});

it('checking getcontacts for edit api service call', () => {
  const [getContactService, getContactserviceStatus] = useGetContactMutation();
  getContactService({ id: '1', project: '1' });
  expect(getContactserviceStatus?.isSuccess).toBe(true);
});
