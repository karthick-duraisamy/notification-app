import { useAppSelector } from '@/hooks/App.hook';
import {
  useLazyGetCampaignViewQuery,
  useLazyGetUniqueOpensQuery,
  useLazyGetUniqueClicksQuery
} from '../../../../services/campaign/campaign';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Empty, Row, Timeline, Typography } from 'antd';
import { Bar, BarChart, LabelList, Tooltip } from 'recharts';
import {
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CopyOutlined,
  DownloadOutlined,
  MailOutlined,
  ReloadOutlined,
  SendOutlined,
  ThunderboltOutlined,
  UserOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './ViewCampaign.scss';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts';
import { formatDateTime } from '@/Utils/date';
import { CursorIcon, EmailIcon } from '@/components/Icons/Icons';
import { useNavigate } from 'react-router-dom';
import { FormLayout } from '@/layouts/Form/Form';
import CustomTable from '@/components/Table_V2/Table_V2';
import { ClickOpenSkeleton } from '@/components/SkeletonElement/SkeletonElement';
import { useDispatch } from 'react-redux';
import { setUnwantedTrigger } from '@/stores/TemplateProject.store';
const { Title, Text } = Typography;

type DefaultRecordType = {
  contact_id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
};

const ViewCampaign = () => {
  const navigate = useNavigate();
  const { campaignid } = useAppSelector((state) => state.TemplateProjectReducer);
  const { project, isUnwantedTrigger } = useAppSelector(
    (state: { TemplateProjectReducer: any }) => state.TemplateProjectReducer
  );
  const [getCampaignView, getCampaignviewInfo]: any = useLazyGetCampaignViewQuery();
  const [UniqueOpens, uniqueOpenInfo]: any = useLazyGetUniqueOpensQuery();
  const [UniqueClicks, uniqueClickInfo]: any = useLazyGetUniqueClicksQuery();
  const [opentableData, setOpenTableData] = useState<DefaultRecordType[]>([]);
  const [clicktableData, setClickTableData] = useState<DefaultRecordType[]>([]);
  const [openUnique, setOpenUnique] = useState(false);
  const [clickUnique, setClickUnique] = useState(false);
  const [clickCount, setclickCount] = useState<any>();
  const [openCount, setopenCount] = useState<any>();
  const dispatch = useDispatch();

  // The following line is used to set the filter option for the group list
  const defaultFilterData = {
    project: project !== undefined && project !== null ? Number(project) : undefined,
    campaign_id: campaignid,
    page: 1,
    page_size: 1
  };
  const [clickfilterData, setClickFilterData] = useState<any>(defaultFilterData);
  const [openfilterData, setOpenFilterData] = useState<any>(defaultFilterData);

  // To filter pagination on upon clicking unique click badge
  useEffect(() => {
    UniqueClicks({
      id: campaignid,
      project,
      page: clickfilterData.page,
      page_size: clickfilterData.page_size
    });
  }, [clickfilterData]);

  // To filter pagination on upon clicking unique open badge
  useEffect(() => {
    UniqueOpens({
      id: campaignid,
      project,
      page: openfilterData.page,
      page_size: openfilterData.page_size
    });
  }, [openfilterData]);

  // To fetch the data upon rendering the page
  useEffect(() => {
    if (campaignid) {
      getCampaignView({ id: campaignid, project });
    } else {
      navigate('/campaign');
    }
    dispatch(
      setUnwantedTrigger({
        value: {
          ...isUnwantedTrigger,
          manageGroup: true
        }
      })
    );
  }, []);

  const CampaignData: any = getCampaignviewInfo?.data?.response?.data || {};
  const summaryDetails: any = getCampaignviewInfo?.data?.response?.data?.summary_details || {};

  const timelineData: any = getCampaignviewInfo?.data?.response?.data?.timeline || {};

  const opentimeline =
    getCampaignviewInfo?.data?.response?.data?.campaign_statistics?.open_statistics?.hourly_opens || [];
  const linkClicks =
    getCampaignviewInfo?.data?.response?.data?.campaign_statistics?.click_statistics?.hourly_clicks || [];
  const UniqueOpensValue =
    getCampaignviewInfo?.data?.response?.data?.campaign_statistics?.open_statistics?.unique_open || [];

  const totalClicks = linkClicks.reduce((acc: any, cur: any) => acc + cur.value, 0);
  const totalOpens = opentimeline.reduce((acc: any, cur: any) => acc + cur.count, 0);

  // The following function is to format the data to render in chart
  const formattedData = (value: any) => {
    return value.map((item: any) => {
      const startTime = item.group?.split(' to ')[0]; // Get the start time
      return {
        ...item,
        hour: dayjs(startTime).format('HH:mm')
      };
    });
  };

  // To render cards for the summary details
  const summaryCards = [
    {
      title: 'Total Sent',
      value: summaryDetails.sent,
      icon: <SendOutlined style={{ color: '#4c63ff' }} />,
      className: 'summary-card sent-card'
    },
    {
      title: 'Opened',
      value: summaryDetails.opened,
      percentage: summaryDetails.open_rate,
      icon: <MailOutlined style={{ color: '#00c67b' }} />,
      className: 'summary-card open-card'
    },
    {
      title: 'Clicked',
      value: summaryDetails.clicked,
      percentage: summaryDetails.click_rate,
      icon: <ThunderboltOutlined style={{ color: '#b300ff' }} />,
      className: 'summary-card click-card'
    },
    {
      title: 'Delivered',
      value: summaryDetails.delivered,
      percentage: summaryDetails.delivery_rate,
      icon: <ThunderboltOutlined style={{ color: '#b300ff' }} />,
      className: 'summary-card click-card'
    },
    {
      title: 'Bounce',
      value: summaryDetails.bounce,
      percentage: summaryDetails.bounce_rate,
      icon: <ThunderboltOutlined style={{ color: '#b300ff' }} />,
      className: 'summary-card click-card'
    },
    {
      title: 'Reject',
      value: summaryDetails.reject,
      percentage: summaryDetails.reject_rate,
      icon: <ThunderboltOutlined style={{ color: '#b300ff' }} />,
      className: 'summary-card click-card'
    },
    {
      title: 'Complaint',
      value: summaryDetails.complaint,
      percentage: summaryDetails.complaint_rate,
      icon: <ThunderboltOutlined style={{ color: '#b300ff' }} />,
      className: 'summary-card click-card'
    },
    {
      title: 'Unsubscribe',
      value: summaryDetails.unsubscribe,
      percentage: summaryDetails.unsubscribe_rate,
      icon: <ThunderboltOutlined style={{ color: '#b300ff' }} />,
      className: 'summary-card click-card'
    }
  ];

  // To format the data which is suitable for timeline element
  const campaignTimeline = Object.entries(timelineData).map(([key, value]) => {
    const label = key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      label,
      date: value ? formatDateTime(value as any) : 'Pending',
      isPending: value === null
    };
  });

  // To format the columns to render the table
  const columns: any[] = [
    {
      title: 'ID',
      key: 'contact_id',
      render: (_text: any, data: DefaultRecordType, _index: number) => (
        <span className="cls-view-link">#{data?.contact_id.slice(-4)}</span>
      )
    },
    {
      title: 'FIRST NAME',
      key: 'first_name',
      render: (_value: any, data: DefaultRecordType) => <span>{data?.first_name ? data?.first_name : '-'}</span>
    },
    {
      title: 'LAST NAME',
      key: 'last_name',
      render: (_value: any, data: DefaultRecordType) => <span>{data?.last_name ? data?.last_name : '-'}</span>
    },
    {
      title: 'EMAIL',
      key: 'email',
      render: (_value: any, data: DefaultRecordType) => <span>{data?.email}</span>
    }
  ];

  /* Table custom column functionality */
  const [visibleColumn, setVisibleColumn] = useState<any[]>(columns);

  // The following function is called upon clicking the badge to fetch api data
  const Uniquecall = (value: string) => {
    if (value === 'opens') {
      setOpenUnique(true);
      UniqueOpens({
        id: campaignid,
        project,
        page: openfilterData.page,
        page_size: openfilterData.page_size
      });
    } else if (value === 'clicks') {
      setClickUnique(true);
      UniqueClicks({
        id: campaignid,
        project,
        page: clickfilterData.page,
        page_size: clickfilterData.page_size
      });
    }
  };

  // To set the table data and count for the unique opens
  useEffect(() => {
    if (uniqueOpenInfo.isSuccess && uniqueOpenInfo.data?.response?.data?.results?.length > 0) {
      setOpenTableData(uniqueOpenInfo.data.response.data.results);
      setopenCount(uniqueOpenInfo.data.response.data.count);
    }
  }, [uniqueOpenInfo.isSuccess, uniqueOpenInfo.data]);

  // To set the table data and count for the unique clicks
  useEffect(() => {
    if (uniqueClickInfo.isSuccess && uniqueClickInfo.data?.response?.data?.results?.length > 0) {
      setClickTableData(uniqueClickInfo.data.response.data.results);
      setclickCount(uniqueClickInfo.data.response.data.count);
    }
  }, [uniqueClickInfo.isSuccess, uniqueClickInfo.data]);

  return (
    <FormLayout title={'View Campaign'}>
      <Row className="cls-campaign-view">
        <Col span={24}>
          <Row className="cls-campaign-details">
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col span={16}>
                  <Row className="title-wrapper">
                    <Title level={2} className="campaign-title">
                      {CampaignData.name}
                    </Title>
                    <span className="status-tag">
                      {['Active', 'Completed'].includes(CampaignData.status_name) ? (
                        <CheckCircleFilled className="cls-active" />
                      ) : CampaignData.status_name === 'InActive' ? (
                        <CloseCircleOutlined className="cls-inactive" />
                      ) : (
                        <p className="cls-other-status" />
                      )}
                      <Text strong> {CampaignData.status_name}</Text>
                    </span>
                  </Row>
                  <Text type="secondary" className="campaign-id">
                    Campaign ID: {CampaignData.campaign_id}
                  </Text>
                  <div className="subject-text">
                    <Text strong>Subject:</Text> <Text strong>{CampaignData.subject}</Text>
                  </div>
                  <div className="created-info">
                    <span className="dot" />
                    Created on {dayjs(CampaignData.created_at).format('YYYY-MM-DD HH:mm:ss')} by{' '}
                    {CampaignData.created_by}
                  </div>
                </Col>
                <Col span={8}>
                  <Row gutter={12}>
                    <Col>
                      <Button
                        type="primary"
                        icon={<CopyOutlined className="cls-copy-icon" />}
                        className="purple-btn cls-duplicate-export-btn"
                      >
                        Duplicate Campaign
                      </Button>
                    </Col>
                    <Col>
                      <Button icon={<DownloadOutlined />} className="white-btn cls-duplicate-export-btn">
                        Export Report
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="cls-campaign-body">
            <Col span={24}>
              <Row gutter={[16, 16]} className="cls-summary-details">
                {summaryCards.map((card: any, index: number) => (
                  <Col xs={24} sm={12} md={6} key={index}>
                    <Card className={card.className} bordered={false}>
                      <div className="summary-header">
                        <Text type="secondary">{card.title}</Text>
                        <span className="summary-icon">{card.icon}</span>
                      </div>
                      <Title level={3} className="summary-value">
                        {card.value}
                      </Title>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row justify={'space-between'} style={{ marginBottom: '30px' }}>
                {/* Sender Information */}
                <Col span={8} className="cls-sender-info">
                  <Card
                    title={
                      <Text strong>
                        <UserOutlined style={{ color: '#722ed1', marginRight: 8 }} /> Sender Information
                      </Text>
                    }
                    bordered={false}
                    style={{ borderRadius: 12 }}
                  >
                    {CampaignData?.sender_details &&
                      Object.entries(CampaignData.sender_details).map(([key, value]) => (
                        <div className="cls-sender-info-detail" key={key}>
                          <Text className="cls-sender-info-label">
                            {key
                              .replace(/_/g, ' ') // Replace underscores with spaces
                              .replace(/\b\w/g, (char) => char.toUpperCase())}{' '}
                            {/* Capitalize each word */}
                          </Text>
                          <br />
                          <Text>{String(value)}</Text>
                        </div>
                      ))}
                    <Button type="primary" icon={<ReloadOutlined />} block>
                      Resend Using Template
                    </Button>
                  </Card>
                </Col>

                {/* Time zone information */}
                <Col span={16} className="cls-time-line">
                  <Card bordered={false} style={{ borderRadius: 12 }}>
                    <Row className="cls-time-line-header">
                      <Col span={2}>
                        <p className="cls-mail-icon">
                          <EmailIcon />
                        </p>
                      </Col>
                      <Col span={12}>
                        <Title level={3} style={{ margin: 0 }}>
                          Email Opens Timeline
                        </Title>
                        <Text type="secondary">Hourly distribution of email opens</Text>
                      </Col>
                      <Col span={5}>
                        <span onClick={() => Uniquecall('opens')} style={{ cursor: 'pointer' }}>
                          <Badge
                            className="cls-unique-opens"
                            count={`${UniqueOpensValue.toLocaleString()} Unique Opens`}
                          />
                        </span>
                      </Col>
                      <Col span={5}>
                        <span
                          onClick={() => {
                            setOpenUnique(false);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <Badge count={`${totalOpens.toLocaleString()} Total Opens`} />
                        </span>
                      </Col>
                    </Row>
                    {openUnique ? (
                      uniqueOpenInfo.isSuccess ? (
                        <CustomTable
                          data={opentableData.length > 0 ? opentableData : undefined}
                          columns={visibleColumn}
                          pathname="campaign_list"
                          setVisibleColumn={setVisibleColumn}
                          initialColumns={columns}
                          hideableColumns={[]}
                          disabledSelected={[]}
                          selected={columns.map((col) => col.key as string)}
                          enableSorting={true}
                          enableSelection={false}
                          showColumnsCount={columns.length}
                          pagination={{
                            pagination: {
                              pageSize: openfilterData?.page_size,
                              total: openCount,
                              current: openfilterData.page
                            },
                            onChange: (config) => {
                              setOpenFilterData((prev: any) => ({
                                ...prev,
                                page: config?.current,
                                page_size: config?.pageSize,
                                project: project
                              }));
                            }
                          }}
                        />
                      ) : (
                        <ClickOpenSkeleton />
                      )
                    ) : opentimeline.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={formattedData(opentimeline)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip
                            formatter={(value: any, name: any) => [`${value}`, name === 'count' ? 'Total Opens' : name]}
                            labelFormatter={(label) => `Time: ${label}`}
                          />
                          <Line type="monotone" dataKey="count" stroke="#722ed1" strokeWidth={3} dot={{ r: 5 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <Empty />
                    )}
                  </Card>
                </Col>
              </Row>
              <Row className="cls-Timeline-analysis">
                <Col span={8} className="cls-campaign-timeline">
                  <Card
                    title={
                      <Text strong>
                        <ClockCircleOutlined /> Campaign Timeline
                      </Text>
                    }
                    bordered={false}
                    style={{ borderRadius: 12 }}
                  >
                    <Timeline mode="left">
                      {campaignTimeline.map((item, index) => (
                        <Timeline.Item
                          key={index}
                          color={item.isPending ? 'gray' : 'blue'}
                          dot={
                            <div
                              className="cls-timeline-head"
                              style={{
                                backgroundColor: item.isPending ? '#d9d9d9' : '#2563EB'
                              }}
                            >
                              {index + 1}
                            </div>
                          }
                        >
                          <Text strong>{item.label}</Text>
                          <br />
                          <Text type={item.isPending ? 'secondary' : undefined}>{item.date}</Text>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Card>
                </Col>
                <Col span={16} className="cls-link-analysis">
                  <Card
                    bordered={false}
                    className="cls-analysis-card"
                    title={
                      <Row style={{ padding: '15px 0px' }}>
                        <span className="cls-arrow-icon">
                          <CursorIcon />
                        </span>
                        <div>
                          <Row>
                            <Title level={5} style={{ margin: 0 }}>
                              Link Click Analysis
                            </Title>
                          </Row>
                          <Row>
                            <Text type="secondary">Distribution of link clicks</Text>
                          </Row>
                        </div>
                      </Row>
                    }
                    extra={
                      <>
                        <span
                          className="cls-unique-clicks"
                          onClick={() => Uniquecall('clicks')}
                          style={{ cursor: 'pointer' }}
                        >
                          <Badge count={`${totalClicks.toLocaleString()} Unique Clicks`} />
                        </span>
                        <span className="cls-unique-clicks" style={{ cursor: 'pointer' }}>
                          <Badge
                            onClick={() => setClickUnique(false)}
                            count={`${totalClicks.toLocaleString()} Total Clicks`}
                          />
                        </span>
                      </>
                    }
                  >
                    {clickUnique ? (
                      uniqueClickInfo.isSuccess ? (
                        <CustomTable
                          data={clicktableData.length > 0 ? clicktableData : undefined}
                          columns={visibleColumn}
                          pathname="campaign_list"
                          setVisibleColumn={setVisibleColumn}
                          initialColumns={columns}
                          hideableColumns={[]}
                          disabledSelected={[]}
                          selected={columns.map((col) => col.key as string)}
                          enableSorting={true}
                          enableSelection={false}
                          showColumnsCount={columns.length}
                          pagination={{
                            pagination: {
                              pageSize: clickfilterData?.page_size,
                              total: clickCount,
                              current: clickfilterData.page
                            },
                            onChange: (config) => {
                              setClickFilterData((prev: any) => ({
                                ...prev,
                                page: config?.current,
                                page_size: config?.pageSize,
                                project: project
                              }));
                            }
                          }}
                        />
                      ) : (
                        <ClickOpenSkeleton />
                      )
                    ) : linkClicks.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formattedData(linkClicks)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip
                            cursor={{ fill: 'transparent' }}
                            wrapperStyle={{
                              transition: 'none' // overrides the default
                            }}
                            contentStyle={{
                              backgroundColor: '#fff',
                              border: '1px solid #ccc'
                            }}
                          />
                          <Bar dataKey="count" fill="#00aa6f" radius={[4, 4, 0, 0]}>
                            <LabelList dataKey="count" position="top" style={{ fill: '#000' }} />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <Empty />
                    )}
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </FormLayout>
  );
};

export default ViewCampaign;
