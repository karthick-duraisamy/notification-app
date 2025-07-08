import { Button, Col, notification, Radio, Row, Space, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import './CampaignList.scss';
import { useTranslation } from 'react-i18next';
import { CalendarOutlined, ClockCircleOutlined, PlusCircleFilled, TableOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/App.hook';
import { useDeleteCampaignMutation, useLazyGetCampaignListQuery } from '../../../../services/campaign/campaign';
import CustomProgressBar from '@/components/CustomProgressBar/CustomProgressBar';
import { dateFormat, getDateRangeByType } from '../../../../Utils/date';
import { FormTitle } from '@/components/Title/Title';
import CustomTable from '@/components/Table_V2/Table_V2';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { Status } from '@/components/Status_V2/Status';
import {
  CardDarkAnimation,
  CardlightAnimation,
  FilterIconAnimation,
  TabledarkAnimation,
  TablelightAnimation
} from '@/components/AnimationsExport/AnimationsExport';
import { UTCConvertion } from '@/Utils/commonFunction';
import CustomFilter from '@/components/CustomFilter_V2/CustomFilter';
import { useSelector } from 'react-redux';
import DynamicTableCell from '@/components/DynamicTableCell/DynamicTableCell';
import { CustomDeleteIcon, CustomViewEyeIcon, CustomViewIcon } from '@/components/Icons/Icons';
import DeleteNotification from '@/components/DeleteNotification_V2/DeleteNotification';
// import { Status } from '@/components/Status/Status';
import { useDispatch } from 'react-redux';
import { setCampaignId, setDataView } from '@/stores/TemplateProject.store';
import { CardSkeletonElement, SkeletonElement } from '@/components/SkeletonElement/SkeletonElement';
import CardView from '@/components/CardView_V3/CardView';

interface CampaignEditProps {
  campaignList?: any;
}

const Campaign: React.FC<CampaignEditProps> = (campaignList) => {
  const { t } = useTranslation();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [progressType, setProgressType] = useState<string>('both');
  const { project, isTimezoneConversion } = useAppSelector(
    (state: { TemplateProjectReducer: any }) => state.TemplateProjectReducer
  );
  const [campaignSearch] = useState<string | undefined>(undefined);

  let [listCount, setListCount] = useState(5);

  // The following method is used to render the card icons
  const cardIcons = (group: { name: any; campaign_id: string }) => (
    <>
      <Tooltip title="View" placement="bottom" overlayClassName="cls-custom-tooltip" color="#fff">
        <span className="cls-view cls-icons" onClick={() => groupNavigate(group.name, group.campaign_id)}>
          <CustomViewEyeIcon />
        </span>
      </Tooltip>
      <Tooltip title="Delete" placement="bottom" overlayClassName="cls-custom-tooltip" color="#fff">
        <span
          className="cls-delete cls-icons"
          onClick={() => {
            setDeleteNotify({ isDeleteNotify: true, id: group?.campaign_id, representingName: group?.name });
            dispath(setCampaignId({ value: group?.campaign_id }));
          }}
        >
          <CustomDeleteIcon />
        </span>
      </Tooltip>
    </>
  );

  // to navigate and store the id
  const groupNavigate = (name: any, campaign_id: string) => {
    navigate(`${pathname}/view/${name}`);
    dispath(setCampaignId({ value: campaign_id }));
    sessionStorage.setItem('groupId', campaign_id);
  };

  // For default filteration Data.
  const defaultFilterData = {
    project: project !== undefined && project !== null ? Number(project) : undefined,
    page: 1,
    page_size: 6,
    search: undefined
  };
  const [filterData, setFilterData] = useState<any>(defaultFilterData);

  // The following line is used to define the service name and th
  const [getCampaign, getCampaignList] = useLazyGetCampaignListQuery();
  const [SelectedView, setSelectedView] = useState<string>('Table');
  const DataViews = useSelector((state: any) => state.TemplateProjectReducer.dataViews); // Update selector
  const viewFromStore = DataViews?.Campaign;
  const RenderingView = viewFromStore || SelectedView;
  const [filterProps, setFilterProps] = useState<any>([]);
  const [filterShowUp, setFilterShowUp] = useState(false);
  const [apiTrigger, setApiTrigger] = useState<boolean | undefined>();
  const showCreatedAt = useSelector((state: any) => state.TemplateProjectReducer.showCreatedAt);
  const [deleteNotify, setDeleteNotify] = useState({
    isDeleteNotify: false,
    id: '',
    representingName: ''
  });

  // To get the Date range specifications.
  const [isCustomDateFilter, setIsCustomDateFilter] = useState<boolean>(false);
  const [isCreatedDateFilter, setIsCreatedDateFilter] = useState<boolean>(false);

  useEffect(() => {
    project !== undefined && project !== null && getCampaign({ project: project });
  }, []);

  useEffect(() => {
    project !== undefined && project !== null && getCampaign({ project: project });
  }, [project]);

  useEffect(() => {
    setListCount((getCampaignList as any)?.data?.response?.data?.count);
    console.log((getCampaignList as any)?.data?.response?.data?.results);
  }, [getCampaignList]);

  // The following method is triggered when user click the create manage group button
  const createCampaign = () => {
    navigate(`${pathname}/create`);
    console.log('create manage group button clicked');
  };

  // From Manage Group page to showing the Data.
  useEffect(() => {
    if (campaignList?.campaignList) {
      tableData = campaignList?.campaignList?.map((item: any) => {
        return {
          ...item,
          create_date: dateFormat(item.created_at, 'date'),
          create_time: dateFormat(item.created_at),
          updated_at: dateFormat(item?.updated_at, 'date'),
          updated_by: item.updated_by
        };
      });
      totalCount = campaignList?.campaignList?.length;
    }
  }, [campaignList, filterData]);

  // The following method is triggered when search icon is clicked to filter the group name
  const handleGroupNameSearch = () => {
    setFilterData((prev: any) => ({
      ...prev,
      project: project,
      search: campaignSearch
    }));
  };

  let tableData, totalCount;
  tableData = (getCampaignList as any)?.data?.response?.data?.results?.map((item: any) => {
    return {
      ...item,
      create_date: dateFormat(item.created_at, 'date'),
      create_time: dateFormat(item.created_at),
      updated_at: dateFormat(item?.updated_at, 'date'),
      updated_by: item.updated_by
    };
  });
  totalCount = (getCampaignList as any)?.data?.response?.data?.count;

  // to navigate and store the id
  const viewNavigate = (name: any, campaign_id: any) => {
    dispatch(setCampaignId({ value: campaign_id }));
    navigate(`${pathname}/view/${name}`);
  };
  // to force re-render the table
  const [renderKey, setRenderKey] = useState(0);

  // to updaate the progress type and render
  const handleProgressTypeChange = (type: string) => {
    setProgressType(type);
    setRenderKey((prev) => prev + 1);
  };

  // Fixed columns to render the table
  const columns: TableProps<DefaultRecordType>['columns'] = [
    {
      title: 'ID',
      key: 'campaign_id',
      render: (_text: any, data: DefaultRecordType, _index: number) => (
        <span className="cls-view-link" onClick={() => viewNavigate(data?.name, data?.campaign_id)}>
          #{data.campaign_id.slice(-4)}
        </span>
      )
    },
    {
      title: 'CAMPAIGN NAME',
      key: 'name',
      width: '15%',
      render: (data: DefaultRecordType) => (
        <span className="cls-group-name" onClick={() => viewNavigate(data?.name, data?.campaign_id)}>
          {data?.name}
        </span>
      )
    },
    {
      title: 'SUBJECT',
      key: 'subject',
      width: '25%',
      render: (data: DefaultRecordType) => (
        <DynamicTableCell
          data={data}
          title="SUBJECT"
          key="subject"
          width="350px"
          descriptionKey="subject"
          buttons={[
            {
              icon: <CustomViewIcon />,
              onClick: () => {
                navigate(`${pathname}/view/${data?.name}`);
                dispatch(setCampaignId({ value: data?.campaign_id }));
              },
              className: 'cls-view-icon'
            },
            {
              icon: <CustomDeleteIcon />,
              onClick: () => {
                setDeleteNotify({ isDeleteNotify: true, id: data?.campaign_id, representingName: data?.name });
              },
              className: 'cls-delete-icon'
            }
          ]}
          className="cls-description-cell"
        />
      )
    },
    {
      title: 'SENT',
      key: 'sent',
      render: (data: DefaultRecordType) => <span>{data?.sent}</span>
    },
    {
      title: 'DELIVERED',
      key: 'delivered',
      width: '10%',
      render: (data: DefaultRecordType) => (
        <CustomProgressBar status={data?.delivered} fullValue={data?.sent} type={progressType} field="delivered" />
      )
    },
    {
      title: 'OPENED',
      key: 'opened',
      width: '10%',
      render: (data: DefaultRecordType) => (
        <CustomProgressBar status={data?.opened} fullValue={data?.sent} type={progressType} field="opened" />
      )
    },
    {
      title: 'CLICKED',
      key: 'clicked',
      width: '10%',
      render: (data: DefaultRecordType) => (
        <CustomProgressBar status={data?.clicked} fullValue={data?.sent} type={progressType} field="clicked" />
      )
    },
    {
      title: 'CREATED BY',
      key: 'created_by',
      className: 'cls-multiple-item',
      render: (data: DefaultRecordType) => (
        <Space direction="vertical" size={4}>
          <span>{data.created_by}</span>
          {showCreatedAt['campaign_list'] && (
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
      key: 'status_name',
      render: (data: DefaultRecordType) => <Status name={data?.status_name} pathName="campaign" />
    }
  ];

  /* Table custom column functionality */
  const [visibleColumn, setVisibleColumn] = useState(columns);

  // To handle the Date Range Change
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

  // To set the Filterations.
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

  // Get the selected rows and keys from the table
  const handleSelectionChange = (selectedKeys: React.Key[], selectedRows: any[]) => {
    console.log('Selected:', selectedKeys, selectedRows);
  };

  // To change the Date Picker
  useEffect(() => {
    if (filterShowUp) setFilterProps(filterValue);
  }, [isCustomDateFilter, isCreatedDateFilter]);

  // To trigger the Filter ans Seacrh Api
  useEffect(() => {
    if (apiTrigger === false) {
      setApiTrigger(undefined);
      setFilterData(defaultFilterData);
      getCampaign(defaultFilterData);
    } else if (apiTrigger !== undefined) {
      setApiTrigger(undefined);
      getCampaign(filterData);
    }
  }, [filterData, apiTrigger]);

  // To showing the created at data in created by column
  useEffect(() => {
    const updatedColumns = [...(columns || [])];
    setVisibleColumn(updatedColumns);
  }, [showCreatedAt]);

  // Delete service method
  const [deleteCampaign] = useDeleteCampaignMutation();
  const deleteServiceMethod = async (campaign_id: any) => {
    try {
      await deleteCampaign({ id: campaign_id, project }).unwrap();
      notification.success({ message: `${deleteNotify?.representingName} Campaign deleted successfully` });
      getCampaign({ project: project });
    } catch (error: any) {
      console.error('Delete failed', error);
      return Promise.reject(error?.data?.response?.errors?.pk);
    }
  };

  // The following functions is to listen teh hovering event on the button to switch the view
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTableHovered, setIsTableHovered] = useState(false);

  return (
    <>
      <Row className="cls-campaign cls-common-style">
        <Col span={24}>
          {/* The following set of code is used implementing the header element */}
          <Row className="cls-header-ele cls-border-bottom">
            <Col span={15} className="cls-align-center">
              <FormTitle title={t('campaign')} clsName="normal" />
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button
                onClick={createCampaign}
                type="primary"
                size="middle"
                className="cls-primary-button"
                icon={<PlusCircleFilled />}
              >
                {t('campaign_create')}
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
                      onClick={() => {
                        setSelectedView('Table');
                        dispath(setDataView({ key: 'Campaign', value: 'Table' }));
                      }}
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
                      onClick={() => {
                        setSelectedView('Card');
                        dispath(setDataView({ key: 'Campaign', value: 'Card' }));
                      }}
                    >
                      {isCardHovered ? <CardlightAnimation /> : <CardDarkAnimation />}
                    </Button>
                  </Tooltip>
                )}
              </Row>
            </Col>
            <Col className="cls-custom-filter-btn">
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
            </Col>
          </Row>

          {filterShowUp && (
            <Row className="cls-filter-ele" justify={'space-between'}>
              <Col span={21}>
                <CustomFilter
                  pathname="campaign_list"
                  filters={filterProps}
                  searchProps={[
                    {
                      placeholder: 'Search campaign name',
                      onSearch: handleGroupNameSearch,
                      onChange: (event: any) => {
                        const val = event?.target?.value;
                        if (val) {
                          setFilterData((prev: any) => ({
                            ...prev,
                            project: project,
                            name: val
                          }));
                        } else {
                          setFilterData((prev: any) => ({
                            ...prev,
                            project: project,
                            name: ''
                          }));
                        }
                      },
                      style: { marginTop: '3px' },
                      setApiTriggerSetup: setApiTrigger
                    }
                  ]}
                />
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <Radio.Group
                  className="cls-percentage-type"
                  onChange={(e) => handleProgressTypeChange(e.target.value)}
                  defaultValue="both"
                >
                  <Tooltip title="Show percentage" placement="bottom" color="#000000d9">
                    <Radio.Button value="percent">%</Radio.Button>
                  </Tooltip>
                  <Tooltip title="Show count" color="#000000d9" placement="bottom">
                    <Radio.Button value="value">#</Radio.Button>
                  </Tooltip>
                  <Tooltip title="Show both" color="#000000d9" placement="bottom">
                    <Radio.Button value="both">
                      <TableOutlined />
                    </Radio.Button>
                  </Tooltip>
                </Radio.Group>
              </Col>
            </Row>
          )}

          <Row>
            <Col span={24} className="cls-campaign-table">
              {getCampaignList?.isFetching ? (
                RenderingView === 'Card' ? (
                  <CardSkeletonElement />
                ) : (
                  <SkeletonElement />
                )
              ) : (
                <>
                  {RenderingView === 'Table' ? (
                    <CustomTable
                      key={renderKey}
                      data={tableData?.length > 0 ? tableData : undefined}
                      columns={visibleColumn}
                      pathname="campaign_list"
                      pagination={{
                        pagination: {
                          pageSize: filterData?.page_size,
                          total: totalCount,
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
                      hideableColumns={['campaign_id', 'actions']}
                      disabledSelected={[]}
                      selected={[
                        'campaign_id',
                        'name',
                        'subject',
                        'status_name',
                        'sent',
                        'delivered',
                        'opened',
                        'clicked',
                        'created_by'
                      ]}
                      enableSorting={true}
                      enableSelection={false}
                      onSelectionChange={handleSelectionChange}
                      sortableColumns={['name', 'subject', 'created_by']}
                      showColumnsCount={9}
                    />
                  ) : (
                    <CardView
                      data={tableData}
                      groupnavigate={groupNavigate}
                      pageSize={filterData?.page_size}
                      total={listCount}
                      current={filterData.page}
                      project={project}
                      setFilterData={setFilterData}
                      renderActions={cardIcons}
                      setApiTrigger={setApiTrigger}
                      pathName="Campaign"
                    />
                  )}
                </>
              )}
            </Col>
          </Row>
          {deleteNotify.isDeleteNotify && (
            <DeleteNotification
              serviceMethod={deleteServiceMethod}
              deletingData={deleteNotify}
              setDeleteNotify={(value: boolean) => setDeleteNotify((prev) => ({ ...prev, isDeleteNotify: value }))}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Campaign;
