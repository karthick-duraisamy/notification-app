import { Button, Card, Col, Row } from 'antd';
import './TileCards.scss';
import { memo, useEffect, useState } from 'react';
import Icon, {
  UserOutlined,
  TeamOutlined,
  FilterOutlined,
  ArrowUpOutlined,
  DownCircleFilled,
  UpCircleFilled
} from '@ant-design/icons';
import { Icons } from '../Icons/MenuIcon';
import { setActionId } from '@/stores/TemplateProject.store';
import { useDispatch } from 'react-redux';

interface DataType {
  [key: string]: any;
}

const AnimatedCounter = memo(({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const duration = 500; // Animation duration in ms
  const increment = target / (duration / 16); // Calculate increment for smooth animation

  // Effect to animate the counter
  useEffect(() => {
    let start = 0;
    const end = target;

    if (start === end) return;

    const timer = setInterval(() => {
      start += increment;
      setCount(Math.ceil(start));

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [target, increment]);

  // Format the number display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      // For millions
      const millions = num / 1000000;
      return `${millions % 1 !== 0 ? millions.toFixed(1) : millions}M`;
    } else if (num >= 1000) {
      // For thousands
      const thousands = num / 1000;
      return `${thousands % 1 !== 0 ? thousands.toFixed(1) : thousands}k`;
    }
    return num.toString();
  };

  return <span>{formatNumber(count)}</span>;
});

const TileCards = ({
  data,
  setSelectedTile,
  selectedPeriod,
  selectTile
}: {
  data: DataType;
  setSelectedTile: any;
  selectedPeriod: any;
  selectTile: any;
}) => {
  const dispatch = useDispatch();
  const categoryIcons = {
    contacts_summary: <UserOutlined />,
    groups_summary: <TeamOutlined />,
    segments_summary: <FilterOutlined />,
    campaigns_summary: <Icon component={Icons.get('CampaignIcon')} />
  };

  // Function to get the opposite period
  const getOppositePeriod = (period: string) => {
    const map: Record<string, string> = {
      today: 'yesterday',
      yesterday: 'today',
      this_week: 'last_week',
      last_week: 'this_week',
      this_month: 'last_month',
      last_month: 'this_month'
    };
    return map[period] || period;
  };
  // Function to format the period string
  const formatPeriod = (period: string) => period.replaceAll('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // Get the display period based on the selected period
  const displayPeriod = formatPeriod(getOppositePeriod(selectedPeriod));

  return (
    <Col span={24} className="cls-card-design">
      <Row gutter={[16, 16]}>
        {Object.keys(data).map((key) => {
          return (
            <Col key={key} span={6}>
              <Card
                className={selectTile?.tile === key ? `selected-tile-card ${selectTile?.tile}` : ''}
                onClick={() => {
                  setSelectedTile({ tile: key });
                  dispatch(setActionId({ value: undefined }));
                }}
              >
                <Row>
                  <Col span={24} className="cls-tile-head">
                    <Row className="cls-tile-title">
                      <Col className="cls-title-btn" span={24}>
                        <span className={`cls-title-icons cls-${key.split('_')[0]}-icon`}>
                          {categoryIcons[key as keyof typeof categoryIcons] || <TeamOutlined />}
                        </span>
                        {/* <span className='cls-title'>
                                                        {(key.split('_')[0].charAt(0).toUpperCase() +
                                                            key.split('_')[0].slice(1))}
                                                    </span> */}
                        <Button>
                          View {key.split('_')[0].charAt(0).toUpperCase() + key.split('_')[0].slice(1)}
                          <ArrowUpOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={19} className="cls-date-icon">
                    <Row>
                      <Col>
                        {data[key]?.total !== undefined ? (
                          <Row className="cls-total-count">
                            <Col>
                              <span className="cls-title">
                                {key.split('_')[0].charAt(0).toUpperCase() + key.split('_')[0].slice(1)}
                              </span>
                              <div className="cls-card-dtl-container">
                                <div className="cls-card-dtl-content">
                                  <p className="cls-card-count">Count</p>
                                  <span className="cls-count">
                                    <AnimatedCounter target={data[key].total} />
                                  </span>
                                </div>
                                <div className="cls-card-dtl-content">
                                  <p className="cls-card-count">Percentage</p>
                                  <span
                                    className="cls-count"
                                    style={{ color: data[key].percentage_change > 0 ? '#0AB39C' : '#F06548' }}
                                  >
                                    {data[key].percentage_change}
                                  </span>
                                  <span className="cls-percentage">%</span>
                                  <span className="cls-filtered-date">vs. {displayPeriod}</span>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ) : (
                          <Row style={{ margin: '5px 0px' }}></Row>
                        )}
                      </Col>
                    </Row>
                    <Row className="cls-percentage-filter">
                      {/* <span className='cls-percentage' style={{ color: data[key].percentage_change > 0 ? '#0AB39C' : '#F06548' }}>
                    {data[key].percentage_change > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {data[key].percentage_change} %
                </span>
                <span className='cls-filtered-date'>
                    vs. previous month
                </span> */}
                    </Row>
                  </Col>
                  <Col span={5} className="cls-icons">
                    <Row>
                      {/* <Col span={24} className={`cls-title-icons cls-${key.split('_')[0]}-icon`}>
                    {categoryIcons[key as keyof typeof categoryIcons] || <TeamOutlined />}
                </Col> */}
                      <span style={{ color: data[key].percentage_change > 0 ? '#0AB39C' : '#F06548' }}>
                        {data[key].percentage_change > 0 ? <UpCircleFilled /> : <DownCircleFilled />}
                      </span>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Col>
  );
};

export default TileCards;
