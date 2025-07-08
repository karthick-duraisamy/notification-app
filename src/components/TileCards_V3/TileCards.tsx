import { Button, Card, Col, Row } from 'antd';
import './TileCards.scss';
import { memo, useEffect, useState } from 'react';
import Icon, { TeamOutlined, FilterOutlined } from '@ant-design/icons';
import { Icons } from '../Icons/MenuIcon';
import { setActionId } from '@/stores/TemplateProject.store';
import { useDispatch } from 'react-redux';
import { ContactsIcon, GroupsIcon, RightArrowIcon } from '../Icons/Icons';
import { formatNumber } from '@/Utils/commonFunction';

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
    contacts_summary: <ContactsIcon />,
    groups_summary: <GroupsIcon />,
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
                    <Row className={`cls-tile-title cls-${key.split('_')[0]}-header`}>
                      <Col className="cls-title-btn" span={24}>
                        <span className="cls-title cls-title-heading">
                          {categoryIcons[key as keyof typeof categoryIcons] || <TeamOutlined />}
                          <span>{key.split('_')[0].charAt(0).toUpperCase() + key.split('_')[0].slice(1)}</span>
                        </span>
                        <Button>
                          View {key.split('_')[0].charAt(0).toUpperCase() + key.split('_')[0].slice(1)}
                          <RightArrowIcon />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="cls-date-icon">
                    {data[key]?.total !== undefined ? (
                      <Row className="cls-total-count">
                        <Col span={24}>
                          <div className="cls-card-dtl-container">
                            <div className="cls-card-dtl-content">
                              <p className="cls-card-count">Count</p>
                              <span className="cls-count">
                                <AnimatedCounter target={data[key].total} />
                              </span>
                            </div>
                            <div className="cls-card-dtl-content">
                              <div
                                className="cls-percentage"
                                style={{
                                  color: data[key].percentage_change > 0 ? '#0AB39C' : '#F06548'
                                }}
                              >
                                {data[key].percentage_change > 0 ? '+' : ''}
                                {data[key].percentage_change}%
                              </div>
                              <div className="cls-bar-chart">
                                {(() => {
                                  const barCount = 4;
                                  const percent = Math.max(-100, Math.min(100, data[key].percentage_change || 0));
                                  let heights;
                                  if (percent === 0) {
                                    heights = [1, 1, 1, 1];
                                  } else {
                                    const maxBar = 24;
                                    const minBar = 4;
                                    const fill = Math.abs(percent) / 100;
                                    heights = Array.from({ length: barCount }, (_, i) => {
                                      const ratio = percent > 0 ? (i + 1) / barCount : (barCount - i) / barCount;
                                      return Math.round(minBar + (maxBar - minBar) * fill * ratio);
                                    });
                                  }
                                  return heights.map((height, idx) => (
                                    <div
                                      key={idx}
                                      style={{
                                        display: 'inline-block',
                                        width: 35,
                                        height,
                                        marginRight: 3,
                                        background: '#B0B0B0',
                                        verticalAlign: 'bottom',
                                        transition: 'height 0.3s'
                                      }}
                                      className="cls-bar-styles"
                                    />
                                  ));
                                })()}
                              </div>
                              <div className="cls-filtered-date">vs. {displayPeriod}</div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <Row style={{ margin: '5px 0px' }}></Row>
                    )}
                  </Col>
                </Row>
                <Row className="cls-percentage-filter"></Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Col>
  );
};

export default TileCards;
