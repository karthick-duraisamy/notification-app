import { Col, Row, Table, Tooltip, Typography } from 'antd';
import './GroupDetailShow.scss';
import { useState } from 'react';
import { downloadFile } from '../../Utils/commonFunction';
import { CalendarOutlined, FileExcelOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { dateFormat } from '../../Utils/date';
import { Status } from '@/components/Status_V2/Status';

const GroupDetailShow = ({
  responseData,
  groupDetails,
  manageGroup,
  index,
  manageGroupLength,
  count,
  description,
  status_name,
  topic,
  pathName
}: any) => {
  // const { Title } = Typography;
  const [showWhole, setShowWhole] = useState('');
  //To set the Columns on Table
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }
  ];
  const showData = responseData || manageGroup;
  // To set the Row's data form response
  const dataSource = showData?.duplicates?.map((email: string, index: number) => ({
    key: index,
    email
  }));

  const capitalizeFirstLetter = (val: any) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  return (
    <>
      {(responseData && index === 0) || groupDetails || (manageGroup && index === 0) ? (
        <Row className="cls-group-info" justify={'space-between'}>
          <Col>
            <Row>
              <Col className="cls-tag">
                <TeamOutlined className="cls-icon-bounce" />
              </Col>
              <Col>
                <h3>
                  {!responseData && pathName === 'ManageGroupForm'
                    ? showData?.group_name
                    : showData?.contact_group_name || groupDetails?.group_name}{' '}
                </h3>
                <p>
                  {!responseData && pathName === 'ManageGroupForm'
                    ? showData?.description
                    : description || groupDetails?.group_name}
                </p>
              </Col>
            </Row>
            <Row justify={'start'} className="cls-group-info-row">
              <Col>
                <CalendarOutlined className="cls-icon-bounce" /> Created at: {dateFormat(showData?.created_at)}
              </Col>
              <Col>
                <UserOutlined className="cls-icon-bounce" /> Created by: {showData?.created_by}
              </Col>
            </Row>
            {responseData && (
              <div>
                <Status name={status_name} pathName="campaign" />
                <Status name={topic} pathName="campaign" allStatus={[topic]} />
              </div>
            )}
          </Col>
        </Row>
      ) : (
        ''
      )}
      <Row className="cls-divider"></Row>
      <Row>
        <Col>
          <Typography.Paragraph style={{ color: '#374151', margin: '0px', paddingTop: '15px' }}>
            {'Import results ' + `${manageGroup && index >= 0 && manageGroupLength > !0 ? index + 1 : ''}`}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row justify={'space-between'} className="cls-count-section">
        <Col className="cls-total-count">
          <p>Total contacts</p>
          <Typography.Title level={3}>
            {!responseData && pathName === 'ManageGroupForm'
              ? showData?.total_contacts
              : pathName === 'GroupView'
              ? showData?.total_count
              : showData?.total_contacts}
          </Typography.Title>
        </Col>
        <Col className="cls-newContact">
          <p>New contacts</p>
          <Typography.Title level={3}>{showData?.new_contacts}</Typography.Title>
        </Col>
        <Col
          onClick={() => {
            if (!responseData && pathName === 'ManageGroupForm') {
              showWhole == 'updated' ? setShowWhole('') : setShowWhole('updated');
            }
          }}
          className={
            !responseData && pathName === 'ManageGroupForm'
              ? `cls-selection ${showWhole === 'updated' ? 'cls-active-section' : ''}`
              : 'cls-duplicate-contact'
          }
        >
          <Tooltip title={!responseData && pathName === 'ManageGroupForm' ? 'Click to view Updated contacts' : ''}>
            <p>Updated contacts</p>
            <Typography.Title level={3}>
              {!responseData && pathName === 'ManageGroupForm'
                ? showData?.updated_contacts
                : pathName === 'GroupView'
                ? showData?.readded_contacts
                : showData?.updated_contacts}
            </Typography.Title>
          </Tooltip>
        </Col>

        <Col
          onClick={() => (showWhole == 'invalid' ? setShowWhole('') : setShowWhole('invalid'))}
          className={`cls-selection ${showWhole === 'invalid' ? 'cls-invalid-contacts' : ''}`}
        >
          <p>Invalid contacts</p>
          <Typography.Title level={3}>
            {!responseData && pathName === 'ManageGroupForm'
              ? showData?.invalid_contacts
              : pathName === 'GroupView'
              ? showData?.ignored_contacts
              : showData?.invalid_contacts}
          </Typography.Title>
        </Col>
      </Row>
      <Row className="cls-row-section">
        <Col span={24}>
          {showWhole != '' && showWhole != 'invalid' && (
            <Typography.Title level={4}>{capitalizeFirstLetter(showWhole)} Contacts</Typography.Title>
          )}
          {showWhole == 'updated' && (
            <Table columns={columns} dataSource={dataSource} pagination={false} bordered scroll={{ y: 300 }} />
          )}
          <Tooltip
            title="Click here to download invalid contacts file"
            color="#000000d9"
            placement="right"
            overlayInnerStyle={{ width: 285 }}
          >
            <p
              onClick={() => {
                downloadFile(
                  !responseData && pathName === 'ManageGroupForm'
                    ? showData.invalid_contacts_file
                    : showData?.attachment_url
                );
                setShowWhole('invalid');
              }}
              className="cls-link"
            >
              <FileExcelOutlined />
              Download Invalid Contacts
            </p>
          </Tooltip>
        </Col>
      </Row>
      {count > 1 && <Row className="cls-divider"></Row>}
    </>
  );
};

export default GroupDetailShow;
