import React from 'react';
import { Card, Statistic, Row, Col, Typography } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import type { TooltipProps } from 'recharts';
import { CloseCircleOutlined } from '@ant-design/icons';

interface ReplyStatisticsProps {
  total_reply: number;
  reply_rate: string;
  reply_types: {
    auto_reply: number;
    personal_reply: number;
  };
}

interface OpenLocationProps {
  data: {
    country: string;
    opens: number;
  }[];
}

const OpenLocationColors = ['#3f51b5', '#e91e63', '#4caf50', '#ff9800', '#00bcd4', '#9c27b0', '#8bc34a'];

const { Title, Text } = Typography;

interface ReplyStatisticsProps {
  total_reply: number;
  reply_types: {
    auto_reply: number;
    personal_reply: number;
  };
}

interface BounceStatisticProps {
  total_bounce: number;
  bounce_rate: string;
  bounce_types: {
    hard_bounce: number;
    soft_bounce: number;
  };
  bounce_reasons: {
    reason: string;
    count: number;
  }[];
}

const BounceStatisticColors = ['#ff0033', '#ffaa00'];

export const ReplyStatistics: React.FC<ReplyStatisticsProps> = ({ total_reply, reply_types }) => {
  const total = total_reply || 0;
  const auto = reply_types.auto_reply || 0;
  const personal = reply_types.personal_reply || 0;

  const autoPercentage = total ? ((auto / total) * 100).toFixed(0) : '0';
  const personalPercentage = total ? ((personal / total) * 100).toFixed(0) : '0';

  return (
    <Card
      title={
        <span style={{ fontWeight: 600 }}>
          <span role="img" aria-label="reply" style={{ marginRight: 8 }}>
            📩
          </span>
          Reply Statistics
        </span>
      }
      style={{ borderRadius: 12 }}
    >
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Text type="secondary" style={{ fontSize: 14 }}>
          Total Replies
        </Text>
        <Title level={2} style={{ color: '#1890ff', margin: 0 }}>
          {total}
        </Title>
      </div>

      <Row gutter={16} justify="center">
        <Col span={12}>
          <div
            className='cls-reply-counts'
          >
            <Text style={{ fontSize: 14 }} type="secondary">
              Auto Replies
            </Text>
            <Title level={3} style={{ margin: '4px 0' }}>
              {auto}
            </Title>
            <Text type="secondary">({autoPercentage}%)</Text>
          </div>
        </Col>
        <Col span={12}>
          <div
            className='cls-reply-counts'
          >
            <Text style={{ fontSize: 14, color: '#52c41a' }}>Personal Replies</Text>
            <Title level={3} style={{ margin: '4px 0', color: '#52c41a' }}>
              {personal}
            </Title>
            <Text type="secondary">({personalPercentage}%)</Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export const OpensByLocation: React.FC<OpenLocationProps> = ({ data }) => {
  const totalOpens = data.reduce((sum, item) => sum + item.opens, 0);

  // Custom tooltip with shadow and percentage
  const renderCustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const { country, opens } = payload[0].payload;
      const percentage = ((opens / totalOpens) * 100).toFixed(2);
      return (
        <div className='cls-custom-tooltip'>
          <strong>{country}</strong>: {opens} opens ({percentage}%)
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      title={
        <span style={{ fontWeight: 600 }}>
          <span role="img" aria-label="location" style={{ marginRight: 8 }}>
            🌐
          </span>
          Opens by Location
        </span>
      }
      style={{ borderRadius: 12 }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PieChart width={280} height={280}>
          <Pie
            data={data}
            dataKey="opens"
            nameKey="country"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={OpenLocationColors[index % OpenLocationColors.length]} />
            ))}
          </Pie>
          <Tooltip content={renderCustomTooltip} />
          {/* Optional: Display legend if too many labels */}
          <Legend layout="vertical" align="right" verticalAlign="middle"
            formatter={(value) => {
              const dataItem = data.find(item => item.country === value);
              return `${value}: ${dataItem?.opens || 0} `;
            }}
          />
        </PieChart>
      </div>
    </Card>
  );
};

export const BounceStatistics: React.FC<BounceStatisticProps> = ({
  total_bounce,
  bounce_rate,
  bounce_types
}) => {
  // Transform bounce_types into pie chart data format
  const bounceTypeData = [
    { name: 'Hard Bounce', value: bounce_types.hard_bounce },
    { name: 'Soft Bounce', value: bounce_types.soft_bounce }
  ];

  // Custom tooltip with shadow and percentage
  const renderCustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const percentage = ((value / total_bounce) * 100).toFixed(2);
      return (
        <div className='cls-custom-tooltip'
        >
          <strong>{name}</strong>: {value} bounces ({percentage}%)
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CloseCircleOutlined style={{ color: 'red' }} />
          <span style={{ fontWeight: 600, fontSize: 16 }}>Bounce Types</span>
        </div>
      }
      style={{ borderRadius: 12 }}
    >
      <Row gutter={16} justify="center" style={{ textAlign: 'center' }}>
        <Col span={12}>
          <Statistic title="Total Bounces" value={total_bounce} />
        </Col>
        <Col span={12}>
          <Statistic title="Bounce Rate" value={bounce_rate} />
        </Col>
      </Row>
      <div className="cls-bounce-chart">
        <PieChart width={280} height={230}>
          <Pie
            data={bounceTypeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
          >
            {bounceTypeData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={BounceStatisticColors[index % BounceStatisticColors.length]} />
            ))}
          </Pie>
          <Tooltip content={renderCustomTooltip} />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value, _entry, index) => {
              const item = bounceTypeData[index];
              return `${value}: ${item.value}`;
            }}
          />
        </PieChart>
      </div>
    </Card>
  );
};