import { Button, Col, Input, Radio, Row, Space, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import './CampaignList.scss';
import { useTranslation } from 'react-i18next';
import { PlusCircleFilled, SearchOutlined, TableOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/App.hook';
import { useLazyGetCampaignListQuery } from '../../../../services/campaign/campaign';
import CustomProgressBar from '@/components/CustomProgressBar/CustomProgressBar';
import Table from '@/components/Table/Table';
import { DeleteNotification } from '@/components/DeleteNotification/DeleteNotification';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';
import { useDeleteVariableMutation, useUpdateVariableStatusMutation } from '../../../../services/variables/Variable';
import { dateFormat } from '../../../../Utils/date';
import { FormTitle } from '@/components/Title/Title';
import { Status } from '@/components/Status/Status';

const Campaign = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [progressType, setProgressType] = useState<string>('percent');
  const { project } = useAppSelector((state: { TemplateProjectReducer: any }) => state.TemplateProjectReducer);
  const [campaignSearch, setCampaignSearch] = useState<string | undefined>(undefined);
  const [filterData, setFilterData] = useState<any>({
    project: project !== undefined && project !== null ? Number(project) : undefined,
    page: 1,
    page_size: 6,
    search: undefined
  });

  // The following line is used to define the service name and th
  const [getCampaign, getCampaignList] = useLazyGetCampaignListQuery();

  //To Fetch the filtered data
  useEffect(() => {
    getCampaign(filterData);
  }, [filterData]);

  useEffect(() => {
    project !== undefined && project !== null && getCampaign({ project: project });
  }, []);

  useEffect(() => {
    project !== undefined && project !== null && getCampaign({ project: project });
  }, [project]);

  useEffect(() => {
    console.log((getCampaignList as any)?.data?.response?.data?.results);
  }, [getCampaignList]);

  // The following method is triggered when user click the create manage group button
  const createCampaign = () => {
    navigate(`${pathname}/create`);
  };

  // const filterProps = [
  //   {
  //     label: 'Topic',
  //     labelKey: 'topic',
  //     data: [
  //       { id: 0, value: 'Marketing' },
  //       { id: 1, value: 'Non-Marketing' }
  //     ],
  //     handler: (id: number) => {
  //       console.log(id);
  //     }
  //   }
  // ];

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
  const viewNavigate = (name: any) => {
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
  const columns: TableProps<any>['columns'] = [
    {
      title: 'S.No',
      key: 's_no',
      width: '7%',
      render: (_text: any, record: any) => {
        return record.series_no || '';
      }
    },
    {
      title: 'Campaign Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      render: (name) => (
        <>
          <span className="cls-group-name" onClick={() => viewNavigate(name)}>
            {name}
          </span>
        </>
      )
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: '15%',
      render: (subject) => <span>{subject}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status_name',
      key: 'status_name',
      width: '10%',
      render: (status) => <Status name={status} />
    },
    {
      title: 'Sent',
      dataIndex: 'sent',
      key: 'sent'
    },
    {
      title: 'Delivered',
      dataIndex: 'delivered',
      key: 'delivered',
      render: (value, record) => (
        <CustomProgressBar status={value} fullValue={record.sent} type={progressType} field="delivered" />
      )
    },
    {
      title: 'Opened',
      dataIndex: 'opened',
      key: 'opened',
      render: (value, record) => (
        <CustomProgressBar status={value} fullValue={record.sent} type={progressType} field="opened" />
      )
    },
    {
      title: 'Clicked',
      dataIndex: 'clicked',
      key: 'clicked',
      render: (value, record) => (
        <CustomProgressBar status={value} fullValue={record.sent} type={progressType} field="clicked" />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => <ActionMenu referId={record.project_id} data={record} />
    }
  ];

  //To render the Action tooltip
  const ActionMenu = ({ referId, data }: any) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [updateStatus] = useUpdateVariableStatusMutation();
    const [deleteVariable] = useDeleteVariableMutation();
    const deleteServiceMethod = (id: number) => {
      deleteVariable(id);
    };
    const actions = [
      {
        name: 'View campaign',
        handler: async () => {
          navigate(`${pathname}/view/${data?.group_name}`);
        }
      },
      {
        name: `Set as ${data.status === 0 || null ? 'Active' : 'In-Active'}`,
        handler: async (id: number) => {
          updateStatus({ status: data.status === 1 ? 2 : 1, variable_id: id });
        }
      },
      {
        name: 'Delete',
        handler: async (settingId: any) => {
          const project_id = typeof settingId === 'number' ? settingId.toString() : settingId;
          const props = {
            serviceMethod: deleteServiceMethod,
            id: project_id
          };
          DeleteNotification(props);
        }
      }
    ];
    return <ActionDropDown referenceId={referId} actions={actions} />;
  };

  /* Table custom column functionality */
  const [visibleColumn, setVisibleColumn] = useState(columns);

  return (
    <>
      <Row className="cls-campaign">
        <Col span={24}>
          {/* The following set of code is used implementing the header element */}
          <Row className="cls-header-ele">
            <Col span={20}>
              <FormTitle title={t('campaign')} subTitle={t('campaign_subtitle')} clsName="normal" />
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button onClick={createCampaign} type="primary" size="middle" icon={<PlusCircleFilled />}>
                {t('campaign_create')}
              </Button>
            </Col>
          </Row>

          <Row className="cls-filter-ele">
            <Col span={20}>
              <Space size={25} align="start">
                <Input
                  suffix={<SearchOutlined style={{ color: '#666' }} onClick={handleGroupNameSearch} />}
                  placeholder={t('search_campaign_name')}
                  allowClear
                  onChange={(event: any) => {
                    if (event?.target?.value) {
                      setCampaignSearch(event?.target?.value);
                    } else {
                      setCampaignSearch('');
                      setFilterData((prev: any) => ({
                        ...prev,
                        project: project,
                        search: undefined
                      }));
                    }
                  }}
                />
              </Space>
              {/* <CustomFilter pathname="manage_group" filters={filterProps} /> */}
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Radio.Group
                className="cls-percentage-type"
                onChange={(e) => handleProgressTypeChange(e.target.value)}
                defaultValue="percent"
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

          <Row>
            <Col span={24} className="cls-campaign-table">
              <Table
                key={renderKey}
                data={tableData?.length > 0 ? tableData : undefined}
                columns={visibleColumn}
                pagination={{
                  pagination: {
                    pageSize: filterData?.page_size,
                    total: totalCount,
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
                  }
                }}
                setVisibleColumn={setVisibleColumn}
                initialColumns={columns}
                hideableColumns={[
                  's_no',
                  'actions',
                  'campaign_id',
                  'created_at',
                  'created_by',
                  'is_parent',
                  'child_campaigns'
                ]}
                disabledSelected={[]}
                selected={[
                  'expand',
                  's_no',
                  'name',
                  'subject',
                  'description',
                  'status_name',
                  'sent',
                  'delivered',
                  'opened',
                  'clicked',
                  'actions'
                ]}
                page={'Campaign'}
                pathname="group"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Campaign;
