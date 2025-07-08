import { Card, Col, Row, TableProps, Tooltip, Pagination } from 'antd';
import { DefaultRecordType } from 'rc-table/lib/interface';
import React, { useState } from 'react';
import './GroupViewCard.scss';
import { ClockCircleOutlined, FlagOutlined, FolderOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { formatToDDMMYYYY } from '@/Utils/date';
import { CustomViewIcon, CustomEditIcon, CustomDeleteIcon } from '../Icons/Icons';

interface GroupViewCardProps {
  data: TableProps<DefaultRecordType>['dataSource'];
  pageSize?: number;
  total?: number;
  current?: number;
  project: any;
  groupid?: any;
  setFilterData: React.Dispatch<React.SetStateAction<any>>;
  editContactSchema: Function;
  setModalConfig: Function;
  setSelectedRow: Function;
  deleteServiceMethod: Function;
  setDeleteNotify: Function;
  setApiTrigger: Function;
}

const GroupViewCard = ({
  data,
  pageSize,
  total,
  current,
  project,
  groupid,
  setFilterData,
  setApiTrigger,
  editContactSchema,
  setModalConfig,
  setSelectedRow,
  deleteServiceMethod,
  setDeleteNotify
}: GroupViewCardProps) => {
  const [viewEnabled, setViewEnabled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  let Cardvalues = data;

  const handleViewClick = (value: any) => {
    // If clicking the same item that's already selected, toggle the view
    if (selectedItem && selectedItem.contact_id === value.contact_id) {
      setViewEnabled((prev) => !prev);
    } else {
      // If clicking a different item, select it and show the view
      setSelectedItem(value);
      setViewEnabled(true);
    }
  };
  const formatCreatedBy = (email: string) => {
    return email
      .split('@')[0]
      .replace(/\./g, ' ')
      .replace(/\b\w/g, (char: string) => char.toUpperCase())
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\s+/g, ' ')
      .trim();
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
    <>
      <Row>
        <Col span={viewEnabled ? 18 : 24}>
          <Row className="cls-card-row">
            {Cardvalues?.map((value, index) => {
              const firstInitial = value.first_name?.charAt(0).toUpperCase() || '';
              const lastInitial = value.last_name?.charAt(0).toUpperCase() || '';
              const initials = firstInitial + lastInitial;

              return (
                <Col span={8} className="cls-groupcard-col" key={index}>
                  <Card>
                    <Row>
                      <Col span={24} className="cls-card-head">
                        <Row>
                          <Col span={viewEnabled ? 5 : 3} className="cls-intials">
                            <h3>{initials}</h3>
                          </Col>
                          <Col span={viewEnabled ? 13 : 15} className="cls-name">
                            <Row>
                              <h3 className="cls-truncate-text">
                                {value.first_name + (value.last_name ? ' ' + value.last_name : '')}
                              </h3>
                            </Row>
                            <Row>
                              <p className="cls-truncate-text">{value.email_id}</p>
                            </Row>
                          </Col>
                          <Col span={5} className="cls-actions">
                            <p>
                              <Tooltip title="View" placement="bottom" color="#fff">
                                <span className="cls-view cls-icons" onClick={() => handleViewClick(value)}>
                                  <CustomViewIcon />
                                </span>
                              </Tooltip>
                              <Tooltip title="Edit" placement="bottom" color="#fff">
                                <span
                                  className="cls-edit cls-icons"
                                  onClick={() => {
                                    // Filter out job_title from record before editing
                                    const recordWithoutJobTitle = Object.fromEntries(
                                      Object.entries(value).filter(([key]) => key !== 'job_title')
                                    );
                                    setSelectedRow(editContactSchema(recordWithoutJobTitle));
                                    setModalConfig({
                                      open: true,
                                      title: 'Edit contact',
                                      formData: editContactSchema(recordWithoutJobTitle)
                                    });
                                  }}
                                >
                                  <CustomEditIcon />
                                </span>
                              </Tooltip>
                              <Tooltip title="Delete" placement="bottom" color="#fff">
                                <span
                                  className="cls-delete cls-icons"
                                  onClick={() => {
                                    setDeleteNotify({
                                      isDeleteNotify: true,
                                      id: groupid,
                                      representingName: value.email_id,
                                      deleteFunction: deleteServiceMethod
                                    });
                                  }}
                                >
                                  <CustomDeleteIcon />
                                </span>
                              </Tooltip>
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="cls-content-row">
                      <Col span={24}>
                        <Row>
                          <Col
                            className="cls-status"
                            style={{ backgroundColor: value.status_name === 'Active' ? '#0ab39c' : '#f06548' }}
                          >
                            {value.status_name}
                          </Col>
                          <Col className="cls-topic">{value.topic ? value.topic : '-'}</Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="cls-content-row ">
                      <Col span={24} className="cls-created">
                        <Row>
                          <Col span={15}>
                            <p className="cls-truncate-text">Created by {formatCreatedBy(value.created_by)}</p>
                          </Col>
                          <Col span={9} style={{ textAlign: 'right' }}>
                            <p>
                              <ClockCircleOutlined /> {formatToDDMMYYYY(value.created_at)}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
        {viewEnabled && selectedItem && (
          <Col span={6} className="cls-view-col">
            <Row className="cls-view-row">
              <Col span={24} className="cls-view-head-col">
                <Row className="cls-view-head">
                  <Col span={24} className="cls-view-head-title">
                    <span className="cls-initial-head-title">
                      {selectedItem.first_name?.charAt(0).toUpperCase() || ''}
                    </span>
                    <div className="cls-selected-dtl">
                      <h3>{selectedItem.first_name + (selectedItem.last_name ? ' ' + selectedItem.last_name : '')}</h3>
                      {/* <p>{selectedItem.email_id}</p> */}
                      {selectedItem.job_title !== null && <p>{selectedItem.job_title}</p>}
                      <p>{selectedItem.company === null ? '-' : selectedItem.company}</p>
                    </div>
                  </Col>
                </Row>
                <Row className="cls-status-topic">
                  <Col className="cls-status">
                    <span
                      className="cls-status-title"
                      style={
                        {
                          '--status': selectedItem.status_name === 'Active' ? '#0ab39c' : '#f06548'
                        } as React.CSSProperties
                      }
                    >
                      Status :
                    </span>
                    <span
                      className="cls-status-data"
                      style={{ color: selectedItem.status_name === 'Active' ? '#0ab39c' : '#f06548' }}
                    >
                      {selectedItem.status_name}
                    </span>
                  </Col>
                  <Col className="cls-topic">
                    {/* {selectedItem.topic || "-"} */}
                    <FlagOutlined />
                    <span className="cls-country-value">
                      {selectedItem.country === null ? '-' : selectedItem.country}
                    </span>
                  </Col>
                </Row>
                <Row className="cls-project-section">
                  <Col className="cls-project">
                    <p>
                      <FolderOutlined /> Project :
                    </p>
                  </Col>
                  <Col className="cls-project-data">
                    <p>{selectedItem.project_name === null ? '-' : selectedItem.project_name}</p>
                  </Col>
                </Row>
                <Row className="cls-details-section">
                  <Col span={24}>
                    {/* <Row className='cls-details'>
                                            <Col span={10}>
                                                <p><FolderOutlined />Project</p>
                                            </Col>
                                            <Col span={2}>
                                                <p>:</p>
                                            </Col>
                                            <Col span={12} className='cls-details-value'>
                                                <p>{selectedItem.project_name === null ? "-" : selectedItem.project_name}</p>
                                            </Col>
                                        </Row> */}
                    <h4 className="cls-cont-info">Contact Information</h4>
                    <Row className="cls-details">
                      <Col>
                        <span className="cls-dtl-icon">
                          <MailOutlined />
                        </span>
                      </Col>
                      <Col className="cls-details-cont">
                        <p>Email</p>
                        <p className="cls-details-value">{selectedItem.email_id}</p>
                      </Col>
                    </Row>
                    <Row className="cls-details">
                      <Col>
                        <span className="cls-dtl-icon">
                          <PhoneOutlined />
                        </span>
                      </Col>
                      <Col className="cls-details-cont">
                        <p>Phone</p>
                        <p className="cls-details-value">
                          {selectedItem.phone_number === null ? '-' : selectedItem.phone_number}
                        </p>
                      </Col>
                    </Row>
                    {/* <Row className='cls-details'>
                                                <Col span={10}>
                                                    <p>Job Title</p>
                                                </Col>
                                                <Col span={2}>
                                                    <p>:</p>
                                                </Col>
                                                <Col span={12} className='cls-details-value'>
                                                    <p>{selectedItem.job_title === null ? "-" : selectedItem.job_title}</p>
                                                </Col>
                                            </Row> */}
                    {/* <Row className='cls-details'>
                                            <Col span={10}>
                                                <p>Company</p>
                                            </Col>
                                            <Col span={2}>
                                                <p>:</p>
                                            </Col>
                                            <Col span={12} className='cls-details-value'>
                                                <p>{selectedItem.company === null ? "-" : selectedItem.company}</p>
                                            </Col>
                                        </Row> */}
                    {/* <Row className='cls-details'>
                                            <Col span={10}>
                                                <p>Country</p>
                                            </Col>
                                            <Col span={2}>
                                                <p>:</p>
                                            </Col>
                                            <Col span={12} className='cls-details-value'>
                                                <p>{selectedItem.country === null ? "-" : selectedItem.country}</p>
                                            </Col>
                                        </Row> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        )}
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
    </>
  );
};
export default GroupViewCard;
