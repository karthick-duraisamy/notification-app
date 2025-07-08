import { Row, Col, Select, Button, message, Table, Badge, Modal, notification, Tabs, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useLazyGetDashboardQuery } from '../../../services/dashboard/Dashboard';
import './Dashboard.scss';
import { useAppSelector } from '../../../hooks/App.hook';
import { useEffect, useState } from 'react';
import NotificationStatus from './NotificationElement';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import OverFlowContent from './OverFlowContent';
import TrackingModal from '../Tracking/TrackingModal';
import { useDispatch } from 'react-redux';
import { CheckGuideModal } from '../../../Utils/commonFunction';
import {
  CustomNoData,
  EmailNotificationIcon,
  Medal1,
  Medal2,
  Medal3,
  Medal4,
  Medal5,
  NotificationsIcon,
  ResendIcon,
  ViewIcon,
  WhatsAppNotificationIcon
} from '@/components/Icons/Icons';
import { setDashboarTrackingInfo, setGuideModalInfo } from '@/stores/TemplateProject.store';
import { useLazyGetTrackingInfoQuery, useResendMailMutation } from '../../../services/Tracking/Tracking';
import {
  DashboardNotificationLoader,
  DashboardTableElement,
  NotificationLoader
} from '@/components/SkeletonElement/SkeletonElement';
import DrawLineChart from '@/components/LineChart/LineChart';
import GuideModal from '@/components/GuideModal/GuideModal';
import PeriodFilter from '@/components/PeriodFilter/PeriodFilter';
const { Option } = Select;

const Dashboard = () => {
  const { project, modalGuide } = useAppSelector((state) => state.TemplateProjectReducer);
  // ***************************************************************AICODES********************
  const { TabPane } = Tabs;

  const { Text } = Typography;

  const aIdata = [
    {
      key: '1',
      indent: 'Eticket',
      mailReceived: Math.floor(Math.random() * 200),
      aiResponse: Math.floor(Math.random() * 200),
      manualResponse: Math.floor(Math.random() * 200)
    },
    {
      key: '2',
      indent: 'Booking Status',
      mailReceived: Math.floor(Math.random() * 200),
      aiResponse: Math.floor(Math.random() * 200),
      manualResponse: Math.floor(Math.random() * 200)
    },
    {
      key: '3',
      indent: 'Cancellation',
      mailReceived: Math.floor(Math.random() * 200),
      aiResponse: Math.floor(Math.random() * 200),
      manualResponse: Math.floor(Math.random() * 200)
    },
    {
      key: '4',
      indent: 'Flight Options',
      mailReceived: Math.floor(Math.random() * 200),
      aiResponse: Math.floor(Math.random() * 200),
      manualResponse: Math.floor(Math.random() * 200)
    },
    {
      key: '5',
      indent: 'Invoice Request',
      mailReceived: Math.floor(Math.random() * 200),
      aiResponse: Math.floor(Math.random() * 200),
      manualResponse: Math.floor(Math.random() * 200)
    }
  ];

  const aIcolumns = [
    {
      title: <Text style={{ color: '#1677ff' }}>Indent</Text>,
      dataIndex: 'indent',
      key: 'indent',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: <Text style={{ color: 'rgb(81, 209, 102)' }}>Mail Received</Text>,
      dataIndex: 'mailReceived',
      key: 'mailReceived'
    },
    {
      title: <Text style={{ color: 'rgb(255, 0, 0)' }}>AI Response</Text>,
      dataIndex: 'aiResponse',
      key: 'aiResponse'
    },
    {
      title: <Text style={{ color: 'rgb(241, 194, 27)' }}>Manual Response</Text>,
      dataIndex: 'manualResponse',
      key: 'manualResponse'
    }
  ];

  const SimpleMetrics = () => {
    return (
      <div style={{ padding: '16px 0', width: '100%' }}>
        <Table columns={aIcolumns} dataSource={aIdata} pagination={false} bordered={false} />
      </div>
    );
  };

  // ******************************************************************************************************
  const navigate = useNavigate();
  const medals = [<Medal1 />, <Medal2 />, <Medal3 />, <Medal4 />, <Medal5 />];
  const { t } = useTranslation();
  // Initial time only showing that integration workflow modal.(Guide)
  // let sec = localStorage.getItem("afterProject"); && sec == "setValue"
  const [isModelOpen, setIsModelOpen] = useState(
    !modalGuide?.includes('dashboard') && sessionStorage.getItem('isModel') !== '0'
  );
  const dispath = useDispatch();
  let valueSet: any;

  useEffect(() => {
    if (!isModelOpen) {
      let value = 'dashboard';
      valueSet = CheckGuideModal(modalGuide, value);
      dispath(setGuideModalInfo({ value: valueSet }));
    }
  }, [isModelOpen]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [getInfo, infoResponse] = useLazyGetTrackingInfoQuery();
  const [resendMail] = useResendMailMutation();
  const [dashboardService, dashboardServiceStatus] = useLazyGetDashboardQuery({});
  const [dashboardData, setDashboardData] = useState();
  const [chartData, setChartData] = useState({
    isChart: false,
    chartData: {}
  });
  const [filterInfo, setFilterInfo] = useState({
    filter_type: 'today',
    notification_code: undefined,
    filter_method: undefined
  });

  // When modifications are made to the global project, the following useEffect
  // is used to update the value with respect to selcted project.
  useEffect(() => {
    let dashboardServiceData: any = {
      project: project,
      filter_type: filterInfo?.filter_type,
      notification_code: filterInfo?.notification_code,
      filter_method: filterInfo?.filter_method
    };
    if (typeof project === 'undefined') {
      return;
    }
    dashboardService(dashboardServiceData)
      .unwrap()
      .then((res: any) => {
        if (res.response && res.responseCode === 0) {
          if (chartData?.isChart) {
            setChartData((prev: any) => ({
              ...prev,
              chartData: res.response.data
            }));
          } else setDashboardData(res.response.data);
        }
      })
      .catch((error: any) => {
        // Handle the error here
        message.error(error.data.response.errors.project[0]);
      });
  }, [filterInfo, project]);

  // The following method is used for triggering the tracking model
  const handleTemplateTracking = (id: any) => {
    getInfo({
      project: Number(sessionStorage.getItem('project_id'))
        ? Number(sessionStorage.getItem('project_id'))
        : Number(project),
      tracking_id: id
    })
      .unwrap()
      .then((res: any) => {
        if (res.responseCode === 0) {
          setIsModalVisible(true);
          // setWaiting((state) => state.filter((id) => id !== tracking_id));
        }
      })
      .catch(() => {
        // handleError(err);
      });
  };

  // The following method is triggered when user click the resend button or icon.
  const handleResendAction = (tracking: any) => {
    let tracking_id = tracking?.tracking_id;
    resendMail({ tracking_id })
      .unwrap()
      .then(() => {
        // setWaiting((state) => state.filter((id) => id !== tracking_id));
        notification['success']({
          message: 'Notification has been resent successfully.',
          duration: 2
        });
      })
      .catch((err: any) => {
        // Error handling for Resend mail
        message.error(
          err?.data?.response && err?.data?.response['errors'] && err?.data?.response['errors']['tracking_id'][0]
            ? err.data.response['errors']['tracking_id'][0]
            : err.data.response['Message']
        );
        notification['error']({
          message: 'Error!',
          description: 'Notification not sent!',
          duration: 2
        });
      });
  };

  // The following array is used to frame the table column for recent failure.
  const columns = [
    {
      title: 'Tracking ID',
      dataIndex: 'tracking_id',
      key: 'tracking_id',
      width: 90,
      render: (trackingId: number, data: any) => (
        <div className="cls-tracking-id">
          <a onClick={() => handleTemplateTracking(trackingId)}>{trackingId}</a> <br />
          <span className={data.notification_type === 'WA' ? 'cls-whatsapp-dt' : 'cls-email-dt'}>
            {data.notification_type === 'WA' ? 'Whatsapp' : 'Email'}
          </span>
        </div>
      )
    },
    {
      title: 'Details',
      key: 'details',
      width: 200,
      render: (_: any, data: any) => (
        <div className="cls-subject-dt">
          <OverFlowContent text={data.subject} prefix="Subject: " />
          <OverFlowContent text={data.to} prefix="To: " />
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'remarks',
      key: 'status',
      width: 230,
      render: (remarks: string) => <OverFlowContent text={remarks || 'Error'} maxWidth="230px" type="status" />
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => {
        const formattedDate = moment(date).format('DD-MMM-YYYY');
        const formattedTime = moment(date).format('hh:mm A');
        return (
          <div className="cls-created-at" style={{ fontSize: '12px', lineHeight: '1.5' }}>
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (trackingId: number) => (
        <div>
          <Button
            type="link"
            onClick={() => handleResendAction(trackingId)}
            style={{ color: '#1B3BA8', padding: '0px', marginRight: '3px' }}
          >
            Resend
          </Button>
          <ResendIcon />
        </div>
      )
    }
  ];

  // The following method is triggered when user change the select option of date range and notification type
  const filterHandler = (value: any) => {
    let filterType = ['today', 'yesterday', 'this_week', 'last_week', 'this_month', 'last_month'];
    if (filterType.includes(value)) {
      setChartData((prev: any) => ({
        ...prev,
        isChart: false
      }));
      setFilterInfo((prev) => ({
        ...prev,
        filter_type: value,
        filter_method: undefined,
        notification_code: undefined
      }));
    } else {
      setChartData((prev: any) => ({
        ...prev,
        isChart: true
      }));
      setFilterInfo((prev: any) => ({
        ...prev,
        notification_code: value === 'all' ? undefined : value,
        filter_method: 'chart'
      }));
    }
  };

  // The following method is used for framing the notification list from notification info
  const frameNotificationType = () => {
    let notificationInfo: any = [{ label: 'All', value: 'all' }];
    (dashboardServiceStatus as any)?.data?.response?.data?.notification?.notification?.map((type: any) => {
      notificationInfo.push({
        label: type?.type === 'EM' ? 'Email' : type?.type === 'WA' ? 'Whatsapp' : 'SMS',
        value: type.type
      });
    });
    return notificationInfo;
  };

  return (
    <>
      <GuideModal
        isOpen={isModelOpen}
        onClose={() => {
          setIsModelOpen(false);
          sessionStorage.setItem('isModel', '0');
        }}
        isNext={false}
        status="warning"
        message=""
        nextStep="If you already have a project, switch to your project. Otherwise, create a new project by clicking the project menu or the button below to navigate to the project menu."
        buttonLabel="Create Project"
        navigateTo="/project/create"
        additionButtonLabel="Go to Project"
        additionNavigateTo="/project"
        pathName="dashboard"
      />
      <div className="Dashboard">
        <h1>{t('dashboard')}</h1>

        <Row justify="space-between" align="middle" gutter={[0, 24]}>
          <Col flex="auto">
            <h2>{t('overall_summary')}</h2>
          </Col>
          <Col
            className={
              dashboardServiceStatus?.isSuccess &&
              !dashboardServiceStatus?.isFetching &&
              (dashboardData as any)?.notification.length === 1
                ? 'cls-summary-dropdown-data cls-filter-pos'
                : 'cls-summary-dropdown-data'
            }
          >
            <PeriodFilter filterHandler={filterHandler} />
          </Col>
        </Row>

        <Row style={{ margin: '1px' }} align="middle" gutter={[48, 24]}>
          {dashboardServiceStatus?.isSuccess && !dashboardServiceStatus?.isFetching ? (
            (dashboardServiceStatus as any).data.response.data.notification?.map((data: any, index: any) => (
              <NotificationStatus key={index} data={data} dataLength={(dashboardData as any)?.notification.length} />
            ))
          ) : (
            <NotificationLoader />
          )}
        </Row>

        <Row className="cls-sent-notification">
          <Col xl={16} lg={24} style={{ display: 'flex', flexDirection: 'column' }}>
            <Row className="cls-table-section">
              <Col span={12}>{t('recent_failures')}</Col>
              {dashboardServiceStatus?.isSuccess && !dashboardServiceStatus?.isFetching && (
                <Col span={12}>
                  <a
                    onClick={() => {
                      let value: any = filterInfo?.filter_type;
                      if (value !== 'today') dispath(setDashboarTrackingInfo({ value }));
                      navigate('/tracking/');
                    }}
                  >
                    <ViewIcon /> <span>{t('view_all_failures')}</span>
                  </a>
                </Col>
              )}
            </Row>
            <Row>
              <Col span={24} className="cls-dbtable">
                {dashboardServiceStatus?.isSuccess && !dashboardServiceStatus?.isFetching ? (
                  <Table
                    locale={{
                      emptyText: <CustomNoData />
                    }}
                    pagination={false}
                    dataSource={(dashboardServiceStatus as any)?.data?.response?.data?.recent_failures}
                    columns={columns}
                    rowKey="tracking_id"
                  />
                ) : (
                  <DashboardTableElement />
                )}
              </Col>
            </Row>
          </Col>
          <Col
            xl={8}
            lg={12}
            style={{ display: 'flex', flexDirection: 'column' }}
            className={
              dashboardServiceStatus?.isSuccess &&
              !dashboardServiceStatus?.isFetching &&
              (dashboardData as any)?.notification.length === 1
                ? 'cls-notification-pos'
                : ''
            }
          >
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={2}>
                    <NotificationsIcon />
                  </Col>
                  <Col span={22}>{t('top_sent_notifications')}</Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Tabs
                      defaultActiveKey="1"
                      type="line"
                      centered
                      style={{ marginTop: 0, paddingTop: 0 }}
                      tabBarStyle={{ marginBottom: 0 }}
                    >
                      <TabPane tab={<span>AI Mail Agent</span>} key="2">
                        <div>{SimpleMetrics()}</div>
                      </TabPane>
                      <TabPane tab={<span>Push Notification</span>} key="1">
                        <div style={{ minHeight: 180 }}>
                          {dashboardServiceStatus?.isSuccess && !dashboardServiceStatus?.isFetching ? (
                            (dashboardServiceStatus as any)?.data?.response?.data?.most_send_notifications?.length >
                            0 ? (
                              (dashboardServiceStatus as any)?.data?.response?.data?.most_send_notifications?.map(
                                (mostNotificationSent: any, index: any) => {
                                  return (
                                    <Row key={index}>
                                      <Col
                                        span={3}
                                        className={
                                          mostNotificationSent.notification_type === 'EM'
                                            ? 'cls-notification-icon'
                                            : mostNotificationSent.notification_type === 'WA'
                                            ? 'cls-wa-dashboard-icon'
                                            : ''
                                        }
                                      >
                                        {mostNotificationSent.notification_type === 'WA' ? (
                                          <WhatsAppNotificationIcon />
                                        ) : (
                                          <EmailNotificationIcon />
                                        )}
                                      </Col>
                                      <Col span={18} className="cls-notification-text">
                                        <span title={mostNotificationSent.template_name}>
                                          {mostNotificationSent.template_name.length > 25
                                            ? mostNotificationSent.template_name.substring(0, 25) + '...'
                                            : mostNotificationSent.template_name}
                                        </span>
                                        <br />
                                        <span className="cls-notification-count">{mostNotificationSent.count}</span>
                                      </Col>
                                      <Col
                                        className={
                                          mostNotificationSent.notification_type === 'EM'
                                            ? 'cls-email-medal cls-medal-icon'
                                            : 'cls-medal-icon'
                                        }
                                        span={3}
                                      >
                                        {medals[index]}
                                      </Col>
                                    </Row>
                                  );
                                }
                              )
                            ) : (
                              <>
                                <Row
                                  className={
                                    dashboardServiceStatus?.isSuccess &&
                                    !dashboardServiceStatus?.isFetching &&
                                    (dashboardData as any)?.notification.length === 1
                                      ? 'cls-noti-empty cls-noti-empty-height'
                                      : 'cls-noti-empty'
                                  }
                                >
                                  <p style={{ textAlign: 'center' }}>{t('notification_not_sent')}</p>
                                </Row>
                              </>
                            )
                          ) : (
                            <DashboardNotificationLoader />
                          )}
                        </div>
                      </TabPane>
                    </Tabs>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="cls-least-sent-notification">
          <Col xl={16} lg={24}>
            <Row>
              <Col span={24} className="cls-least-header">
                {t('notification_analytics')}
              </Col>
            </Row>
            <Row>
              <Col span={24} className="cls-chart-data">
                <Row className="cls-chart-notification">
                  <Col span={3} offset={11} className="cls-chart-notification-data">
                    <Badge status="error" /> Not-sent
                  </Col>
                  <Col span={2} className="cls-chart-notification-data">
                    <Badge status="success" /> Sent
                  </Col>
                  <Col span={4} className="cls-chart-notification-data">
                    Notification type :
                  </Col>
                  <Col span={4} className="cls-chart-notification-dropdown">
                    {dashboardServiceStatus.isSuccess && !dashboardServiceStatus?.isFetching ? (
                      <Select defaultValue="all" placeholder="Select Status" onChange={filterHandler}>
                        {frameNotificationType()?.map((option: any) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
                <Row>
                  {dashboardServiceStatus.isSuccess && !dashboardServiceStatus?.isFetching ? (
                    <DrawLineChart
                      data={
                        chartData?.isChart
                          ? (chartData?.chartData as any)?.chart_data
                          : (dashboardData as any)?.chart_data
                      }
                      interval={filterInfo?.filter_type}
                    />
                  ) : (
                    <></>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xl={8} lg={12}>
            <Row>
              <Col span={24} className="cls-least-notification">
                <Row>
                  <Col span={2}>
                    <NotificationsIcon />
                  </Col>
                  <Col span={22} className="cls-least-header">
                    {t('least_sent_notifications')}
                  </Col>
                </Row>
                {dashboardServiceStatus?.isSuccess && !dashboardServiceStatus?.isFetching ? (
                  (dashboardServiceStatus as any)?.data?.response?.data?.most_send_notifications?.length > 0 ? (
                    (dashboardServiceStatus as any)?.data?.response?.data?.least_send_notifications?.map(
                      (leastNotificationSent: any, index: any) => {
                        return (
                          <Row key={index} className="cls-least-info">
                            <Col
                              span={3}
                              className={
                                leastNotificationSent.notification_type === 'EM'
                                  ? 'cls-notification-icon'
                                  : leastNotificationSent.notification_type === 'WA'
                                  ? 'cls-wa-dashboard-icon'
                                  : ''
                              }
                            >
                              {leastNotificationSent.notification_type === 'WA' ? (
                                <WhatsAppNotificationIcon />
                              ) : (
                                <EmailNotificationIcon />
                              )}
                            </Col>
                            <Col span={18} className="cls-notification-text">
                              <span title={leastNotificationSent.template_name}>
                                {leastNotificationSent.template_name.length > 25
                                  ? leastNotificationSent.template_name.substring(0, 25) + '...'
                                  : leastNotificationSent.template_name}
                              </span>
                              <br />
                              <span className="cls-notification-count"> {leastNotificationSent.count} </span>
                            </Col>
                            <Col
                              span={3}
                              className={
                                leastNotificationSent.notification_type === 'EM'
                                  ? 'cls-email-medal cls-medal-icon'
                                  : 'cls-medal-icon'
                              }
                            >
                              {medals[index]}
                            </Col>
                          </Row>
                        );
                      }
                    )
                  ) : (
                    <>
                      <Row className="cls-noti-empty cls-least-noti">
                        <p style={{ textAlign: 'center' }}>{t('notification_not_sent')}</p>
                      </Row>
                    </>
                  )
                ) : (
                  <DashboardNotificationLoader />
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        {isModalVisible && (
          <Modal
            title="Preview and resend"
            className="TrackingModal"
            closeIcon={<CloseCircleOutlined style={{ fontSize: 22, color: '#FF4646' }} />}
            width="90%"
            onCancel={() => {
              setIsModalVisible(false);
            }}
            open={isModalVisible}
            footer={null}
          >
            {infoResponse.data?.responseCode === 0 && (
              <TrackingModal data={infoResponse.data.response.data} mode={'tracking'} />
            )}
          </Modal>
        )}
      </div>
    </>
  );
};

export default Dashboard;
