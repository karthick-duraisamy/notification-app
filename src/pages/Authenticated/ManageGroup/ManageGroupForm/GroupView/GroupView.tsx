import { useEffect, useState } from 'react';
import { Row, Col, Modal, notification, Space, Input, Button } from 'antd';
import type { TableProps } from 'antd';
import Table from '@/components/Table/Table';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import './GroupView.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusCircleFilled } from '@ant-design/icons';
import ManageGroupForm from '../ManageGroupForm';
import { useAppSelector } from '../../../../../hooks/App.hook';
import { useDeleteContactGroupMutation, useDeleteContactMutation, useGetContactGroupMutation, useLazyGetContactListQuery, useLazyGetcontactUploadHistoryQuery, useLazyGetDetailFieldsQuery, useUpdateContactDetailGroupMutation, useUpdateContactGroupMutation } from '../../../../../services/contacts/groups/Group';
import { fieldNameFormatter } from '../../../../../Utils/commonFunction';
import { DeleteNotification } from '@/components/DeleteNotification/DeleteNotification';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';
import { BackButton } from '@/components/BackButton/BackButton';
import { GroupViewLoader, SkeletonElement } from '@/components/SkeletonElement/SkeletonElement';
import { dateFormat } from '../../../../../Utils/date';
import DynamicForm from '@/components/DynamicForm/DynamicForm';
import GroupDetailShow from '@/components/GroupDetailShow/GroupDetailShow';

const ContactEdit = () => {
  const { id } = useParams() as { action: string; id: string };
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  const [getContactGroup, getContactGroupInfo] = useGetContactGroupMutation();
  const [updateContactGroup, { isSuccess }] = useUpdateContactGroupMutation();
  const [updateContactDetailGroup, getUpdateContactDetailGroup] = useUpdateContactDetailGroupMutation();
  const [getContactList, getContactListData] = useLazyGetContactListQuery();
  const [contactFieldsInfo, contactFieldsInfoStatus]: any = useLazyGetDetailFieldsQuery();
  const [contactInfo, setContactInfo] = useState<any>();
  const [contactCount, setContactCount] = useState<any>([]);
  const [contactSearch, setContactSearch] = useState<string>('');
  const { groupid } = useAppSelector((state) => state.TemplateProjectReducer);
  const [uploadHistory, setUploadHistory] = useState<boolean>(false);
  // The following service call is made to get the upload history response
  const [getContactuploadHistory, getContactuploadHistoryStatus]: any = useLazyGetcontactUploadHistoryQuery();

  // The following line is used to set the filter option for the group list
  const [filterData, setFilterData] = useState<any>({
    project: project !== undefined && project !== null ? Number(project) : undefined,
    group_id: groupid,
    page: 1,
    page_size: 6,
    search: undefined
  });

  useEffect(() => {
    getContactList(filterData);
  }, [filterData]);

  // The following useEffect is triggered when update contact group is completed
  useEffect(() => {
    if (isSuccess && groupid !== undefined) {
      getContactGroup({ id: groupid, project: project });
      notification.success({ message: 'Group updated successfully' });
    }
  }, [isSuccess]);

  //Notification for contact update
  useEffect(() => {
    if (getUpdateContactDetailGroup?.isSuccess) {
      notification.success({ message: 'Group contact updated successfully' });
    }
  }, [getUpdateContactDetailGroup?.isSuccess]);

  // The following useEffect is triggered on initial rendering to get the contact information against group id
  useEffect(() => {
    if (project !== null && project !== undefined && groupid !== undefined) {
      getContactList({ project: project, group_id: groupid });
      contactFieldsInfo({ project: project });
      getContactuploadHistory({ project: project, contact_group: groupid });
    } else {
      navigate("/manageGroup");
    }
  }, []);

  // The following useEffect is triggered when project id is changed
  useEffect(() => {
    if (project !== null && project !== undefined && groupid !== undefined) {
      getContactList({ project: project, group_id: groupid });
      contactFieldsInfo({ project: project });
      getContactuploadHistory({ project: project, contact_group: groupid });
    } else {
      navigate("/manageGroup");
    }
  }, [project]);

  // The following useEffect is triggered when the contact information api gets success
  useEffect(() => {
    if (getContactListData?.isSuccess && (getContactListData as any)?.data?.response?.data?.results) {
      setContactInfo((getContactListData as any)?.data?.response?.data?.results);
      setContactCount((getContactListData as any)?.data?.response?.data?.count);
    }
  }, [getContactListData]);
  useEffect(() => {
    if (project !== null && project !== undefined && groupid !== undefined) {
      getContactGroup({ id: groupid, project: project });
    } else {
      navigate("/manageGroup");

    }
  }, []);

  useEffect(() => {
    if (project !== null && project !== undefined && groupid !== undefined) {
      getContactGroup({ id: groupid, project: project });
    } else {
      navigate("/manageGroup");

    }
  }, [project, id]);

  // To set the response for using an show and delete function.
  const [groupViewData, setGroupViewData] = useState<any>();

  const navigate = useNavigate();

  // To set the response for Titles and Group details.
  useEffect(() => {
    if (getContactGroupInfo?.isSuccess && getContactGroupInfo?.data) {
      const data = getContactGroupInfo.data as { response?: { data: any } };
      setGroupViewData(data.response?.data);
    }
  }, [getContactGroupInfo]);

  // To delete the Group Manage
  const [deleteContactGroup] = useDeleteContactGroupMutation();
  const [deleteContact] = useDeleteContactMutation();

  const deleteServiceMethod = () => {
    deleteContactGroup({ id: groupViewData?.group_id, project })
      .then(() => {
        notification.success({ message: `${groupViewData?.group_name} group deleted successfully` });
      })
      .catch((error) => {
        console.error('Delete failed', error);
      });
    navigate(-1);
  };

  //Required feild selection.
  const filtered = {
    groupName: groupViewData?.group_name,
    description: groupViewData?.description,
    topic: groupViewData?.topic
  };

  //To get the selected Row deatils for mapping
  // const [selectedRow, setSelectedRow] = useState<any>(null);


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
      const serialNo = ((1 as number) - 1) * 6 + (index + 1);
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
        .then(() => {
          notification.success({ message: `Deleted successfully` });
        })
        .catch((error) => {
          console.error('Delete failed', error);
        });
    };

    const actions = [
      {
        name: 'Edit',
        handler: async () => {
          console.log('edit ' + record);
          //To check and comparing the record to taken data for form field.
          // setSelectedRow(editContactSchema(record));
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
    onFinish: () => { }
  });

  //Dynamic form feilds.
  const editContactSchema = (contact: Record<string, any>) => {
    //Label name secrication
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

  // The following method is triggered when search icon is clicked to filter
  const handleContactSearchSearch = () => {
    setFilterData((prev: any) => ({
      ...prev,
      project: project,
      search: contactSearch
    }));
  };

  //After updation of contact details
  const updation = (values: any) => {
    console.log(values);
  };

  //After updation of Group details
  const groupUpdation = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Row className="cls-contact-details">
        <Col span={24}>
          <Row>
            <Col span={22}>
              <h1>View group details</h1>
            </Col>
            <Col span={2}>
              <BackButton />
            </Col>
          </Row>

          {getContactGroupInfo.isLoading && !getContactGroupInfo.isSuccess ? (
            <GroupViewLoader />
          ) : (
            <Row className="cls-group-info">
              <Col span={18}>
                <p>
                  <span>{groupViewData?.group_name}</span> <span> | </span>
                  <span>{groupViewData?.description}</span>
                </p>
                <p>
                  {groupViewData?.topic} | {groupViewData?.created_by} | {dateFormat(groupViewData?.created_at)}
                </p>
              </Col>
              <Col span={3}>
                <Button type='default'
                  className='cls-upload-history-btn'
                  style={{}}
                  onClick={() =>
                    setUploadHistory(prev => !prev)
                  }
                >Upload history</Button>
              </Col>
              <Col span={1}>
                <Button type='link' onClick={() =>
                  setModalConfig({
                    open: true,
                    title: 'Edit Group details',
                    formData: editContactSchema(filtered),
                    onFinish: groupUpdation
                  })
                }>Edit</Button>
              </Col>
              <Col span={1}>
                <DeleteOutlined
                  onClick={() => {
                    const props = {
                      serviceMethod: deleteServiceMethod,
                      id: project
                    };
                    DeleteNotification(props);
                  }}
                />
              </Col>
            </Row>
          )}
          {contactFieldsInfoStatus?.isFetching &&
            !getContactListData?.isSuccess &&
            !contactFieldsInfoStatus?.isSuccess ? (
            <SkeletonElement />
          ) : (
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
                          onFinish: () => { }
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
                        suffix={<SearchOutlined style={{ color: '#666' }} onClick={handleContactSearchSearch} />}
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
          )}
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
      {getContactuploadHistoryStatus?.isSuccess && (getContactuploadHistoryStatus?.data?.response?.data?.results).length > 0 && (
        <Modal open={uploadHistory} onCancel={() => {
          setUploadHistory(false)
        }} footer={null} centered className='cls-modal-section'>
          {getContactuploadHistoryStatus?.data?.response?.data.results.map((data: any, index: any) => (
            <GroupDetailShow manageGroup={data} responseData={undefined} groupDetails={undefined} index={index} manageGroupLength={(getContactuploadHistoryStatus?.data?.response?.data.results).length} count={(getContactuploadHistoryStatus?.data?.response?.data?.count)} />
          ))}
        </Modal>
      )}
    </>
  );
};

export default ContactEdit;
