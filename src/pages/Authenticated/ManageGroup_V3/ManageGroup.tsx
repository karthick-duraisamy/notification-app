import { Button, Col, Modal, notification, Row, Space, TableProps, Tooltip } from 'antd';
import './ManageGroup.scss';
import { useTranslation } from 'react-i18next';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import CustomFilter from '../../../components/CustomFilter_V2/CustomFilter';
import { dateFormat, getDateRangeByType } from '@/Utils/date';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteNotification from '@/components/DeleteNotification_V3/DeleteNotification';
import {
  useDeleteContactGroupMutation,
  useLazyGetContactGroupMasterQuery,
  useLazyGetcontactUploadHistoryQuery,
  useLazyGetGroupsListQuery,
  useUpdateGroupStatusMutation,
  useLazyGetSummaryQuery,
  useDeleteContactGroupConcernMutation,
  useLazyGetContactListQuery
} from '@/services/contacts/groups/Group';
import { useAppSelector } from '@/hooks/App.hook';
import { SkeletonElement, CardSkeletonElement } from '@/components/SkeletonElement/SkeletonElement';
import GroupDetailShow from '@/components/GroupDetailShow/GroupDetailShow';
import { useDispatch, useSelector } from 'react-redux';
import { setActionId, setUnwantedTrigger, setDataView } from '@/stores/TemplateProject.store';
import CustomTable from '@/components/Table_V2/Table_V2';
import ContactAvatars from '@/components/ContactAvatar/ContactAvatars';
import {
  CreateIconAnimation,
  FilterIconAnimation,
  TablelightAnimation,
  TabledarkAnimation,
  CardDarkAnimation,
  CardlightAnimation
} from '@/components/AnimationsExport/AnimationsExport';
import TileCards from '../../../components/TileCards_V3/TileCards';
import CardView from '../../../components/CardView_V3/CardView';
import { FormTitle } from '../../../components/Title/Title';
import { Status } from '../../../components/Status_V2/Status';
import { CustomViewIcon, CustomDeleteIcon, CustomEditIcon, CustomViewEyeIcon } from '@/components/Icons/Icons';
import DynamicTableCell from '@/components/DynamicTableCell/DynamicTableCell';
import ManageGroupForm from './ManageGroupForm/ManageGroupForm';
import ContactEdit from './ManageGroupForm/GroupView/GroupView';
import PeriodFilter from '@/components/PeriodFilter/PeriodFilter';
import { UTCConvertion } from '@/Utils/commonFunction';

const ManageGroup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispath = useDispatch();
  // The following line is used to get the project value form store.
  const { project, isTimezoneConversion, isUnwantedTrigger } = useAppSelector((state) => state.TemplateProjectReducer);
  // Add this default filter data at the top level
  const defaultFilterData = {
    topic: undefined,
    project: project !== undefined && project !== null ? Number(project) : undefined,
    page: 1,
    page_size: 6
  };
  const [getSummary, SummaryInfo]: any = useLazyGetSummaryQuery();
  // The following line is used to set the filter option for the group list
  const [filterData, setFilterData] = useState<any>(defaultFilterData);
  const [groupSearch, setGroupSearch] = useState<string | undefined>(undefined);
  // The following service call is made to get the master info response
  const [getMaterInfo, getMaterInfoStatus] = useLazyGetContactGroupMasterQuery();
  // The following line is used to define the service name and their respective value for getting group list
  const [getGroups, getGroupsData] = useLazyGetGroupsListQuery();

  // The following service call is made to get the upload history response
  const [_getContactuploadHistory, getContactuploadHistoryStatus]: any = useLazyGetcontactUploadHistoryQuery();
  // to open the history modal
  const [openModal, setOpenModal] = useState(false);
  //Updates the Status
  const [_updateGroupStatus, getUpdateGroupStatus] = useUpdateGroupStatusMutation();

  const [filterProps, setFilterProps] = useState<any>([]);
  const [filterShowUp, setFilterShowUp] = useState(false);
  const [apiTrigger, setApiTrigger] = useState<boolean | undefined>();
  const showCreatedAt = useSelector((state: any) => state.TemplateProjectReducer.showCreatedAt);
  const [deleteContactGroup] = useDeleteContactGroupMutation();
  const [deleteContactGroupConcern] = useDeleteContactGroupConcernMutation();
  const [deleteNotify, setDeleteNotify] = useState({
    isDeleteNotify: false,
    id: '',
    name: ''
  });
  const [modalvisible, setModalVisible] = useState(false);
  const [SelectedView, setSelectedView] = useState<string>('Table');
  const DataViews = useSelector((state: any) => state.TemplateProjectReducer.dataViews); // Update selector
  const viewFromStore = DataViews?.manageGroup;
  const RenderingView = viewFromStore || SelectedView;
  const [dateFilter, setDateFilter] = useState<string>('this_month');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('this_month');
  const [selectTile, setSelectedTile] = useState<any>({
    tile: 'groups_summary'
  });
  const [getContactList, getContactListData] = useLazyGetContactListQuery();
  const [updatedFilterData, setLastUpdatedFilter] = useState<any>(defaultFilterData);

  // Add this state to track the current active tile
  const [activeTile, setActiveTile] = useState<string>('');

  // The following useEffect is triggered at initial render to get the group list info.
  useEffect(() => {
    dispath(
      setUnwantedTrigger({
        value: {
          ...isUnwantedTrigger,
          manageGroup: isUnwantedTrigger?.manageGroup === undefined ? true : isUnwantedTrigger?.manageGroup
        }
      })
    );
    setSummaryData(isUnwantedTrigger?.manageGroupData?.summary || undefined);
    setListData(isUnwantedTrigger?.manageGroupData?.groupsData || undefined);
    setListCount(isUnwantedTrigger?.manageGroupData?.groupsCount || 0);
    setTopicLabels(isUnwantedTrigger?.manageGroupData?.masterInfoLebel || undefined);
  }, []);

  // To set the FIltered data in Date specific (Overall)
  useEffect(() => {
    if (SummaryInfo?.isSuccess) {
      setSummaryData(SummaryInfo.data.response.data);
      dispath(
        setUnwantedTrigger({
          value: {
            ...isUnwantedTrigger,
            manageGroupData: {
              ...isUnwantedTrigger?.manageGroupData,
              summary: SummaryInfo?.data?.response?.data
            }
          }
        })
      );
    }
  }, [SummaryInfo]);

  // To call the filter trigger by Api
  useEffect(() => {
    if (project !== undefined && project !== null && isUnwantedTrigger?.manageGroup) {
      getSummary({ project: project, date: dateFilter });
    }
  }, [dateFilter]);

  // The following useEffect is triggered when modification is made in project value
  useEffect(() => {
    if (project !== undefined && project !== null && isUnwantedTrigger?.manageGroup === true) {
      const filterValues = handleDateRangeChange(dateFilter);
      getSummary(filterValues);
      getGroups(filterValues);
      getMaterInfo({ project: project });
      setFilterData((prev: any) => ({
        ...prev,
        ...filterValues
      }));

      setLastUpdatedFilter(filterValues);
    }
  }, [project, isUnwantedTrigger?.manageGroup]);

  //After the Status updation to Success message.
  useEffect(() => {
    if (getUpdateGroupStatus?.isSuccess) notification.success({ message: `Status updated successfully` });
  }, [getUpdateGroupStatus?.isSuccess]);

  // The following useEffect is triggered when change the filter options or pagination
  useEffect(() => {
    if (apiTrigger === false) {
      setApiTrigger(undefined);
      getSummary({ project: project, date: dateFilter });
      if (selectTile.tile === 'groups_summary') getGroups(updatedFilterData);
      else if (selectTile.tile === 'contacts_summary') getContactList(updatedFilterData);
    } else if (apiTrigger !== undefined) {
      setApiTrigger(undefined);
      if (selectTile.tile === 'groups_summary') getGroups(filterData);
      else if (selectTile.tile === 'contacts_summary') getContactList(filterData);
    }
  }, [filterData, apiTrigger]);

  // The following state value to set the group list info and passed to table component
  let [listData, setListData] = useState(undefined);
  // The following state value to set the group list count and passed to table component
  let [listCount, setListCount] = useState(undefined);
  let [summaryData, setSummaryData] = useState<any>(undefined);

  // The following useEffect is triggered to get the group list success or failure response.
  useEffect(() => {
    if (getGroupsData?.isSuccess) {
      let { results } = (getGroupsData as any)?.data?.response?.data;
      let tableData = results.map((item: any) => {
        return {
          ...(item || undefined),
          status_name: item?.status_name,
          create_date: item?.created_at ? dateFormat(item.created_at, 'date') : undefined,
          create_time: item?.created_at ? dateFormat(item.created_at) : undefined,
          updated_at: item?.updated_at ? dateFormat(item.updated_at, 'date') : undefined,
          updated_by: item?.updated_by
        };
      });

      //If response have count of group detail, that time only set's the table's data.
      // To check the Store value to minimize the APi trigger.
      if ((getGroupsData as any)?.data?.response?.data?.count != 0) {
        setListData(tableData);
        setListCount((getGroupsData as any)?.data?.response?.data?.count);
        dispath(
          setUnwantedTrigger({
            value: {
              ...isUnwantedTrigger,
              manageGroupData: {
                ...isUnwantedTrigger?.manageGroupData,
                groupsData: tableData,
                groupsCount: (getGroupsData as any)?.data?.response?.data?.count
              }
            }
          })
        );
      } else setListData(undefined);
    }
  }, [getGroupsData]);

  // The following method is triggered when user click the create manage group button
  const createManageGroup = () => {
    // navigate(`${pathname}/create`);
    setModalVisible(true);
  };

  // to navigate and store the id
  const groupNavigate = (group_name: any, group_id: string) => {
    navigate(`${pathname}/view/${group_name}`);
    dispath(setActionId({ value: group_id }));
    sessionStorage.setItem('groupId', group_id);
  };

  // Add these states at the top of your component
  const [isCustomDateFilter, setIsCustomDateFilter] = useState<boolean>(false);
  const [isCreatedDateFilter, setIsCreatedDateFilter] = useState<boolean>(false);

  // To handle the date range change
  const handleDateRangeChange = (value: string) => {
    setIsCustomDateFilter(value === 'custom');
    setIsCreatedDateFilter(value === 'created_at');

    let filterValues = {
      project,
      created_at: undefined,
      created_start_date: undefined as any,
      created_end_date: undefined as any
    };

    if (value === 'custom') {
      return filterValues;
    }

    if (value === 'select_date') {
      return filterValues;
    }

    const { startingDate, endingDate, singleDate } = getDateRangeByType(value, isTimezoneConversion);

    if (singleDate) {
      filterValues = {
        ...filterValues,
        created_at: isTimezoneConversion ? UTCConvertion(singleDate, 'start') : singleDate?.toLocaleDateString('en-CA')
      };
    }

    if (startingDate && endingDate) {
      filterValues = {
        ...filterValues,
        created_start_date: isTimezoneConversion ? undefined : startingDate,
        created_end_date: isTimezoneConversion ? undefined : endingDate
      };
    }
    setFilterData((prev: any) => ({
      ...prev,
      ...filterValues
    }));

    return filterValues;
  };

  const filterValue = [
    {
      label: 'Topic',
      labelKey: 'topic',
      data:
        (isUnwantedTrigger?.manageGroupData?.masterInfoTopics || getMaterInfoStatus?.isSuccess) &&
        (getMaterInfoStatus as any)?.data?.response?.data?.topic
          ? (getMaterInfoStatus as any)?.data?.response?.data?.topic
          : isUnwantedTrigger?.manageGroupData?.masterInfoTopics
          ? isUnwantedTrigger?.manageGroupData?.masterInfoTopics
          : [],
      handler: (id: number) => {
        setFilterData((prev: any) => ({
          ...prev,
          project: project,
          r_topic: id
        }));
      }
    },
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

  useEffect(() => {
    if (filterShowUp) setFilterProps(filterValue);
  }, [isCustomDateFilter, isCreatedDateFilter]);

  useEffect(() => {
    if (getMaterInfoStatus?.isSuccess) {
      const topicData = (getMaterInfoStatus as any)?.data?.response?.data?.topic || [];
      if (topicData.length > 0) {
        setFilterProps([
          {
            label: 'Topic',
            labelKey: 'topic',
            data: topicData,
            handler: (id: number) => {
              setFilterData((prev: any) => ({
                ...prev,
                project: project,
                r_topic: id
              }));
            }
          }
        ]);
      }
    }
  }, [getMaterInfoStatus?.isSuccess]);

  // The following method is triggered when search icon is clicked to filter the group name
  const handleGroupNameSearch = () => {
    setFilterData((prev: any) => ({
      ...prev,
      project: project,
      name: groupSearch
    }));
  };

  //To showing the created at data in created by column
  useEffect(() => {
    const updatedColumns = [...(columns || [])];
    setVisibleColumn(updatedColumns);
  }, [showCreatedAt]);

  const columns: TableProps<DefaultRecordType>['columns'] = [
    {
      title: 'ID',
      key: 'group_id',
      render: (_text: any, data: DefaultRecordType, _index: number) => {
        // Calculate the serial number based on current page and page size
        // const serialNo = ((filterData.page as number) - 1) * (filterData.page_size as number) + (index + 1);
        return (
          <>
            <span className="cls-view-link" onClick={() => groupNavigate(data?.group_name, data?.group_id)}>
              #{data.group_id.slice(-4)}
            </span>
          </>
        );
      }
    },
    {
      title: 'GROUP NAME',
      key: 'group_name',
      render: (data: DefaultRecordType) => (
        <>
          <span className="cls-view-link" onClick={() => groupNavigate(data?.group_name, data?.group_id)}>
            {data?.group_name}
          </span>
        </>
      )
    },
    {
      title: 'DESCRIPTION',
      key: 'description',
      width: '350px',
      render: (data: DefaultRecordType) => (
        <DynamicTableCell
          data={data}
          title="DESCRIPTION"
          key="description"
          width="350px"
          descriptionKey="description"
          buttons={[
            {
              icon: <CustomViewIcon />,
              onClick: () => groupNavigate(data?.group_name, data?.group_id),
              className: 'cls-view-icon'
            },
            {
              icon: <CustomEditIcon />,
              onClick: () => groupNavigate(data?.group_name, data?.group_id),
              className: 'cls-edit-icon'
            },
            {
              icon: <CustomDeleteIcon />,
              onClick: () => {
                setDeleteNotify({ isDeleteNotify: true, id: data?.group_id, name: data?.group_name });
                dispath(setActionId({ value: data?.group_id }));
              },
              className: 'cls-delete-icon'
            }
          ]}
          className="cls-description-cell"
        />
      )
    },
    {
      title: 'TOPIC',
      key: 'topic',
      render: (data: DefaultRecordType) => (
        <Status name={data?.topic || ''} allStatus={topicLabels} pathName="campaign" />
      )
    },
    {
      title: 'CONTACT COUNT',
      key: 'contact_count',
      render: (data: DefaultRecordType) => <ContactAvatars count={data.contact_count} />
    },
    {
      title: 'CREATED BY',
      key: 'created_by',
      className: 'cls-multiple-item',
      render: (data: DefaultRecordType) => (
        <Space direction="vertical" size={4}>
          <span>{data.created_by}</span>
          {showCreatedAt['manage_group'] && (
            <Space size={12} className="cls-date-time">
              <Space size={4}>
                <CalendarOutlined />
                <span>{dateFormat(data.created_at, 'date')}</span>
              </Space>
              <Space size={4}>
                <ClockCircleOutlined />
                <span>{dateFormat(data.created_at, 'time')}</span>
              </Space>
            </Space>
          )}
        </Space>
      )
    },
    {
      title: 'STATUS',
      dataIndex: 'status_name',
      key: 'status_name',
      className: 'cls-variable-status',
      render: (status: string) => <Status name={status} pathName="campaign" />
    }
  ];

  //Delete service method
  const deleteServiceMethod = async (group_id: any, options?: { forceDeletion?: boolean }) => {
    try {
      if (options?.forceDeletion) {
        await deleteContactGroupConcern({
          id: group_id,
          project
        }).unwrap();
        notification.success({
          message: `${deleteNotify.name} Group and associated contacts deleted successfully`,
          placement: 'topRight'
        });
      } else {
        await deleteContactGroup({
          id: group_id,
          project
        }).unwrap();
        notification.success({
          message: `${deleteNotify.name} Group deleted successfully`,
          placement: 'topRight'
        });
      }

      // Refresh groups list
      getGroups(updatedFilterData);
    } catch (error: any) {
      return Promise.reject(
        error?.data?.response?.errors?.error || error?.data?.response?.errors?.pk || 'Failed to delete group'
      );
    }
  };

  /* Table custom column functionality */
  const [visibleColumn, setVisibleColumn] = useState(columns);

  // Contact history is not there means showing the notification.
  useEffect(() => {
    if (getContactuploadHistoryStatus?.isSuccess) {
      const results = getContactuploadHistoryStatus?.data?.response?.data?.results;

      if (results && results.length > 0) {
        const totalCount = results[0].total_count;

        if (totalCount > 0) {
          setOpenModal(true);
        } else {
          notification.info({
            message: 'No contact upload history available for this group',
            placement: 'topRight'
          });
        }
      }
    }
  }, [getContactuploadHistoryStatus]);

  // Get the selected rows and keys from the table
  const handleSelectionChange = (selectedKeys: React.Key[], selectedRows: any[]) => {
    console.log('Selected:', selectedKeys, selectedRows);
  };

  // Add this at the top level of the component
  const [topicLabels, setTopicLabels] = useState<string[]>([]);

  // Add this useEffect to extract labels when master info is loaded
  useEffect(() => {
    if (getMaterInfoStatus?.isSuccess) {
      const topics = (getMaterInfoStatus as any)?.data?.response?.data?.topic || [];
      const labels = topics.map((topic: any) => topic.label);
      setTopicLabels(labels);
      // To set the Store of Topics.
      dispath(
        setUnwantedTrigger({
          value: {
            ...isUnwantedTrigger,
            manageGroupData: {
              ...isUnwantedTrigger?.manageGroupData,
              masterInfoLebel: labels,
              masterInfoTopics: topics
            }
          }
        })
      );
    }
  }, [getMaterInfoStatus?.isSuccess]);

  // The following useEffect is triggered when selectTile changes
  useEffect(() => {
    if (selectTile?.tile && selectTile.tile !== activeTile) {
      switch (selectTile.tile) {
        case 'contacts_summary':
          getContactList(updatedFilterData);
          break;
        case 'campaigns_summary':
          navigate('/campaign');
          break;
      }
      setActiveTile(selectTile.tile);
    }
  }, [selectTile?.tile]);

  // The following method is used to render the card icons
  const cardIcons = (group: { group_name: any; group_id: string }) => (
    <>
      <Tooltip title="View" placement="bottom" overlayClassName="cls-custom-tooltip" color="#fff">
        <span className="cls-view cls-icons" onClick={() => groupNavigate(group.group_name, group.group_id)}>
          <CustomViewEyeIcon />
        </span>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom" overlayClassName="cls-custom-tooltip" color="#fff">
        <span className="cls-edit cls-icons">
          <CustomEditIcon />
        </span>
      </Tooltip>
      <Tooltip title="Delete" placement="bottom" overlayClassName="cls-custom-tooltip" color="#fff">
        <span
          className="cls-delete cls-icons"
          onClick={() => {
            setDeleteNotify({ isDeleteNotify: true, id: group?.group_id, name: group?.group_name });
            dispath(setActionId({ value: group?.group_id }));
          }}
        >
          <CustomDeleteIcon />
        </span>
      </Tooltip>
    </>
  );
  const cardTable = (value: any) => {
    setSelectedView(value);
    dispath(setDataView({ key: 'manageGroup', value: value }));
  };

  // The following function is to filter based on range of week month
  const filterHandler = (value: any) => {
    dispath(
      setUnwantedTrigger({
        value: {
          ...isUnwantedTrigger,
          ManageGroup: true
        }
      })
    );
    setDateFilter(value);
    setSelectedPeriod(value);
    let filterValues = handleDateRangeChange(value);
    setLastUpdatedFilter(filterValues);
    setFilterData(defaultFilterData);
    setApiTrigger(false);
  };

  // The following functions is to listen teh hovering event on the button to switch the view
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTableHovered, setIsTableHovered] = useState(false);

  return (
    <>
      <Row justify="space-between" align="middle" gutter={[0, 24]}>
        <Col flex="auto">
          <h2>{t(`manage_${selectTile?.tile?.split('_')[0].replace(/s$/, '')}`)}</h2>
        </Col>
        <Col>
          <PeriodFilter filterHandler={filterHandler} />
        </Col>
      </Row>
      <Row gutter={16} className="cls-tile-ele">
        {SummaryInfo?.isFetching ? (
          <CardSkeletonElement pathname="/manage-group" />
        ) : (
          summaryData && (
            <TileCards
              data={summaryData}
              setSelectedTile={setSelectedTile}
              selectTile={selectTile}
              selectedPeriod={selectedPeriod}
            />
          )
        )}
      </Row>
      {(selectTile.tile === 'groups_summary' || selectTile.tile === 'campaigns_summary') && (
        <Row className="cls-manage-group cls-common-style">
          <Col span={24}>
            {/* The following set of code is used implementing the header element */}
            <Row className="cls-header-ele cls-border-bottom">
              <Col span={15} className="cls-align-center">
                <FormTitle title={t(`manage_${selectTile?.tile?.split('_')[0].replace(/s$/, '')}`)} clsName="normal" />
              </Col>
              <Col span={4} style={{ marginRight: '5px' }}>
                <Button
                  onClick={createManageGroup}
                  type="primary"
                  size="middle"
                  icon={<CreateIconAnimation />}
                  className="cls-primary-button"
                >
                  <span className="cls-button-text">Create group</span>
                </Button>
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
                        onMouseEnter={() => setIsCardHovered(true)}
                        onMouseLeave={() => setIsCardHovered(false)}
                        type="primary"
                        onClick={() => cardTable('Card')}
                      >
                        {isCardHovered ? <CardlightAnimation /> : <CardDarkAnimation />}
                      </Button>
                    </Tooltip>
                  )}
                </Row>
              </Col>
              <Col className="cls-custom-filter-btn">
                <Tooltip title="Filter" placement="bottom" showArrow overlayClassName="cls-custom-tooltip" color="#fff">
                  <Button
                    icon={<FilterIconAnimation />}
                    className="cls-apply-btn cls-hover-expand"
                    size="middle"
                    onClick={() => {
                      setFilterProps(filterValue);
                      setFilterShowUp(!filterShowUp);
                    }}
                  >
                    {/* <span className="cls-button-text">Filters</span> */}
                  </Button>
                </Tooltip>
              </Col>
            </Row>

            {filterShowUp && (
              <Row className="cls-filter-ele cls-border-bottom" justify={'space-between'}>
                <Col span={24}>
                  <CustomFilter
                    pathname="manage_group"
                    filters={filterProps}
                    searchProps={[
                      {
                        placeholder: 'Search group name',
                        onSearch: handleGroupNameSearch,
                        onChange: (event: any) => {
                          const val = event?.target?.value;
                          if (val) {
                            // setGroupSearch(val);
                            setFilterData((prev: any) => ({
                              ...prev,
                              project: project,
                              name: val
                            }));
                          } else {
                            setGroupSearch('');
                            setFilterData((prev: any) => ({
                              ...prev,
                              project: project,
                              name: ''
                            }));
                          }
                        },
                        style: { marginTop: '3px' },
                        value: groupSearch,
                        setApiTriggerSetup: setApiTrigger
                      }
                    ]}
                  />
                </Col>
              </Row>
            )}
            {getGroupsData.isFetching ? (
              RenderingView === 'Card' ? (
                <CardSkeletonElement />
              ) : (
                <SkeletonElement />
              )
            ) : (
              <Row>
                <Col span={24} className="cls-group-table">
                  {RenderingView === 'Table' ? (
                    <CustomTable
                      data={listData}
                      columns={visibleColumn}
                      pathname="manage_group"
                      pagination={{
                        pagination: {
                          pageSize: filterData?.page_size,
                          total: listCount,
                          current: filterData.page
                        },
                        onChange: (config) => {
                          setFilterData((prev: any) => ({
                            ...prev,
                            page: config?.current,
                            page_size: config?.pageSize,
                            project: project
                          }));
                          setApiTrigger(true);
                        }
                      }}
                      setVisibleColumn={setVisibleColumn}
                      initialColumns={columns}
                      hideableColumns={['s_no', 'actions']}
                      disabledSelected={[]}
                      selected={[
                        'group_id',
                        'group_name',
                        'description',
                        'topic',
                        'contact_count',
                        'status_name',
                        'created_by',
                        'actions'
                      ]}
                      enableSorting={true}
                      enableSelection={false}
                      onSelectionChange={handleSelectionChange}
                      sortableColumns={['group_name', 'description', 'contact_count', 'created_by']}
                      showColumnsCount={7}
                    />
                  ) : (
                    <CardView
                      data={listData}
                      groupnavigate={groupNavigate}
                      pageSize={filterData?.page_size}
                      total={listCount}
                      current={filterData.page}
                      project={project}
                      setFilterData={setFilterData}
                      renderActions={cardIcons}
                      setApiTrigger={setApiTrigger}
                      pathName="Contact"
                    />
                  )}
                </Col>
              </Row>
            )}
          </Col>
          {getContactuploadHistoryStatus?.isSuccess &&
            (getContactuploadHistoryStatus?.data?.response?.data?.results).length > 0 &&
            getContactuploadHistoryStatus?.data?.response?.data?.results?.[0].total_count > 0 && (
              <Modal
                open={openModal}
                onCancel={() => {
                  setOpenModal(false);
                }}
                footer={null}
                centered
                className="cls-modal-section"
              >
                {getContactuploadHistoryStatus?.data?.response?.data.results.map((data: any, index: any) => (
                  <GroupDetailShow
                    manageGroup={data}
                    responseData={undefined}
                    groupDetails={undefined}
                    index={index}
                    manageGroupLength={(getContactuploadHistoryStatus?.data?.response?.data.results).length}
                    count={getContactuploadHistoryStatus?.data?.response?.data?.count}
                  />
                ))}
              </Modal>
            )}
          {deleteNotify.isDeleteNotify && (
            <DeleteNotification
              serviceMethod={deleteServiceMethod}
              deletingData={{
                id: deleteNotify.id,
                isDeleteNotify: deleteNotify.isDeleteNotify,
                representingName: deleteNotify.name,
                concernConfig: {
                  message: 'Delete all associated contacts',
                  warningText: 'This will permanently delete the mapped contacts'
                }
              }}
              setDeleteNotify={(value: boolean) => setDeleteNotify((prev) => ({ ...prev, isDeleteNotify: value }))}
            />
          )}
        </Row>
      )}
      {selectTile.tile === 'contacts_summary' && getContactListData?.isSuccess && (
        <ContactEdit contactList={(getContactListData as any)?.data?.response?.data} />
      )}
      <Modal open={modalvisible} onCancel={() => setModalVisible(false)} footer={null} style={{ width: 800 }}>
        <ManageGroupForm pathName={''} groupData={undefined} closeModal={() => setModalVisible(false)} />
      </Modal>
    </>
  );
};

export default ManageGroup;
