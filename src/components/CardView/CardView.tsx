import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Tooltip, Pagination } from 'antd';
import type { TableProps } from 'antd';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { ClockCircleOutlined } from '@ant-design/icons';

import './CardView.scss';
import { dateFormat } from '../../Utils/date';

interface CardViewProps {
  data: TableProps<DefaultRecordType>['dataSource'];
  groupnavigate: (group_name: any, group_id: string) => void;
  pageSize?: number;
  total?: number;
  current?: number;
  project: any;
  setFilterData: React.Dispatch<React.SetStateAction<any>>;
  renderActions?: (group: any) => React.ReactNode;
  setApiTrigger: React.Dispatch<React.SetStateAction<any>>;
  pathName?: string;
}

const CardView = ({
  data,
  groupnavigate,
  pageSize,
  total,
  current,
  project,
  setFilterData,
  renderActions,
  setApiTrigger,
  pathName
}: CardViewProps) => {
  let Cardvalues = data;
  const groupNameRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [overflowMap, setOverflowMap] = useState<Record<number, boolean>>({});
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [descriptionOverflowMap, setDescriptionOverflowMap] = useState<Record<number, boolean>>({});
  const createdByRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [createdByOverflowMap, setCreatedByOverflowMap] = useState<Record<number, boolean>>({});

  const avatarsColors = [
    { color: '#3577F1', background: '#e1ebfd' },
    { color: '#F06548', background: '#f065484f' },
    { color: '#0AB39C', background: '#0ab39c4f' },
    { color: '#faad14', background: '#faad144f' },
    { color: '#FF6B72', background: '#ff6b724f' }
  ];
  const getAvatarColors = (topic: string | undefined) => {
    if (!topic) return avatarsColors[2];
    const lowerTopic = topic.toLowerCase();

    if (lowerTopic === 'marketing') {
      return avatarsColors[0];
    }

    if (lowerTopic === 'sales') {
      return avatarsColors[1];
    }

    const randomIndex = Math.floor(Math.random() * 3) + 2;
    return avatarsColors[randomIndex];
  };

  useEffect(() => {
    const updateOverflowMap = () => {
      const newGroupMap: Record<number, boolean> = {};
      const newDescriptionMap: Record<number, boolean> = {};
      const newCreatedByMap: Record<number, boolean> = {};

      groupNameRefs.current.forEach((el, index) => {
        if (!el) return;
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight || '0');
        const maxHeight = lineHeight * 2;
        newGroupMap[index] = el.scrollHeight > maxHeight + 1;
      });

      descriptionRefs.current.forEach((el, index) => {
        if (!el) return;
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight || '0');
        newDescriptionMap[index] = el.scrollHeight > lineHeight + 1;
      });

      createdByRefs.current.forEach((el, index) => {
        if (!el) return;
        newCreatedByMap[index] = el.scrollWidth > el.clientWidth;
      });

      setOverflowMap(newGroupMap);
      setDescriptionOverflowMap(newDescriptionMap);
      setCreatedByOverflowMap(newCreatedByMap);
    };

    updateOverflowMap();

    const observer = new ResizeObserver(updateOverflowMap);
    [...groupNameRefs.current, ...descriptionRefs.current, ...createdByRefs.current].forEach(
      (el) => el && observer.observe(el)
    );

    return () => observer.disconnect();
  }, [data]);
  const StatusRibbon = ({ status }: { status: string }) => {
    const colorMap: Record<string, string> = {
      Active: '#0ab39c',
      'In-Active': '#f06548',
      Pending: '#f7b84b',
      Completed: '#27ae60',
      Scheduled: '#2196f3',
      Failed: '#E53935'
    };

    return (
      <div
        className="cls-status-ribbon"
        style={{
          backgroundColor: colorMap[status] || '#888',
          width: 'fit-content'
        }}
      >
        {status}
      </div>
    );
  };

  // To given the custom render for the pagination
  const itemRender = (
    _: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactNode
  ) => {
    if (type === 'prev') {
      return <span>Previous</span>;
    }
    if (type === 'next') {
      return <span>Next</span>;
    }
    return originalElement;
  };

  return (
    <Row>
      <Col span={24}>
        <Row className="cls-card-row">
          {Cardvalues?.map((value, index) => {
            const colorVar = value?.topic ? value?.topic : value?.r_topic;
            const { color, background } = getAvatarColors(colorVar);

            return (
              <Col
                key={index}
                span={8}
                className="cls-card-col"
                onDoubleClick={() =>
                  groupnavigate(
                    value?.campaign_id ? value?.name : value?.group_name,
                    value?.campaign_id ? value?.campaign_id : value?.group_id
                  )
                }
              >
                <Card>
                  {value?.status_name && <StatusRibbon status={value.status_name} />}
                  <Row className="cls-row-padding" style={{ marginBottom: '10px' }}>
                    <Col span={3} className="cls-card-initial" style={{ color, backgroundColor: background }}>
                      <h2 style={{ color }}>
                        {(value?.topic ? value?.topic : value?.r_topic)?.charAt(0)?.toUpperCase() || '-'}
                      </h2>
                      <small>{value.topic ? value.topic : value.r_topic}</small>
                    </Col>
                    <Col span={16} className="cls-group-name">
                      {overflowMap[index] ? (
                        <Tooltip
                          title={value.name ? value.name : value?.group_name}
                          placement="bottom"
                          showArrow
                          overlayClassName="cls-custom-tooltip"
                          color="#fff"
                        >
                          <h3
                            className="cls-word-break"
                            ref={(el) => {
                              groupNameRefs.current[index] = el;
                            }}
                          >
                            {value.name ? value.name : value?.group_name}
                          </h3>
                        </Tooltip>
                      ) : (
                        <h3
                          className="cls-word-break"
                          ref={(el) => {
                            groupNameRefs.current[index] = el;
                          }}
                        >
                          {value.name ? value.name : value?.group_name}
                        </h3>
                      )}
                    </Col>
                    <Col span={5} className="cls-actions">
                      <p>{renderActions ? renderActions(value) : <></>}</p>
                    </Col>
                  </Row>
                  {pathName === 'Campaign' ? (
                    <Row className="cls-row-padding">
                      <Col span={7}>
                        <p className="cls-contact" style={{ color: '#5bc0de', textAlign: 'left' }}>
                          Sent: <span>{value?.sent}</span>
                        </p>
                      </Col>
                      <Col span={1}></Col>
                      <Col span={7}>
                        <p className="cls-contact" style={{ color: '#28a745' }}>
                          Delivered: <span>{value?.delivered}</span>
                        </p>
                      </Col>
                      <Col span={1}></Col>

                      <Col span={8}>
                        <p className="cls-contact" style={{ color: '#8e44ad', textAlign: 'right' }}>
                          Opened: <span>{value?.opened}</span>
                        </p>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="cls-row-padding">
                      <Col className="cls-description" span={14}>
                        {descriptionOverflowMap[index] ? (
                          <Tooltip
                            title={value?.description}
                            placement="bottom"
                            showArrow
                            overlayClassName="cls-custom-tooltip"
                            color="#fff"
                          >
                            <p
                              className="cls-word-break"
                              ref={(el) => {
                                descriptionRefs.current[index] = el;
                              }}
                            >
                              {value?.description}
                            </p>
                          </Tooltip>
                        ) : (
                          <p
                            className="cls-word-break"
                            ref={(el) => {
                              descriptionRefs.current[index] = el;
                            }}
                          >
                            {value?.description}
                          </p>
                        )}
                      </Col>
                      <Col span={10}>
                        <p className="cls-contact">
                          Total Contact: <span>{value?.contact_count}</span>
                        </p>
                      </Col>
                    </Row>
                  )}
                  <Row className="cls-divider"></Row>

                  <Row className="cls-create-at-by cls-row-padding">
                    <Col span={12} style={{ maxWidth: '100%', overflow: 'hidden' }}>
                      <p className="cls-created-user">
                        <span>Created :</span>
                        {createdByOverflowMap[index] ? (
                          <Tooltip
                            title={value?.created_by}
                            placement="bottom"
                            showArrow
                            overlayClassName="cls-custom-tooltip"
                            color="#fff"
                          >
                            <span
                              className="cls-create-by"
                              ref={(el) => {
                                createdByRefs.current[index] = el;
                              }}
                            >
                              {value?.created_by
                                .split('@')[0]
                                .replace(/\./g, ' ')
                                .replace(/\b\w/g, (char: string) => char.toUpperCase())
                                .replace(/([a-z])([A-Z])/g, '$1 $2')
                                .replace(/\s+/g, ' ')
                                .trim()}
                            </span>
                          </Tooltip>
                        ) : (
                          <span
                            className="cls-create-by"
                            ref={(el) => {
                              createdByRefs.current[index] = el;
                            }}
                          >
                            {value?.created_by
                              .split('@')[0]
                              .replace(/\./g, ' ')
                              .replace(/\b\w/g, (char: string) => char.toUpperCase())
                              .replace(/([a-z])([A-Z])/g, '$1 $2')
                              .replace(/\s+/g, ' ')
                              .trim()}
                          </span>
                        )}
                      </p>
                    </Col>
                    <Col span={12} className="cls-created-timing">
                      <p>
                        <ClockCircleOutlined className="cls-create-at" />
                        <span className="cls-create-at"> {dateFormat(value?.created_at)}</span>
                      </p>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col span={24} className="cls-pagination-col">
            <Pagination
              current={current}
              pageSize={pageSize}
              total={total}
              showSizeChanger
              showQuickJumper
              pageSizeOptions={['6', '12', '30', '60', '100']}
              onChange={(page, pageSize) => {
                setFilterData((prev: any) => ({
                  ...prev,
                  page,
                  page_size: pageSize,
                  project: project
                }));
                setApiTrigger(true);
              }}
              itemRender={itemRender}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default CardView;
