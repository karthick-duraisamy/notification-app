import { message, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddContactsMutation, useGetContactMutation, useUpdateContactMutation } from '../services/contacts/Contact';
import { useAppSelector } from '../hooks/App.hook';
import type { Contact } from '../services/contacts/ContactTypes';

const validateAction = (action: string) => ['create', 'edit'].includes(action);

const useContactsForm = () => {
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  const [form] = useForm();
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  const navigate = useNavigate();
  const { action, id } = useParams() as { action: string; id?: string };

  const [addContactservice] = useAddContactsMutation();
  const [getContactService, getContactserviceStatus] = useGetContactMutation();
  const [updateContactService] = useUpdateContactMutation();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    // validate and 'replace' the location, so user can go back to previous page
    if (!action || !validateAction(action)) {
      navigate('/404');
    }
    if (action === 'edit' && id !== undefined) {
      getContactService({ id: id, project: project });
    }
  }, [action, getContactService, id, navigate, project]);

  // getContact service
  useEffect(() => {
    if (getContactserviceStatus.isSuccess && getContactserviceStatus.data) {
      if (getContactserviceStatus.data.responseCode === 0) {
        const { response } = getContactserviceStatus.data;
        const contact = response.data;
        form.setFieldsValue({
          contacts: [
            {
              first_name: contact.first_name,
              last_name: contact.last_name,
              phone_number: contact.phone_number,
              email_id: contact.email_id,
              status: contact.status
            }
          ]
        });
      }
    }
  }, [getContactserviceStatus, form]);

  const onFinish = (values: any) => {
    const formatFormValues = (values: any): Contact[] | undefined => {
      if (values.contacts && values.contacts.length > 0) {
        return values.contacts.map((item: any) => {
          return {
            first_name: item.first_name,
            last_name: item.last_name,
            phone_number: item.phone_number,
            email_id: item.email_id,
            status: '1',
            project: project
          };
        });
      }
    };

    switch (action) {
      case 'create':
        formatFormValues(values)?.forEach((item) => {
          setIsSaving(true);
          addContactservice({ contact: item })
            .unwrap()
            .catch((resp) => resp.data)
            .then((response: any) => {
              setIsSaving(false);
              if (response.responseCode === 0) {
                notification.success({ message: 'contact created' });
                navigate(-1);
              } else {
                message.error(response?.response?.Message);
                if (response && response.responseCode === 1 && response.response.errors && response.response.errors) {
                  const contactFormErrors = response.response.errors.contact as any;
                  Object.entries(contactFormErrors).forEach(([key, value]) => {
                    form.setFields([{ name: ['contacts', 0, key], errors: value }] as any);
                  });
                }
              }
            });
        });

        break;
      case 'edit':
        if (id === undefined) {
          return;
        }

        formatFormValues(values)?.forEach((item) => {
          setIsSaving(true);
          updateContactService({ id: id, contact: item, project: project })
            .unwrap()
            .catch((resp) => resp.data)
            .then((response: any) => {
              setIsSaving(false);
              if (response.responseCode === 0) {
                navigate(-1);
                notification.success({ message: 'contact updated' });
              } else {
                message.error(response?.response?.Message);
                if (response && response.responseCode === 1 && response.response.errors && response.response.errors) {
                  const contactFormErrors = response.response.errors.contact as any;
                  Object.entries(contactFormErrors).forEach(([key, value]) => {
                    form.setFields([{ name: ['contacts', 0, key], errors: value }] as any);
                  });
                }
              }
            });
        });

        break;
    }
  };

  const resetFields = () => {
    form.resetFields();
  };

  return {
    form,
    onFinish,
    resetFields,
    modal: {
      isUploadModalVisible,
      setIsUploadModalVisible
    },
    route: {
      action
    },
    isSaving
  };
};

export { useContactsForm };
