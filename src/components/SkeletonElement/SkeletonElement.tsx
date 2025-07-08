import React from 'react';
import { Col, Row, Skeleton, Table, Button, Space, Card } from 'antd';
import { FileTextOutlined, UserAddOutlined, AppstoreOutlined, FilterOutlined } from '@ant-design/icons';
import './SkeletonElement.scss';
import { FolderIcon } from '../Icons/Icons';

const SkeletonElement = () => {
  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <Col span={24} key={index} className="cls-skeleton-ele">
      <Row>
        <Skeleton.Avatar />
        <Skeleton.Input className="cls-title-skeleton" />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input className="cls-action-skeleton" />
        <Skeleton.Input className="cls-action-skeleton" />
        <Skeleton.Input className="cls-action-skeleton" />
        {/* <Skeleton.Input className='cls-action-skeleton' /> */}
      </Row>
    </Col>
  ));

  return <>{skeletonRows}</>;
};

const TemplateSkeletonElement = () => {
  let inputVal = [1, 2, 3, 4, 5];
  let templateVal = [1, 2, 3];
  return (
    <>
      <Row>
        <Col span={24}>
          <Row>
            {templateVal.map((item) => (
              <Col key={item} className="cls-template-skeleton" span={7}>
                <Row>
                  <Skeleton.Avatar />
                </Row>
                {inputVal.map((val) => (
                  <Row key={val}>
                    <Skeleton.Input key={val} />
                  </Row>
                ))}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

const FolderElementLoader = (props?: any) => {
  let templateVal = [1, 2, 3, 4, 5];
  return (
    <>
      <Row className="cls-folder-skeleton">
        <Col span={24}>
          <Row>
            {templateVal.map((item) => (
              <Col className="cls-folder-col" key={item} span={4}>
                <Row>
                  <input type="checkbox" disabled />
                </Row>
                <Row className="cls-folder-bg">{props.type === 'folder' ? <FolderIcon /> : <FileTextOutlined />}</Row>
                <Row>
                  <Skeleton.Input />
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

const NotificationLoader = () => {
  const skeletonRows = Array.from({ length: 2 }, (_, index) => (
    <Col key={index} className="cls-skeleton-notification">
      <Row>
        <Col span={3}>
          <Skeleton.Avatar />
        </Col>
        <Col span={20}>
          <Skeleton.Input />
        </Col>
      </Row>
      <Row>
        <Col span={20} offset={3}>
          <Skeleton.Input />
        </Col>
      </Row>
    </Col>
  ));

  return <>{skeletonRows}</>;
};

const GroupViewLoader = () => {
  const skeletonRows = Array.from({ length: 1 }, (_, index) => (
    <Col key={index} span={24} className="cls-skeleton-groupView-loader">
      <Row>
        <Col span={24}>
          <Skeleton.Input />
          <span className="cls-skeleton-input">
            {' '}
            <Skeleton.Input />{' '}
          </span>
        </Col>
      </Row>
    </Col>
  ));

  return <>{skeletonRows}</>;
};

const DashboardTableElement = () => {
  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <Col span={24} key={index} className="cls-skeleton-dbTable">
      <Row>
        <Skeleton.Avatar />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
      </Row>
    </Col>
  ));

  return <>{skeletonRows}</>;
};

const DashboardNotificationLoader = () => {
  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <Col span={24} key={index} className="cls-skeleton-notificationList">
      <Row>
        <Skeleton.Avatar />
        <Skeleton.Input />
      </Row>
    </Col>
  ));

  return <>{skeletonRows}</>;
};

interface CardSkeletonElementProps {
  pathname?: string; // optional prop
}

// This component is used to create a skeleton loader for card elements
const CardSkeletonElement: React.FC<CardSkeletonElementProps> = ({ pathname }) => {
  const skeletonRows = (
    <>
      <Row className="cls-skeleton-card-row">
        <Col span={4}>
          <Skeleton.Avatar />
        </Col>
        <Col span={20}>
          <Row>
            <Skeleton.Input />
          </Row>
          <Row>
            <Skeleton.Input />
          </Row>
        </Col>
      </Row>
    </>
  );

  // Determine number of cards based on pathname
  const skeletonCount = pathname ? 4 : 6;

  return (
    <Row>
      {Array.from({ length: skeletonCount }, (_, index) => (
        <Col span={6} key={index} className="cls-skeleton-card">
          {skeletonRows}
        </Col>
      ))}
    </Row>
  );
};

// The following skeleton loader is used for the latest list page loading state.
type ManageGroupSkeletonProps = {
  pageName?: string;
  dynamicHeader?: string;
  type?: 'list' | 'card';
};

const ManageGroupSkeleton: React.FC<ManageGroupSkeletonProps> = ({ pageName, dynamicHeader, type = 'list' }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: () => <Skeleton.Input style={{ width: 60 }} active size="small" />
    },
    {
      title: dynamicHeader || 'Group Name',
      dataIndex: 'groupName',
      render: () => <Skeleton.Input style={{ width: 120 }} active size="small" />
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: () => <Skeleton.Input style={{ width: 180 }} active size="small" />
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      render: () => <Skeleton.Button active size="small" style={{ width: 80, borderRadius: 8 }} />
    },
    {
      title: 'Contact Count',
      dataIndex: 'contactCount',
      render: () => (
        <Space size="small">
          <Skeleton.Avatar shape="circle" size="small" active />
          <Skeleton.Avatar shape="circle" size="small" active />
          <Skeleton.Avatar shape="circle" size="small" active />
        </Space>
      )
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      render: () => <Skeleton.Input style={{ width: 160 }} active size="small" />
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: () => <Skeleton.Button active size="small" style={{ width: 60 }} />
    }
  ];

  const skeletonCard = (
    <Card className="cls-card-loader" style={{ borderRadius: 12 }} bodyStyle={{ padding: 16 }}>
      <div className="cls-avatar-loader-container">
        <Skeleton.Avatar active shape="circle" size="large" />
        <div style={{ flex: 1 }} className="cls-avatar-loader">
          <Skeleton.Input active style={{ marginRight: 10 }} size="small" />
          <Skeleton.Input active size="small" />
        </div>
      </div>

      <div className="cls-initial-loader">
        <Skeleton.Input active style={{ marginBottom: 8, marginRight: 10 }} size="small" />
        <Skeleton.Input active style={{ marginBottom: 8, marginRight: 10 }} size="small" />
        {/* <Skeleton.Input active style={{ width: "50%" }} size="small" /> */}
      </div>

      <div className="cls-last-loader">
        <Skeleton.Input active style={{ marginRight: 10 }} size="small" />
        <Skeleton.Input active style={{ marginRight: 10 }} size="small" />
      </div>
    </Card>
  );

  const data = new Array(6).fill({}).map((_, i) => ({ key: i }));

  return (
    <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 8
        }}
      >
        <h3 style={{ margin: 0 }}>{pageName || 'Manage Group'}</h3>
        <Space wrap>
          <Button icon={<UserAddOutlined />} type="primary">
            Create {pageName || 'group'}
          </Button>
          <Button icon={<FilterOutlined />} />
          <Button icon={<AppstoreOutlined />} />
        </Space>
      </div>

      {type === 'list' ? (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 6,
            total: 12,
            current: 1,
            showSizeChanger: true,
            pageSizeOptions: ['6', '10', '20']
          }}
        />
      ) : (
        <Row gutter={[24, 24]}>
          {data.map((_item, idx) => (
            <Col xs={24} sm={12} md={12} lg={8} xl={8} key={idx}>
              {skeletonCard}
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

// Skeleton Loader for the click and open email in campaign view
const ClickOpenSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <Col span={24} key={index} className="cls-clickopen-skeleton">
      <Row>
        <Skeleton.Avatar />
        <Skeleton.Input className="cls-action-skeleton" />
        <Skeleton.Input className="cls-action-skeleton" />
        <Skeleton.Input className="cls-action-skeleton" />
        <Skeleton.Input className="cls-action-skeleton" />
      </Row>
    </Col>
  ));

  return <>{skeletonRows}</>;
};

export {
  TemplateSkeletonElement,
  SkeletonElement,
  FolderElementLoader,
  NotificationLoader,
  GroupViewLoader,
  DashboardTableElement,
  DashboardNotificationLoader,
  CardSkeletonElement,
  ManageGroupSkeleton,
  ClickOpenSkeleton
};
