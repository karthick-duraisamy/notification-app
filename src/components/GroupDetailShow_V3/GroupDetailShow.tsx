import { Button, Col, Row, Table, Tooltip, Typography } from 'antd';
import './GroupDetailShow.scss';
import { useState } from 'react';
import { downloadFile } from '../../Utils/commonFunction';
import { PaperClipOutlined, TeamOutlined } from '@ant-design/icons';
import { dateFormat } from '../../Utils/date';

const GroupDetailShow = ({
  responseData,
  groupDetails,
  manageGroup,
  index,
  manageGroupLength,
  count,
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
      {((responseData && index === 0) || groupDetails || (manageGroup && index === 0)) && count > 0 ? (
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
                <p>{dateFormat(showData?.created_at)}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <h1 style={{ margin: '0px' }}>
              {'Import results ' + `${manageGroup && index >= 0 && manageGroupLength > !0 ? index + 1 : ''}`}
            </h1>
          </Col>
        </Row>
      )}
      <Row className="cls-divider"></Row>
      <Row justify={'space-between'} className="cls-count-section">
        <Col className="cls-total-count cls-align-set">
          <p>Total contacts</p>
          <Typography.Title level={3}>
            {!responseData && pathName === 'ManageGroupForm'
              ? showData?.total_contacts
              : pathName === 'GroupView'
              ? showData?.total_count
              : showData?.total_contacts}
          </Typography.Title>
        </Col>
        <Col className="cls-newContact cls-align-set">
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
              ? `cls-align-set cls-selection ${showWhole === 'updated' ? 'cls-active-section' : ''}`
              : 'cls-duplicate-contact cls-align-set'
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
          className={`cls-selection cls-align-set ${
            showWhole === 'invalid' ? 'cls-invalid-contacts cls-align-set' : ''
          }`}
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
            <Button
              type="primary"
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
              <PaperClipOutlined /> Download Invalid Contacts
            </Button>
          </Tooltip>
        </Col>
      </Row>
      {count > 1 && <Row className="cls-divider"></Row>}
    </>
  );
};

export default GroupDetailShow;
