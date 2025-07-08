import { useEffect, useState } from 'react';
import { Row, Col, Modal, notification, Button, Space, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons';
import './GroupView.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusCircleFilled } from '@ant-design/icons';
import ManageGroupForm from '../ManageGroupForm';
import { useAppSelector } from '../../../../../hooks/App.hook';
import {
  useDeleteContactGroupConcernMutation,
  useDeleteContactGroupMutation,
  useDeleteContactMutation,
  useGetContactGroupMutation,
  useLazyGetContactListQuery,
  useLazyGetcontactUploadHistoryQuery,
  useLazyGetDetailFieldsQuery,
  useUpdateContactDetailGroupMutation,
  useUpdateContactGroupMutation
} from '../../../../../services/contacts/groups/Group';
import DeleteNotification from '../../../../../components/DeleteNotification_V3/DeleteNotification';
import { BackButton } from '../../../../../components/BackButton/BackButton';
import {
  GroupViewLoader,
  SkeletonElement,
  CardSkeletonElement
} from '../../../../../components/SkeletonElement/SkeletonElement';
import { dateFormat, getDateRangeByType } from '../../../../../Utils/date';
import DynamicForm from '../../../../../components/DynamicForm_V3/DynamicForm';
import {
  CardDarkAnimation,
  FilterIconAnimation,
  TabledarkAnimation,
  CardlightAnimation,
  TablelightAnimation
} from '@/components/AnimationsExport/AnimationsExport';
import CustomTable from '@/components/Table_V2/Table_V2';
import DynamicTableCell from '@/components/DynamicTableCell/DynamicTableCell';
import { CustomDeleteIcon, CustomEditIcon } from '@/components/Icons/Icons';
import CustomFilter from '@/components/CustomFilter_V2/CustomFilter';
import { Status } from '@/components/Status_V2/Status';
import { useSelector } from 'react-redux';
import { UTCConvertion } from '@/Utils/commonFunction';
import { useBulkDeleteMutation } from '@/services/contacts/Contact';
import { setUnwantedTrigger, setDataView } from '@/stores/TemplateProject.store';
import { useDispatch } from 'react-redux';
import GroupDetailShow from '@/components/GroupDetailShow_V3/GroupDetailShow';
import CardView from '@/components/CardView_V3/CardView';

interface ContactEditProps {
  contactList?: any;
}

const ContactEdit: React.FC<ContactEditProps> = (contactList) => {
  const { action: _actionUrl, id } = useParams() as {
    action: string;
    id: string;
  };
  const { project, isTimezoneConversion, isUnwantedTrigger } = useAppSelector((state) => state.TemplateProjectReducer);
  const [getContactGroup, getContactGroupInfo] = useGetContactGroupMutation();
  const [updateContactGroup, { isSuccess }] = useUpdateContactGroupMutation();
  const [updateContactDetailGroup, getUpdateContactDetailGroup] = useUpdateContactDetailGroupMutation();
  const [getContactList, getContactListData] = useLazyGetContactListQuery();
  const [contactFieldsInfo, contactFieldsInfoStatus]: any = useLazyGetDetailFieldsQuery();
  const [contactInfo, setContactInfo] = useState<any>();
  const [contactCount, setContactCount] = useState(6);
  const [contactSearch, setContactSearch] = useState<string>('');
  const { groupid } = useAppSelector((state) => state.TemplateProjectReducer);
  const [uploadHistory, setUploadHistory] = useState<boolean>(false);
  const [apiTrigger, setApiTrigger] = useState<boolean | undefined>();
  const [SelectedView, setSelectedView] = useState<string>('Table');
  const DataViews = useSelector((state: any) => state.TemplateProjectReducer.dataViews); // Update selector
  const viewFromStore = DataViews?.groupView;
  const RenderingView = viewFromStore || SelectedView;
  const [deleteButton, setDeleteButton] = useState<boolean>(false);
  const [bulkDelete] = useBulkDeleteMutation();
  const [selectedContacts, setSelectedContacts] = useState<any[]>();
  const dispatch = useDispatch();

  // The following service call is made to get the upload history response
  const [getContactuploadHistory, getContactuploadHistoryStatus]: any = useLazyGetcontactUploadHistoryQuery();
  const [deleteNotify, setDeleteNotify] = useState<any>({
    isDeleteNotify: false,
    id: undefined,
    representingName: '',
    deleteFunction: undefined
  });

  // The following line is used to set the filter option for the group list
  const defaultFilterData = {
    project: project !== undefined && project !== null ? Number(project) : undefined,
    group_id: groupid,
    page: 1,
    page_size: 6,
    search: undefined
  };
  const [filterData, setFilterData] = useState<any>(defaultFilterData);
  const [deleteContactGroupConcern] = useDeleteContactGroupConcernMutation();

  useEffect(() => {
    if (apiTrigger === false) {
      setApiTrigger(undefined);
      setFilterData(defaultFilterData);
      getContactList(filterData);
    } else if (apiTrigger !== undefined) {
      setApiTrigger(undefined);
      getContactList(filterData);
    }
  }, [filterData, apiTrigger]);

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
      navigate('/manageGroup');
    }
  }, []);

  // To get the contact information from the contactList prop
  useEffect(() => {
    if (contactList) {
      setContactInfo(contactList?.contactList?.results);
      setContactCount(contactList?.contactList?.count);
    }
  }, [contactList]);

  // The following useEffect is triggered when project id is changed
  useEffect(() => {
    if (
      project !== null &&
      project !== undefined &&
      groupid !== undefined &&
      isUnwantedTrigger?.contactGroup !== false
    ) {
      const valueSet = {
        ...isUnwantedTrigger,
        manageGroup: false
      };

      dispatch(setUnwantedTrigger({ value: valueSet }));
      getContactList({ project: project, group_id: groupid });
      contactFieldsInfo({ project: project });
      getContactuploadHistory({ project: project, contact_group: groupid });
    } else {
      navigate('/manageGroup');
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
      navigate('/manageGroup');
    }
  }, []);

  useEffect(() => {
    if (project !== null && project !== undefined && groupid !== undefined) {
      getContactGroup({ id: groupid, project: project });
    } else {
      navigate('/manageGroup');
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
  const showCreatedAt = useSelector((state: any) => state.TemplateProjectReducer.showCreatedAt);
  const deleteContactServiceMethod = async (record: any) => {
    try {
      await deleteContact({ id: record, project });
      notification.success({ message: `${deleteNotify?.representingName} Contact deleted successfully` });
      // Refresh the contact list
      getContactList(filterData);
    } catch (error: any) {
      return Promise.reject(error?.data?.response?.errors?.pk);
    }
  };

  // To delete the selected contacts in bulk
  const bulkDeleteServiceMethod = async (record: any) => {
    try {
      let param = { contact_ids: record, project_id: project };
      await bulkDelete({ param }).unwrap();
      notification.success({ message: 'Selected contacts deleted successfully' });
      // Refresh the contact list
      getContactList(filterData);
    } catch (error: any) {
      console.log(error);
      return Promise.reject(
        error?.data?.response?.errors?.project_id ||
          error?.data?.response?.errors?.contact_ids ||
          error?.data?.response?.errors?.pk ||
          'Failed to delete contacts'
      );
    }
  };

  //Delete service method for group
  const deleteServiceMethod = async (group_id: any, options: any) => {
    try {
      if (options?.forceDeletion) {
        await deleteContactGroupConcern({
          id: group_id,
          project
        }).unwrap();
        notification.success({
          message: `${deleteNotify?.representingName} Group and associated contacts deleted successfully`,
          placement: 'topRight'
        });
      } else {
        await deleteContactGroup({
          id: group_id,
          project
        }).unwrap();
        notification.success({
          message: `${deleteNotify?.representingName} Group deleted successfully`,
          placement: 'topRight'
        });
      }

      navigate(-1);
    } catch (error: any) {
      return Promise.reject(
        error?.data?.response?.errors?.error || error?.data?.response?.errors?.pk || 'Failed to delete group'
      );
    }
  };

  //Required feild selection.
  const filtered = {
    groupName: groupViewData?.group_name,
    description: groupViewData?.description,
    topic: groupViewData?.topic
  };

  //To get the selected Row deatils for mapping
  const [_selectedRow, setSelectedRow] = useState<any>(null);
  const [filterShowUp, setFilterShowUp] = useState(false);

  // Step 1: Generate columns
  let allColumns: TableProps<any>['columns'] = [
    {
      title: 'S.No',
      key: 's_no',
      render: (_: any, __: any, index: number) => {
        const pageSize = filterData?.page_size || 6;
        const currentPage = filterData?.page || 1;
        return (currentPage - 1) * pageSize + index + 1;
      }
    },
    {
      title: 'EMAIL',
      key: 'email_id',
      dataIndex: 'email_id',
      render: (_: any, record: any) => (
        <DynamicTableCell
          data={record}
          title="EMAIL"
          key="email_id"
          width="350px"
          descriptionKey="email_id"
          buttons={[
            {
              icon: <CustomEditIcon />,
              onClick: () => {
                // Filter out job_title from record before editing
                const recordWithoutJobTitle = Object.fromEntries(
                  Object.entries(record).filter(([key]) => key !== 'job_title')
                );
                setSelectedRow(editContactSchema(recordWithoutJobTitle, 'editContact'));
                setModalConfig({
                  open: true,
                  title: 'Edit contact',
                  formData: editContactSchema(recordWithoutJobTitle, 'editContact'),
                  onFinish: updation,
                  id: record?.contact_id
                });
              },
              className: 'cls-edit-icon'
            },
            {
              icon: <CustomDeleteIcon />,
              onClick: () => {
                setDeleteNotify({
                  isDeleteNotify: true,
                  id: record?.contact_id,
                  representingName: record?.email_id,
                  deleteFunction: deleteContactServiceMethod
                });
              },
              className: 'cls-delete-icon'
            }
          ]}
          className="cls-description-cell"
        />
      )
    },
    {
      title: 'FIRST NAME',
      key: 'first_name',
      dataIndex: 'first_name',
      render: (value: any) => value || '-'
    },
    {
      title: 'COUNTRY',
      key: 'country',
      dataIndex: 'country',
      render: (value: any) => value || '-'
    },
    {
      title: 'COMPANY',
      key: 'company',
      dataIndex: 'company',
      render: (value: any) => value || '-'
    },
    {
      title: 'CREATED BY',
      key: 'created_by',
      className: 'cls-multiple-item',
      render: (data: any) => (
        <Space direction="vertical" size={4}>
          <span>{data.created_by || '-'}</span>
          {showCreatedAt['group_view'] && (
            <Space size={12} className="cls-date-time">
              <Space size={4}>
                <CalendarOutlined />
                <span>{data.created_at ? dateFormat(data.created_at, 'date') : '-'}</span>
              </Space>
              <Space size={4}>
                <ClockCircleOutlined />
                <span>{data.created_at ? dateFormat(data.created_at, 'time') : '-'}</span>
              </Space>
            </Space>
          )}
        </Space>
      )
    },
    {
      title: 'STATUS',
      key: 'status_name',
      dataIndex: 'status_name',
      render: (_: any, record: any) => <Status name={record?.status_name || '-'} pathName="campaign" />
    }
  ].filter(Boolean);

  // Step 2: Move `email` to the beginning
  let columns: any = allColumns?.sort((a: any, b: any) => {
    const order: any = { s_no: 0, email_id: 1 };
    const aOrder = order[a.key] ?? 99;
    const bOrder = order[b.key] ?? 99;

    return aOrder - bOrder;
  });

  const [visibleColumn, setVisibleColumn] = useState(columns);

  // To set the modal data for open and form field data.
  const [modalConfig, setModalConfig] = useState<{
    open: boolean;
    title: string;
    formData: any;
    onFinish: (values: any) => void;
    id: string;
  }>({
    open: false,
    title: '',
    formData: [],
    onFinish: () => {},
    id: ''
  });

  //Dynamic form feilds.
  const editContactSchema = (contact: Record<string, any>, mode?: string) => {
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

    // If mode is "editContact", use allowedKeys
    if (mode === 'editContact') {
      const allowedKeys = [
        'email_id',
        'first_name',
        'last_name',
        'status_name',
        'phone_number',
        'country',
        'job_title',
        'company'
      ];

      const orderedKeys = allowedKeys.filter((key) => contact[key] !== undefined);

      return orderedKeys.map((key) => {
        const lowerKey = key.toLowerCase();
        const value = contact[key];
        let type = 'text';

        if (lowerKey === 'email_id') type = 'email';
        else if (lowerKey === 'phone_number') type = 'number';
        else if (lowerKey === 'status_name') type = 'select';

        const field: any = {
          name: key,
          label: toLabel(key),
          type,
          value: value || ''
        };

        if (lowerKey === 'email_id') field.required = true;

        if (lowerKey === 'status_name') {
          field.options = [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' }
          ];
          field.selectType = 'statusSelect';
        }

        return field;
      });
    }

    // Default logic
    const excludedKeys = ['key', 'email_id', 'description'];
    const allFields = Object.keys(contact).filter((key) => !excludedKeys.includes(key));

    const orderedKeys = [
      ...(contact.email_id ? ['email_id'] : []),
      ...allFields,
      ...(contact.description ? ['description'] : ['description'])
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

  // Get the selected rows and keys from the table
  const handleSelectionChange = (selectedKeys: React.Key[], selectedRows: any[]) => {
    const contactIds = selectedRows.map((row: any) => row.contact_id);
    setDeleteButton(true);
    setSelectedContacts(contactIds);
    console.log('Selected:', selectedKeys, contactIds);
  };

  // Filtering data
  const [isCustomDateFilter, setIsCustomDateFilter] = useState(false);
  const [isCreatedDateFilter, setIsCreatedDateFilter] = useState(false);

  // To handle the date range change
  const handleDateRangeChange = (value: string) => {
    setIsCustomDateFilter(value === 'custom');
    setIsCreatedDateFilter(value === 'created_at');

    if (value === 'custom') return;

    if (value === 'select_date') {
      setFilterData((prev: any) => ({
        ...prev,
        project: project,
        created_at: undefined
      }));
      return;
    }

    const { startingDate, endingDate, singleDate } = getDateRangeByType(value, isTimezoneConversion);

    if (singleDate) {
      setFilterData((prev: any) => ({
        ...prev,
        project: project,
        created_at: isTimezoneConversion ? UTCConvertion(singleDate, 'start') : singleDate?.toLocaleDateString('en-CA'),
        created_start_date: undefined,
        create_end_date: undefined
      }));
    }

    if (startingDate && endingDate) {
      setFilterData((prev: any) => ({
        ...prev,
        project: project,
        created_at: undefined,
        create_start_date: isTimezoneConversion ? undefined : startingDate,
        create_end_date: isTimezoneConversion ? undefined : endingDate
      }));
    }
  };

  // Filter Option showup Data
  const filterValue = [
    {
      label: 'Select Date',
      labelKey: 'select_date',
      data: [
        { label: 'Select Date', value: 'select_date' },
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'This Week', value: 'this_week' },
        { label: 'Last Week', value: 'last_week' },
        { label: 'This Month', value: 'this_month' },
        { label: 'Last Month', value: 'last_month' },
        { label: 'Created on', value: 'created_at' },
        { label: 'Date Range', value: 'custom' }
      ],
      handler: handleDateRangeChange
    }
  ];

  // Add conditional date picker
  if (isCreatedDateFilter) {
    filterValue.push({
      label: 'Created date',
      labelKey: 'date',
      data: [],
      handler: (date?: any) => {
        console.log(date);
        setFilterData((prev: any) => ({
          ...prev,
          project: project,
          created_at: isTimezoneConversion ? undefined : date?.toLocaleDateString('en-CA')
        }));
      }
    });
  }

  // Add conditional date range picker
  if (isCustomDateFilter) {
    filterValue.push({
      label: 'Select range',
      labelKey: 'rangePicker',
      data: [],
      handler: (dates: any) => {
        if (dates) {
          setFilterData((prevState: any) => ({
            ...prevState,
            project: project,
            created_at: undefined,
            created_start_date: isTimezoneConversion ? UTCConvertion(dates?.startDate, 'start') : dates?.startDate,
            create_end_date: isTimezoneConversion ? UTCConvertion(dates?.endDate, 'end') : dates?.endDate
          }));
        } else {
          // Reset dates if nothing selected
          setFilterData((prevState: any) => ({
            ...prevState,
            project: project,
            created_at: undefined,
            created_start_date: undefined,
            create_end_date: undefined
          }));
        }
      }
    });
  }

  const cardIcons = (record: any) => (
    <>
      <Tooltip title="Edit" placement="bottom" overlayClassName="cls-custom-tooltip" color="#fff">
        <span
          className="cls-edit cls-icons"
          onClick={() => {
            // Remove job_title if needed
            const recordWithoutJobTitle = Object.fromEntries(
              Object.entries(record).filter(([key]) => key !== 'job_title')
            );
            setSelectedRow(editContactSchema(recordWithoutJobTitle, 'editContact'));
            setModalConfig({
              open: true,
              title: 'Edit contact',
              formData: editContactSchema(recordWithoutJobTitle, 'editContact'),
              onFinish: updation,
              id: record?.contact_id
            });
          }}
        >
          <CustomEditIcon />
        </span>
      </Tooltip>
      <Tooltip title="Delete" placement="bottom" overlayClassName="cls-custom-tooltip" color="#fff">
        <span
          className="cls-delete cls-icons"
          onClick={() => {
            setDeleteNotify({
              isDeleteNotify: true,
              id: record.contact_id,
              representingName: record.email_id,
              deleteFunction: deleteContactServiceMethod
            });
          }}
        >
          <CustomDeleteIcon />
        </span>
      </Tooltip>
    </>
  );

  //To showing the created at data in created by column
  useEffect(() => {
    const updatedColumns = [...(columns || [])];
    setVisibleColumn(updatedColumns);
  }, [showCreatedAt]);

  // Function change the view from table to card and vice versa
  const cardTable = (value: any) => {
    setSelectedView(value);
    dispatch(setDataView({ key: 'groupView', value: value }));
  };

  // The following functions is to listen teh hovering event on the button to switch the view
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTableHovered, setIsTableHovered] = useState(false);

  return (
    <>
      <Row className="cls-contact-details">
        <Col span={24}>
          {!contactList?.contactList && (
            <Row>
              <Col span={22}>
                <h2>View group details</h2>
              </Col>
              <Col span={2}>
                <BackButton />
              </Col>
            </Row>
          )}

          {getContactGroupInfo.isLoading && !getContactGroupInfo.isSuccess && !contactList.contactList ? (
            <GroupViewLoader />
          ) : (
            !contactList.contactList && (
              <Row className="cls-group-info" justify={'space-between'}>
                <Col>
                  <Row>
                    <Col className="cls-tag">
                      <TeamOutlined className="cls-icon-bounce" />
                    </Col>
                    <Col>
                      <h3>{groupViewData?.group_name} </h3>
                      <p>{groupViewData?.description}</p>
                    </Col>
                  </Row>
                  <Row justify={'start'} className="cls-group-info-row">
                    <Col>
                      <CalendarOutlined className="cls-icon-bounce" /> Created at:{' '}
                      {dateFormat(groupViewData?.created_at)}
                    </Col>
                    <Col>
                      <UserOutlined className="cls-icon-bounce" /> Created by: {groupViewData?.created_by}
                    </Col>
                  </Row>
                  <div>
                    <Status name={groupViewData?.status_name} pathName="campaign" />{' '}
                    <Status name={groupViewData?.topic} pathName="campaign" allStatus={[groupViewData?.topic]} />
                  </div>
                </Col>
                <Col className="cls-justify-between">
                  {getContactuploadHistoryStatus?.data?.response?.data?.count > 0 && (
                    <Button
                      type="default"
                      className="cls-upload-history-btn"
                      onClick={() => setUploadHistory((prev) => !prev)}
                    >
                      <UploadOutlined /> Upload history
                    </Button>
                  )}
                  <Button
                    type="default"
                    onClick={() =>
                      setModalConfig({
                        open: true,
                        title: 'Edit group details',
                        formData: editContactSchema(filtered),
                        onFinish: groupUpdation,
                        id: groupViewData?.group_id
                      })
                    }
                  >
                    <FormOutlined /> Edit
                  </Button>
                  <Button
                    type="default"
                    onClick={() => {
                      setDeleteNotify({
                        isDeleteNotify: true,
                        id: groupid,
                        representingName: groupViewData?.group_name,
                        concernConfig: {
                          message: 'Delete all associated contacts',
                          warningText: 'This will permanently delete the mapped contacts'
                        },
                        deleteFunction: deleteServiceMethod
                      });
                    }}
                    className="cls-delete-button"
                  >
                    <DeleteOutlined /> Delete
                  </Button>
                </Col>
              </Row>
            )
          )}
          {contactFieldsInfoStatus?.isFetching &&
          !getContactListData?.isSuccess &&
          !contactFieldsInfoStatus?.isSuccess ? (
            SelectedView === 'Card' ? (
              <CardSkeletonElement />
            ) : (
              <SkeletonElement />
            )
          ) : (
            <Row className="cls-common-style">
              <Col span={24}>
                <Row justify={'space-between'} className="cls-header-ele cls-border-bottom ">
                  <Col span={15} className="cls-align-center ">
                    <h3>Contact details</h3>
                  </Col>
                  <Col>
                    <Row>
                      <Col style={{ marginRight: '5px' }}>
                        <Tooltip
                          title="Add contact"
                          placement="bottom"
                          showArrow
                          overlayClassName="cls-custom-tooltip"
                          color="#fff"
                        >
                          <Button
                            onClick={() =>
                              setModalConfig({
                                open: true,
                                title: 'createContact',
                                formData: [],
                                onFinish: () => {},
                                id: ''
                              })
                            }
                            type="primary"
                            size="middle"
                            icon={<PlusCircleFilled />}
                            className="cls-primary-button"
                            style={{ paddingLeft: '10px' }}
                          >
                            Add contact
                          </Button>
                        </Tooltip>
                      </Col>
                      <Col className="cls-table-card">
                        <Row>
                          {RenderingView === 'Card' ? (
                            <Tooltip
                              title="Table View"
                              placement="bottom"
                              showArrow
                              overlayClassName="cls-custom-tooltip"
                              color="#fff"
                            >
                              <Button
                                type="primary"
                                onMouseEnter={() => setIsTableHovered(true)}
                                onMouseLeave={() => setIsTableHovered(false)}
                                onClick={() => cardTable('Table')}
                              >
                                {isTableHovered ? <TablelightAnimation /> : <TabledarkAnimation />}
                              </Button>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title="Card View"
                              placement="bottom"
                              showArrow
                              overlayClassName="cls-custom-tooltip"
                              color="#fff"
                            >
                              <Button
                                type="primary"
                                onMouseEnter={() => setIsCardHovered(true)}
                                onMouseLeave={() => setIsCardHovered(false)}
                                onClick={() => cardTable('Card')}
                              >
                                {isCardHovered ? <CardlightAnimation /> : <CardDarkAnimation />}
                              </Button>
                            </Tooltip>
                          )}
                        </Row>
                      </Col>
                      <Col className="cls-custom-filter-btn">
                        <Tooltip
                          title="Filter"
                          placement="bottom"
                          showArrow
                          overlayClassName="cls-custom-tooltip"
                          color="#fff"
                        >
                          <Button
                            icon={<FilterIconAnimation />}
                            className="cls-apply-btn cls-hover-expand"
                            size="middle"
                            onClick={() => {
                              setFilterShowUp(!filterShowUp);
                            }}
                          />
                        </Tooltip>
                      </Col>
                      {deleteButton && (
                        <Col>
                          <Tooltip
                            title="Bulk delete"
                            placement="bottom"
                            showArrow
                            overlayClassName="cls-custom-tooltip"
                            color="#fff"
                          >
                            <Button
                              icon={<DeleteOutlined />}
                              className="cls-apply-btn cls-hover-expand cls-all-delete-btn"
                              size="middle"
                              onClick={() => {
                                setDeleteNotify({
                                  isDeleteNotify: true,
                                  id: selectedContacts,
                                  representingName: 'Selected contacts',
                                  deleteFunction: bulkDeleteServiceMethod
                                });
                              }}
                            />
                          </Tooltip>
                        </Col>
                      )}
                    </Row>
                  </Col>
                </Row>
                {filterShowUp && (
                  <Row className="cls-filter-ele">
                    <Col span={24}>
                      <CustomFilter
                        pathname="manage_group"
                        filters={filterValue}
                        searchProps={[
                          {
                            placeholder: 'Search group name',
                            onSearch: handleContactSearchSearch,
                            onChange: (event: any) => {
                              if (event?.target?.value) {
                                setContactSearch(event?.target?.value);
                                setFilterData((prev: any) => ({
                                  ...prev,
                                  search: event?.target?.value
                                }));
                              } else {
                                setContactSearch('');
                                setFilterData((prev: any) => ({
                                  ...prev,
                                  project: project,
                                  search: ''
                                }));
                              }
                            },
                            style: { marginTop: '3px' },
                            value: contactSearch,
                            setApiTriggerSetup: setApiTrigger
                          }
                        ]}
                      />
                    </Col>
                  </Row>
                )}

                {getContactListData.isFetching ? (
                  RenderingView === 'Card' ? (
                    <CardSkeletonElement />
                  ) : (
                    <SkeletonElement />
                  )
                ) : RenderingView === 'Table' ? (
                  <CustomTable
                    data={contactInfo?.length > 0 ? contactInfo : undefined}
                    columns={visibleColumn}
                    pathname="group_view"
                    pagination={{
                      pagination: {
                        pageSize: filterData?.page_size,
                        total: contactCount,
                        current: filterData.page
                      },
                      onChange: (config: any) => {
                        if (config.current) {
                          setFilterData((prev: any) => ({
                            ...prev,
                            project: project,
                            page: config?.current,
                            page_size: config?.pageSize
                          }));
                          setApiTrigger(true);
                        }
                      },
                      quickPage: (page: any) => {
                        console.log(Number(page));
                      }
                    }}
                    setVisibleColumn={setVisibleColumn}
                    initialColumns={columns}
                    hideableColumns={['s_no', 'actions']}
                    disabledSelected={[]}
                    selected={['s_no', 'email_id', 'status_name', 'first_name', 'company', 'country', 'created_by']}
                    enableSorting={true}
                    enableSelection={true}
                    onSelectionChange={handleSelectionChange}
                    sortableColumns={['email_id', 'first_name', 'last_name', 'company', 'phone_number', 'country']}
                    showColumnsCount={7}
                  />
                ) : (
                  <CardView
                    data={contactInfo?.length > 0 ? contactInfo : undefined}
                    pageSize={filterData?.page_size}
                    total={contactCount}
                    current={filterData.page}
                    project={project}
                    setFilterData={setFilterData}
                    renderActions={cardIcons}
                    setApiTrigger={setApiTrigger}
                    pathName="GroupView"
                  />
                )}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Modal
        open={modalConfig.open}
        onCancel={() => setModalConfig({ ...modalConfig, open: false })}
        footer={null}
        width={modalConfig?.title === 'Edit contact' ? 1400 : 702}
        className="cls-edit-form-section"
      >
        {modalConfig?.title == 'createContact' ? (
          <ManageGroupForm
            pathName={contactList?.contactList ? 'manageContact' : 'manageView'}
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
                if (modalConfig.title == 'Edit group details') {
                  let updatedValue = {
                    name: values?.groupName,
                    description: values?.description,
                    topic: '681e080347e451e50daa3caa',
                    project_id: project,
                    status: '681e080347e451e50daa3c8f'
                  };
                  updateContactGroup({
                    contactGroup: updatedValue,
                    id: modalConfig.id,
                    project: project
                  });
                  const valueSet = {
                    ...isUnwantedTrigger,
                    manageGroup: true
                  };

                  dispatch(setUnwantedTrigger({ value: valueSet }));
                } else {
                  values.project = project;
                  updateContactDetailGroup({
                    contactGroup: values,
                    id: modalConfig.id,
                    project: project
                  });
                }
                modalConfig.onFinish(values);
                setModalConfig({ ...modalConfig, open: false });
              }}
            />
          )
        )}
      </Modal>
      {getContactuploadHistoryStatus?.isSuccess &&
        (getContactuploadHistoryStatus?.data?.response?.data?.results).length > 0 && (
          <Modal
            open={uploadHistory}
            onCancel={() => {
              setUploadHistory(false);
            }}
            footer={null}
            centered
            className="cls-modal-section"
          >
            {getContactuploadHistoryStatus?.data?.response?.data.results.map((data: any, index: any) => (
              <GroupDetailShow
                key={data.id || index}
                responseData={data}
                manageGroup={undefined}
                groupDetails={undefined}
                index={index}
                manageGroupLength={(getContactuploadHistoryStatus?.data?.response?.data.results).length}
                count={getContactuploadHistoryStatus?.data?.response?.data?.count}
                description={groupViewData?.description}
                status_name={groupViewData?.status_name}
                topic={groupViewData?.topic}
                pathName="GroupView"
              />
            ))}
          </Modal>
        )}
      {deleteNotify.isDeleteNotify && (
        <DeleteNotification
          serviceMethod={deleteNotify.deleteFunction}
          deletingData={deleteNotify}
          setDeleteNotify={(value: boolean) => setDeleteNotify((prev: any) => ({ ...prev, isDeleteNotify: value }))}
        />
      )}
    </>
  );
};

export default ContactEdit;
