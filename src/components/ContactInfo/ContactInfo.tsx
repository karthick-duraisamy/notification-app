import { Button, Col, Input, Modal, notification, Row, Space } from 'antd';
import type { TableProps } from 'antd';
import './ContactInfo.scss';
import Table from '../Table/Table';
import {
  useDeleteContactMutation,
  useGetContactGroupMutation,
  useLazyGetContactListQuery,
  useLazyGetDetailFieldsQuery,
  useUpdateContactDetailGroupMutation,
  useUpdateContactGroupMutation
} from '../../services/contacts/groups/Group';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/App.hook';
import { SkeletonElement } from '../SkeletonElement/SkeletonElement';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { fieldNameFormatter } from '../../Utils/commonFunction';
import ManageGroupForm from '../../pages/Authenticated/ManageGroup/ManageGroupForm/ManageGroupForm';
import DynamicForm from '../DynamicForm/DynamicForm';
import { ActionDropDown } from '../PopoverMenu/PopoverMenu';
import { DeleteNotification } from '../DeleteNotification/DeleteNotification';

type ContactInfoProps = {
  id: string;
};

const ContactInfo = ({ id }: ContactInfoProps) => {
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  const [getContactList, getContactListData] = useLazyGetContactListQuery();
  const [getContactGroup, getContactGroupInfo] = useGetContactGroupMutation();
  const [contactFieldsInfo, contactFieldsInfoStatus]: any = useLazyGetDetailFieldsQuery();
  const [updateContactGroup, { isSuccess }] = useUpdateContactGroupMutation();
  const [updateContactDetailGroup] = useUpdateContactDetailGroupMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [contactInfo, setContactInfo] = useState<any>();
  const [contactCount, setContactCount] = useState<any>([]);
  const [contactSearch, setContactSearch] = useState<string>('');

  // The following useEffect is triggered when update contact group is completed
  useEffect(() => {
    if (isSuccess) {
      getContactGroup({ id: id, project: project });
      notification.success({ message: 'Group updated successfully' });
    }
  }, [isSuccess]);

  // To set the modal data for open and form field data.
  const [modalConfig, setModalConfig] = useState<{
    open: boolean;
    title: string;
    formData: any;
    onFinish: (values: any) => void;
  }>({
    open: false,
    title: '',
    formData: [],
    onFinish: () => {}
  });

  // To set the response for using an show and delete function.
  const [groupViewData] = useState<any>();

  // The following line is used to set the filter option for the group list
  const [filterData, setFilterData] = useState<any>({
    project: project !== undefined && project !== null ? Number(project) : undefined,
    group_id: id,
    page: 1,
    page_size: 6,
    search: undefined
  });

  // The following useEffect is triggered for filtering the contact
  useEffect(() => {
    getContactList(filterData);
  }, [filterData]);

  // The following useEffect is triggered on initial rendering to get the contact information against group id
  useEffect(() => {
    if (project !== null && project !== undefined) {
      getContactList({ project: project, group_id: id });
      contactFieldsInfo({ project: project });
    }
  }, []);

  // The following useEffect is triggered when project id is changed
  useEffect(() => {
    if (project !== null && project !== undefined) {
      getContactList({ project: project, group_id: id });
      contactFieldsInfo({ project: project });
    }
  }, [project]);

  // The following useEffect is triggered when the contact information api gets success
  useEffect(() => {
    if (getContactListData?.isSuccess && (getContactListData as any)?.data?.response?.data?.results) {
      setContactInfo((getContactListData as any)?.data?.response?.data?.results);
      setContactCount((getContactListData as any)?.data?.response?.data?.count);
    }
  }, [getContactListData]);

  // After updation of contact details
  const updation = (values: any) => {
    console.log(values);
  };

  // Dynamic form feilds.
  const editContactSchema = (contact: Record<string, any>) => {
    // Label name secrication
    const toLabel = (key: string): string => {
      let label = '';
      for (let i = 0; i < key.length; i++) {
        const char = key[i];
        if (i === 0) {
          label += char.toUpperCase();
        } else if (char >= 'A' && char <= 'Z') {
          label += ' ' + char;
        } else {
          label += char;
        }
      }
      return label
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
    };

    const excludedKeys = ['key', 'email_id', 'description'];
    const allFields = Object.keys(contact).filter((key) => !excludedKeys.includes(key));

    const orderedKeys = [
      ...(contact.email_id ? ['email_id'] : []),
      ...allFields,
      ...(contact.description ? ['description'] : [])
    ];

    return orderedKeys.map((key) => {
      const lowerKey = key.toLowerCase();
      const value = contact[key];
      const type =
        lowerKey === 'email_id'
          ? 'email'
          : lowerKey === 'phone_number'
            ? 'number'
            : lowerKey === 'topic'
              ? 'select'
              : 'text';

      const field: any = {
        name: key,
        label: toLabel(key),
        type,
        value: value || ''
      };

      if (lowerKey === 'email_id') field.required = true;
      if (lowerKey === 'topic') {
        field.options = [value];
        field.selectType = 'customSelect';
      }

      return field;
    });
  };

  // Step 1: Generate columns
  let allColumns: TableProps<any>['columns'] = (contactFieldsInfoStatus?.data?.response?.data?.results ?? []).map(
    (field: { field_name: any }) => ({
      title: fieldNameFormatter(field.field_name),
      dataIndex: field.field_name,
      key: field.field_name,
      render: (_: any, record: any) => <span>{record[field.field_name] ?? '-'}</span>
    })
  );

  allColumns?.unshift({
    title: 'S.No',
    key: 's_no',
    render: (_text: any, _record: any, index: any) => {
      // Calculate the serial number based on the current page and page size
      const serialNo = ((filterData?.page as number) - 1) * 6 + (index + 1);
      return serialNo;
    }
  });

  // Step 2: Move `email` to the beginning
  let columns: any = allColumns?.sort((a: any, b: any) => {
    const order: any = { s_no: 0, email_id: 1 };
    const aOrder = order[a.key] ?? 99;
    const bOrder = order[b.key] ?? 99;

    return aOrder - bOrder;
  });

  // Add action column after dynamicColumns
  columns.push({
    title: 'Action',
    key: 'actions',
    dataIndex: 'action',
    className: 'popover',
    render: (_: any, record: any) => <ActionMenu record={record} />
  });

  //To render the contents of the actions menu
  const ActionMenu = ({ record }: any) => {
    //Deletion Api call for contact.
    const deleteContactServiceMethod = () => {
      deleteContact({ id: record?.contact_id, project: project })
        .then((_response) => {
          notification.success({ message: `Deleted successfully` });
        })
        .catch((error) => {
          console.error('Delete failed', error);
        });
    };

    const actions = [
      {
        name: 'Edit',
        handler: async (_id: number) => {
          setModalConfig({
            open: true,
            title: 'Edit contact',
            formData: editContactSchema(record),
            onFinish: updation
          });
        }
      },
      {
        name: 'Delete',
        handler: async () => {
          const props = {
            serviceMethod: deleteContactServiceMethod,
            id: project
          };
          DeleteNotification(props);
        }
      }
    ];
    return <ActionDropDown referenceId={record} actions={actions} />;
  };

  const [visibleColumn, setVisibleColumn] = useState(columns);

  return (
    <>
      {!getContactListData?.isSuccess ? (
        <SkeletonElement />
      ) : (
        <>
          <Row className="cls-contact-info">
            <Col span={24}>
              <Row justify={'space-between'}>
                <Col>
                  <h3>Contact details</h3>
                </Col>
                <Col>
                  <Button
                    onClick={() =>
                      setModalConfig({
                        open: true,
                        title: 'createContact',
                        formData: [],
                        onFinish: () => {}
                      })
                    }
                    type="primary"
                    size="middle"
                    icon={<PlusCircleFilled />}
                  >
                    Create contact
                  </Button>
                </Col>
              </Row>
              <Row className="cls-filter-ele">
                <Col>
                  <Space size={25} align="start">
                    <Input
                      suffix={
                        <SearchOutlined
                          style={{ color: '#666' }}
                          onClick={() => {
                            setFilterData((prev: any) => ({
                              ...prev,
                              project: project,
                              search: contactSearch
                            }));
                          }}
                        />
                      }
                      placeholder="Search"
                      allowClear
                      onChange={(event: any) => {
                        if (event?.target?.value) {
                          setContactSearch(event?.target?.value);
                        } else {
                          setContactSearch('');
                          setFilterData((prev: any) => ({
                            ...prev,
                            project: project,
                            search: ''
                          }));
                        }
                      }}
                    />
                  </Space>
                </Col>
              </Row>
              <Table
                // selection={{ ...rowSelection }}
                data={contactInfo?.length > 0 ? contactInfo : undefined}
                columns={visibleColumn}
                pathname="tracking"
                pagination={{
                  pagination: {
                    pageSize: filterData?.page_size,
                    total: contactCount,
                    current: filterData?.page
                  },
                  onChange: (config) => {
                    if (config.current) {
                      setFilterData((prev: any) => ({
                        ...prev,
                        project: project,
                        page: config?.current,
                        page_size: config?.pageSize
                      }));
                    }
                  },
                  quickPage: (page) => {
                    console.log(Number(page));
                  }
                }}
                setVisibleColumn={setVisibleColumn}
                initialColumns={columns}
                hideableColumns={['actions', 's_no', 'email_id']}
                disabledSelected={['s_no', 'email_id']}
                selected={['s_no', 'email_id', 'first_name', 'last_name', 'company', 'actions']}
                page={'groupview'}
              />
            </Col>
          </Row>
          <Modal
            open={modalConfig.open}
            onCancel={() => setModalConfig({ ...modalConfig, open: false })}
            footer={null}
            className="cls-dynamic-form"
            style={{ width: 700 }}
          >
            {modalConfig?.title == 'createContact' ? (
              <ManageGroupForm
                pathName="manageView"
                groupData={groupViewData}
                closeModal={() => setModalConfig({ ...modalConfig, open: false })}
                isBack={true}
              />
            ) : (
              modalConfig?.formData && (
                <DynamicForm
                  formData={modalConfig.formData}
                  title={modalConfig.title}
                  topicOptions={(getContactGroupInfo as any)?.data?.response?.data?.masterInfo?.topic}
                  onFinish={(values: any) => {
                    if (modalConfig.title == 'Edit Group details') {
                      let updatedValue = {
                        name: values?.groupName,
                        description: values?.description,
                        topic: '681e080347e451e50daa3caa',
                        project_id: project,
                        status: '681e080347e451e50daa3c8f'
                      };
                      updateContactGroup({ contactGroup: updatedValue, id: id, project: project });
                    } else {
                      const contactIdField = modalConfig?.formData.find(
                        (field: { name: string }) => field.name === 'contact_id'
                      );
                      const contactId = contactIdField ? contactIdField.value : null;
                      updateContactDetailGroup({ contactGroup: values, id: contactId, project: project });
                    }
                    modalConfig.onFinish(values);
                    setModalConfig({ ...modalConfig, open: false });
                  }}
                />
              )
            )}
          </Modal>
        </>
      )}
    </>
  );
};

export default ContactInfo;
