import { Col, Row, Button, Typography, Card, Badge, Timeline, Table, Tabs } from 'antd';
import type { TabsProps, TableProps } from 'antd';
import {
  CheckCircleFilled,
  DownloadOutlined,
  CopyOutlined,
  SendOutlined,
  MailOutlined,
  ThunderboltOutlined,
  LineChartOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ReloadOutlined,
  ClockCircleOutlined,
  TableOutlined,
  LinkOutlined,
  CloseCircleOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
// import './ViewCampaign.scss';
import './ViewCampaign.scss';
import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useState } from 'react';
import { BounceStatistics, OpensByLocation, ReplyStatistics } from '@/components/ViewCampaignElements/ViewCampaignElements';


const { Title, Text } = Typography;

const ViewCampaign = () => {
  // const [activeTab, setActiveTab] = useState('1');

  let campaignDetails = {
    name: 'Summer Sale 2023 - Americas',
    campaign_id: '6818695071c05d94b8804503',
    subject: 'Get 30% off on all products!',
    status: 'Sent',
    created_at: '2025-05-12T07:00:00.000000Z',
    created_by: 'admin@grmapi.com'
  };

  let summaryDetails = {
    sent: 400,
    delivered: 380,
    delivery_rate: '95%',
    bounce: 20,
    bounce_rate: '5%',
    opened: 130,
    open_rate: '34.21%',
    unopened: 250,
    clicked: 15,
    click_rate: '3.95%',
    unsubscribe: 2,
    unsubscribe_rate: '0.53%',
    reject: 5,
    reject_rate: '1.32%',
    complaint: 1,
    complaint_rate: '0.26%'
  };

  const summaryCards = [
    {
      title: 'Total Sent',
      value: summaryDetails.sent.toLocaleString(),
      description: 'Last 30 days',
      icon: <SendOutlined style={{ color: '#4c63ff' }} />,
      className: 'summary-card sent-card'
    },
    {
      title: 'Open Rate',
      value: summaryDetails.open_rate,
      description: 'Industry avg. 21.5%',
      icon: <MailOutlined style={{ color: '#00c67b' }} />,
      className: 'summary-card open-card'
    },
    {
      title: 'Click Rate',
      value: summaryDetails.click_rate,
      description: 'Industry avg. 7.8%',
      icon: <ThunderboltOutlined style={{ color: '#b300ff' }} />,
      className: 'summary-card click-card'
    },
    {
      title: 'Conversion',
      value: '5.8%',
      description: '+2.1% vs last month',
      icon: <LineChartOutlined style={{ color: '#ffa100' }} />,
      className: 'summary-card conversion-card'
    }
  ];

  const senderDetails = {
    sender_name: 'Thayanidhi SK',
    sender_address: 'thayanidhi.sk@infinitisoftware.net',
    reply_tracking: 'Enabled',
    forward_to_address: 'thayanidhi.sk@infinitisoftware.net',
    content_type: 'HTML',
    created_at: '2025-05-12T07:00:00.000000Z',
    r_template: 10 //similartoeditandresendorresendtemplateshowingflow
  };

  const timelineData = [
    {
      group: '2025-05-12T07:00:00Z',
      count: 18,
      unique_count: 17,
      repeat_count: 1
    },
    {
      group: '2025-05-12T08:00:00Z',
      count: 42,
      unique_count: 40,
      repeat_count: 2
    },
    {
      group: '2025-05-12T09:00:00Z',
      count: 77,
      unique_count: 70,
      repeat_count: 7
    },
    {
      group: '2025-05-12T10:00:00Z',
      count: 202,
      unique_count: 185,
      repeat_count: 17
    },
    {
      group: '2025-05-12T11:00:00Z',
      count: 326,
      unique_count: 300,
      repeat_count: 26
    },
    {
      group: '2025-05-12T12:00:00Z',
      count: 130,
      unique_count: 120,
      repeat_count: 10
    },
    {
      group: '2025-05-12T13:00:00Z',
      count: 95,
      unique_count: 90,
      repeat_count: 5
    },
    {
      group: '2025-05-12T14:00:00Z',
      count: 80,
      unique_count: 75,
      repeat_count: 5
    },
    {
      group: '2025-05-12T15:00:00Z',
      count: 65,
      unique_count: 60,
      repeat_count: 5
    },
    {
      group: '2025-05-12T16:00:00Z',
      count: 50,
      unique_count: 45,
      repeat_count: 5
    },
    {
      group: '2025-05-12T17:00:00Z',
      count: 40,
      unique_count: 38,
      repeat_count: 2
    },
    {
      group: '2025-05-12T18:00:00Z',
      count: 30,
      unique_count: 28,
      repeat_count: 2
    }
  ];

  const campaignTimeline = [
    { label: 'Scheduled', date: '2025-05-13 18:00:00' },
    { label: 'Delivery Started', date: '2025-05-14 08:00:00' },
    { label: 'Delivery Completed', date: '2025-05-14 08:15:32' },
    { label: 'First Open', date: '2025-05-14 08:17:45' },
    { label: 'Last Open', date: '2025-05-14 17:45:12' }
  ];

  const linkClicks = [
    { name: 'Spring Sale', value: 523 },
    { name: 'New Products', value: 312 },
    { name: 'Discount Code', value: 245 },
    { name: 'Reviews', value: 98 },
    { name: 'Contact Us', value: 67 }
  ];

  const replyStats = {
    total_reply: 12,
    reply_rate: '3.16%',
    reply_types: {
      auto_reply: 5,
      personal_reply: 7
    }
  };

  const openLocations = [
    { country: 'US', opens: 80 },
    { country: 'CA', opens: 25 },
    { country: 'BR', opens: 15 },
    { country: 'MX', opens: 10 }
  ];

  const bounceStats = {
    total_bounce: 20,
    bounce_rate: '5%',
    bounce_types: {
      hard_bounce: 15,
      soft_bounce: 5
    },
    bounce_reasons: [
      { reason: 'Invalid email', count: 10 },
      { reason: 'Mailbox full', count: 5 },
      { reason: 'Blocked', count: 3 },
      { reason: 'Other', count: 2 }
    ]
  };

  const totalOpens = timelineData.reduce((acc, cur) => acc + cur.count, 0);

  const formattedData = timelineData.map((item) => ({
    ...item,
    hour: dayjs(item.group).format('HH:mm')
  }));
  const totalClicks = linkClicks.reduce((acc, cur) => acc + cur.value, 0);


  const clickColumns = [
    {
      title: 'Link URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
    },
    {
      title: 'Click Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
  ];

  const clickData = [
    {
      key: '1',
      url: 'https://company.com/spring-sale',
      clicks: 523,
      rate: '42.01%',
    },
    {
      key: '2',
      url: 'https://company.com/new-products',
      clicks: 312,
      rate: '25.06%',
    },
    {
      key: '3',
      url: 'https://company.com/discount-code',
      clicks: 245,
      rate: '19.68%',
    },
    {
      key: '4',
      url: 'https://company.com/customer-reviews',
      clicks: 98,
      rate: '7.87%',
    },
    {
      key: '5',
      url: 'https://company.com/contact-us',
      clicks: 67,
      rate: '5.38%',
    },
  ];

  // Bounce Details Data
  const bounceColumns = [
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  const bounceData = [
    {
      key: '1',
      reason: 'Invalid email address',
      type: 'Hard Bounce',
      count: 78,
    },
    {
      key: '2',
      reason: 'Mailbox full',
      type: 'Soft Bounce',
      count: 32,
    },
    {
      key: '3',
      reason: 'Domain not found',
      type: 'Hard Bounce',
      count: 21,
    },
    {
      key: '4',
      reason: 'Temporary server error',
      type: 'Soft Bounce',
      count: 12,
    },
    {
      key: '5',
      reason: 'Blocked by recipient',
      type: 'Hard Bounce',
      count: 7,
    },
  ];

  // Location Details Data
  const locationColumns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Opens',
      dataIndex: 'opens',
      key: 'opens',
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
    },
  ];

  const locationData = [
    {
      key: '1',
      country: 'United States',
      opens: 1845,
      percentage: '53.93%',
    },
    {
      key: '2',
      country: 'United Kingdom',
      opens: 524,
      percentage: '15.32%',
    },
    {
      key: '3',
      country: 'Canada',
      opens: 412,
      percentage: '12.04%',
    },
    {
      key: '4',
      country: 'Australia',
      opens: 287,
      percentage: '8.39%',
    },
    {
      key: '5',
      country: 'Germany',
      opens: 198,
      percentage: '5.79%',
    },
    {
      key: '6',
      country: 'Others',
      opens: 155,
      percentage: '4.53%',
    },
  ];
  const [columns, setColumns] = useState<TableProps<any>['columns']>(clickColumns);
  const [data, setData] = useState<any>(clickData);

  const onChange = (key: string) => {
    switch (key) {
      case '1':
        setColumns(clickColumns);
        setData(clickData);
        break;
      case '2':
        setColumns(bounceColumns);
        setData(bounceData);
        break;
      case '3':
        setColumns(locationColumns);
        setData(locationData);
        break;
      default:
        setColumns(clickColumns);
        setData(clickData);
    }
    // setActiveTab(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          <LinkOutlined style={{ marginRight: 8 }} />
          Click Details
        </span>
      )
    },
    {
      key: '2',
      label: (
        <span>
          <CloseCircleOutlined style={{ marginRight: 8 }} />
          Bounce Details
        </span>
      )
    },
    {
      key: '3',
      label: (
        <span>
          <GlobalOutlined style={{ marginRight: 8 }} />
          Location Details
        </span>
      )
    },
  ];

  return (
    <>
      <Row className="cls-campaign-view">
        <Col span={24}>
          <div className="cls-campaign-details">
            <Row justify="space-between" align="middle">
              <Col>
                <div className="title-wrapper">
                  <Title level={2} className="campaign-title">
                    {campaignDetails.name}
                  </Title>
                  {campaignDetails.status === 'Sent' && (
                    <span className="status-tag">
                      <CheckCircleFilled style={{ color: 'green', marginRight: 4 }} />
                      <Text strong>Sent</Text>
                    </span>
                  )}
                </div>
                <Text type="secondary" className="campaign-id">
                  Campaign ID: {campaignDetails.campaign_id}
                </Text>
                <div className="subject-text">
                  <Text strong>Subject:</Text> <Text strong>{campaignDetails.subject}</Text>
                </div>
                <div className="created-info">
                  <span className="dot" />
                  Created on {dayjs(campaignDetails.created_at).format('YYYY-MM-DD HH:mm:ss')} by{' '}
                  {campaignDetails.created_by}
                </div>
              </Col>
              <Col>
                <Row gutter={12} >
                  <Col>
                    <Button type="primary" icon={<CopyOutlined className='cls-copy-icon' />} className="purple-btn cls-duplicate-export-btn">
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
          </div>

          <Row className="cls-campaign-body">
            <Col span={24}>
              <Row gutter={[16, 16]} className="cls-summary-details">
                {summaryCards.map((card, index) => (
                  <Col xs={24} sm={12} md={6} key={index}>
                    <Card className={card.className} bordered={false}>
                      <div className="summary-header">
                        <Text type="secondary">{card.title}</Text>
                        <span className="summary-icon">{card.icon}</span>
                      </div>
                      <Title level={3} className="summary-value">
                        {card.value}
                      </Title>
                      <Text type="secondary" className="summary-desc">
                        {card.description}
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row justify={'space-between'} style={{ marginBottom: "30px" }}>
                {/* Sender Information */}
                <Col span={8} className="cls-sender-info">
                  <Card
                    title={
                      <Text strong>
                        <UserOutlined style={{ color: '#722ed1', marginRight: 8 }} /> Sender Information
                      </Text>
                    }
                    bordered={false} style={{ borderRadius: 12 }}
                  >
                    <div className='cls-sender-info-detail'>
                      <Text className='cls-sender-info-label'>Sender Name </Text>
                      <br />
                      <Text>{senderDetails.sender_name}</Text>
                    </div>
                    <div className='cls-sender-info-detail'>
                      <Text className='cls-sender-info-label'>Sender Address </Text>
                      <br />
                      <Text>{senderDetails.sender_address}</Text>
                    </div>
                    <div className='cls-sender-info-detail'>
                      <Text className='cls-sender-info-label'>Content Type </Text>
                      <br />
                      <Text>{senderDetails.content_type}</Text>
                    </div>
                    <hr className='cls-detail-divider' />
                    <div className='cls-sender-info-detail'>
                      <Text className='cls-sender-info-label'>Reply Tracking </Text>
                      <p>
                        <CheckCircleOutlined /> {senderDetails.reply_tracking}
                      </p>
                    </div>
                    <div className='cls-sender-info-detail'>
                      <Text className='cls-sender-info-label'>Forward To Address </Text>
                      <br />
                      <Text>{senderDetails.forward_to_address}</Text>
                    </div>
                    <Button type="primary" icon={<ReloadOutlined />} block>
                      Resend Using Template
                    </Button>
                  </Card>
                </Col>

                {/* Time zone information */}
                <Col span={16} className="cls-time-line">
                  <Card bordered={false} style={{ borderRadius: 12 }}>
                    <Row
                      className='cls-time-line-header'
                    >
                      <Col span={2} style={{ border: "1px solid" }}>
                        <ClockCircleOutlined />
                      </Col>
                      <Col span={16}>
                        <Title level={3} style={{ margin: 0 }}>
                          Email Opens Timeline
                        </Title>
                        <Text type="secondary">Hourly distribution of email opens</Text>
                      </Col>
                      <Col span={5}>
                        <Badge
                          count={`${totalOpens.toLocaleString()} Total Opens`}
                        />
                      </Col>
                    </Row>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#722ed1" strokeWidth={3} dot={{ r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
              <Row className='cls-Timeline-analysis'>
                <Col span={8} className='cls-campaign-timeline'>
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
                          dot={
                            <div className='cls-timeline-head'
                              style={{
                                backgroundColor: index === campaignTimeline.length - 1 ? '#d9d9d9' : '#2563EB',
                              }}
                            >
                              {index + 1}
                            </div>
                          }
                        >
                          <Text strong>{item.label}</Text>
                          <br />
                          <Text type="secondary">{item.date}</Text>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Card>
                </Col>
                <Col span={16} className='cls-link-analysis'>
                  <Card
                    bordered={false}
                    className='cls-analysis-card'
                    title={
                      <Row>
                        <span className='cls-arrow-icon'>
                          <ClockCircleOutlined />
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
                      <Badge
                        count={`${totalClicks.toLocaleString()} Total Clicks`}
                      />
                    }
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={linkClicks}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#00aa6f" radius={[4, 4, 0, 0]}>
                          <LabelList dataKey="value" position="top" style={{ fill: '#000' }} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
              <Row className='cls-charts'>
                <Col span={8} className='cls-ReplyStatistics'>
                  <ReplyStatistics {...replyStats} />
                </Col>
                <Col span={8} className='cls-OpensByLocation'>
                  <OpensByLocation data={openLocations} />
                </Col>
                <Col span={8} className='cls-BounceStatistics'>
                  <BounceStatistics {...bounceStats} />
                </Col>
              </Row>
              <Row>
                <Col span={24} className='cls-Statistics'>
                  <Card
                    title={
                      <Text strong>
                        <TableOutlined /> Detailed Statistics
                      </Text>
                    }>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col >
      </Row >
    </>
  );
};

export default ViewCampaign;
