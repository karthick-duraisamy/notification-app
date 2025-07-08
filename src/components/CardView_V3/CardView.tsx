import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Tooltip, Pagination, Empty } from 'antd';
import type { TableProps } from 'antd';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { ClockCircleOutlined } from '@ant-design/icons';

import './CardView.scss';
import { dateFormat } from '../../Utils/date';
// import { CustomAvatar } from '../Icons/Icons';

interface CardViewProps {
  data: TableProps<DefaultRecordType>['dataSource'];
  groupnavigate?: (group_name: any, group_id: string) => void;
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

  const colorMap: Record<string, string> = {
    Active: '#1EC6A6',
    'In-Active': '#f06548',
    Pending: '#f7b84b',
    Completed: '#56AB68',
    Scheduled: '#2196f3',
    Failed: '#f76b68',
    Marketing: '#133769',
    Sales: '#F06548'
  };

  const StatusRibbon = ({ status }: { status: string }) => {
    return (
      <div
        className="cls-status-ribbon"
        style={{
          backgroundColor: colorMap[status] || '#888'
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

  const formatAvatar = (name: string): string => {
    if (!name) return '';

    const firstWord = name.split(' ')[0]; // get first word only
    return firstWord.slice(0, 2).toUpperCase(); // first two letters uppercased
  };

  return (
    <Row>
      <Col span={24}>
        <Row className="cls-card-row">
          {Cardvalues?.map((value, index) => {
            return (
              <Col
                key={index}
                span={8}
                className="cls-card-col"
                onDoubleClick={() => {
                  if (groupnavigate)
                    groupnavigate(
                      value?.campaign_id ? value?.name : value?.group_name,
                      value?.campaign_id ? value?.campaign_id : value?.group_id
                    );
                }}
              >
                <Card>
                  <Row className="cls-row-padding" style={{ marginBottom: '10px' }}>
                    <Col span={4} className="cls-margin-col">
                      {/* <CustomAvatar /> */}
                      <h1 className="cls-head-avatar">
                        {formatAvatar(
                          value.name
                            ? value.name
                            : value.first_name
                            ? value.first_name + (value.last_name ? ' ' + value.last_name : '')
                            : value.group_name
                        )}
                      </h1>
                    </Col>
                    <Col span={15} className="cls-group-name">
                      {overflowMap[index] ? (
                        <Tooltip
                          title={
                            value.name
                              ? value.name
                              : value.first_name
                              ? value?.first_name + (value?.last_name ? ' ' + value?.last_name : '')
                              : value?.group_name
                          }
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
                            {value.name
                              ? value?.name
                              : value.first_name
                              ? value?.first_name + (value?.last_name ? ' ' + value?.last_name : '')
                              : value?.group_name}
                          </h3>
                        </Tooltip>
                      ) : (
                        <h3
                          className="cls-word-break"
                          ref={(el) => {
                            groupNameRefs.current[index] = el;
                          }}
                        >
                          {value.name
                            ? value.name
                            : value.first_name
                            ? value?.first_name + (value?.last_name ? ' ' + value?.last_name : '')
                            : value?.group_name}
                        </h3>
                      )}
                      {descriptionOverflowMap[index] ? (
                        <Tooltip
                          title={value?.description ? value?.description : value?.email_id}
                          placement="bottom"
                          showArrow
                          overlayClassName="cls-custom-tooltip"
                          color="#fff"
                        >
                          <p
                            className="cls-word-break-para"
                            ref={(el) => {
                              descriptionRefs.current[index] = el;
                            }}
                          >
                            {value?.description ? value?.description : value?.email_id}
                          </p>
                        </Tooltip>
                      ) : (
                        <p
                          className="cls-word-break-para"
                          ref={(el) => {
                            descriptionRefs.current[index] = el;
                          }}
                        >
                          {value?.description ? value?.description : value?.email_id}
                        </p>
                      )}
                    </Col>
                    <Col span={5} className="cls-actions">
                      {pathName !== 'GroupView' && value?.status_name && <StatusRibbon status={value.status_name} />}
                      <p>{renderActions ? renderActions(value) : <></>}</p>
                    </Col>
                  </Row>
                  {pathName === 'Campaign' ? (
                    <Row className="cls-row-padding" justify={'space-between'}>
                      <Col>
                        <p className="cls-contact" style={{ color: '#189CB7', textAlign: 'left' }}>
                          Sent: <span>{value?.sent}</span>
                        </p>
                      </Col>
                      <Col>
                        <p className="cls-contact" style={{ color: '#00C197' }}>
                          Delivered: <span>{value?.delivered}</span>
                        </p>
                      </Col>
                      <Col>
                        <p className="cls-contact" style={{ color: '#C06BF7', textAlign: 'right' }}>
                          Opened: <span>{value?.opened}</span>
                        </p>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="cls-topic-row" justify={'space-between'}>
                      <Col className="cls-description">
                        {descriptionOverflowMap[index] ? (
                          <p
                            className="cls-word-break-topic"
                            ref={(el) => {
                              descriptionRefs.current[index] = el;
                            }}
                            style={{ color: colorMap[value.topic || value.r_topic] || '#888' }}
                          >
                            {value.topic ? value.topic : value.r_topic}
                          </p>
                        ) : (
                          <p
                            className="cls-word-break-topic"
                            ref={(el) => {
                              descriptionRefs.current[index] = el;
                            }}
                            style={{ color: colorMap[value.topic || value.r_topic] || '#888' }}
                          >
                            {value.topic ? value.topic : value.r_topic}
                          </p>
                        )}
                      </Col>
                      {pathName !== 'GroupView' && (
                        <Col>
                          <p className="cls-total-count">
                            Total Contact: <span>{value?.contact_count}</span>
                          </p>
                        </Col>
                      )}
                      {pathName === 'GroupView' && (
                        <Col>
                          {descriptionOverflowMap[index] ? (
                            <p
                              className="cls-word-break-topic"
                              ref={(el) => {
                                descriptionRefs.current[index] = el;
                              }}
                              style={{ color: colorMap[value?.status_name] || '#888' }}
                            >
                              {value.status_name ? value?.status_name : value?.status_name}
                            </p>
                          ) : (
                            <p
                              className="cls-word-break-topic"
                              ref={(el) => {
                                descriptionRefs.current[index] = el;
                              }}
                              style={{ color: colorMap[value?.status_name] || '#888' }}
                            >
                              {value.topic ? value?.status_name : value?.status_name}
                            </p>
                          )}
                        </Col>
                      )}
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
        {Cardvalues?.length ? (
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
        ) : (
          <Row justify="center" style={{ margin: '40px 0' }}>
            <Col>
              <Empty />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};
export default CardView;
