import { Col, Row } from 'antd';
import { EnvelopIcon, SMSNotificationIcon, WhatsAppIcons } from '@/components/Icons/Icons';
import { useTranslation } from 'react-i18next';

const getIcon = (type: string) => {
  switch (type) {
    case 'EM':
      return <EnvelopIcon />;
    case 'WA':
      return <WhatsAppIcons />;
    default:
      return <SMSNotificationIcon />;
  }
};

const NotificationStatus: React.FC<any> = ({ data, dataLength }) => {
  const { t } = useTranslation();
  const { type, total_notification } = data;

  const color = { success: '#51D166', queue: '#F1C21B', failure: '#FF0000' };
  return (
    <Col
      xl={dataLength === 3 || dataLength % 3 == 0 ? 8 : dataLength === 2 ? 12 : dataLength === 1 ? 16 : 8}
      lg={dataLength === 3 ? 8 : dataLength === 2 ? 12 : 15}
      md={12}
      sm={24}
      xs={24}
      className="cls-summary-mainEle"
    >
      <Row className={dataLength === 1 ? 'cls-notify-width' : ''}>
        <Col span={24} className={dataLength >= 3 ? 'cls-summary-ele cls-summary-ele-height' : 'cls-summary-ele'}>
          <Row>
            <Col span={24}>
              {dataLength > 2 ? (
                <Row>
                  <Col span={16}>
                    <h4>
                      {type === 'EM'
                        ? t('Email')
                        : type === 'WA'
                        ? t('Whatsapp')
                        : type === 'PN'
                        ? t('Push_notification')
                        : type}
                    </h4>
                  </Col>
                  <Col className="cls-total-count" span={8}>
                    Total : <span>{type == 'PN' ? 400 : total_notification}</span>
                  </Col>
                </Row>
              ) : (
                ''
              )}
            </Col>
          </Row>
          <Row>
            <Col
              span={3}
              className={
                type === 'EM'
                  ? 'cls-email-icon  cls-icon-col'
                  : type === 'WA'
                  ? 'cls-wa-icon  cls-icon-col'
                  : type === 'PN'
                  ? 'cls-sms-icon cls-icon-col'
                  : ''
              }
            >
              {getIcon(type)}
            </Col>
            {dataLength <= 2 ? (
              <Col span={dataLength === 1 ? 3 : 4} className="cls-notify-title-count">
                <Row>
                  <h4>
                    {type === 'EM' ? 'Email' : type === 'WA' ? 'Whatsapp' : type === 'PN' ? 'Push Notification' : type}
                  </h4>
                </Row>
                <Row className="cls-total-count">
                  Total : <span>{total_notification}</span>
                </Row>
              </Col>
            ) : (
              ''
            )}
            <Col
              span={dataLength === 1 ? 18 : dataLength === 2 ? 16 : dataLength > 2 ? 18 : 18}
              className="cls-details"
            >
              {type == 'PN' ? (
                <Row className="cls-summary-txt">
                  <Col xl={dataLength >= 3 ? '' : 8} lg={dataLength >= 3 ? 7 : 7}>
                    Total mail
                  </Col>
                  <Col xl={dataLength >= 3 ? '' : 8} lg={dataLength >= 3 ? 7 : 7}>
                    AI Response
                  </Col>
                  <Col xl={dataLength >= 3 ? '' : 8} lg={dataLength >= 3 ? 7 : 7}>
                    Manual
                  </Col>
                </Row>
              ) : (
                <Row className="cls-summary-txt">
                  <Col xl={dataLength >= 3 ? 8 : 8} lg={dataLength >= 3 ? '' : 7}>
                    Sent
                  </Col>
                  <Col xl={dataLength >= 3 ? 8 : 8} lg={dataLength >= 3 ? '' : 7}>
                    Queue
                  </Col>
                  <Col xl={dataLength >= 3 ? 8 : 8} lg={dataLength >= 3 ? '' : 7}>
                    Not - Sent
                  </Col>
                </Row>
              )}

              <Row className="cls-progress-percent">
                {Object.entries(data)
                  .filter(([key]) => ['success', 'queue', 'failure'].includes(key))
                  .map(([key, value]) => (
                    <Col
                      span={dataLength >= 3 ? 7 : 8}
                      key={key}
                      style={{
                        color: color[key as keyof typeof color]
                      }}
                      className={dataLength >= 3 && key == 'failure' ? 'cls-not-sent' : ''}
                    >
                      {type == 'PN'
                        ? key == 'success'
                          ? 400
                          : key == 'queue'
                          ? 365
                          : 35
                        : `${parseFloat(value as string).toFixed(0)}%`}
                    </Col>
                  ))}
              </Row>
              <Row
                className={
                  dataLength >= 3
                    ? 'cls-notification-progress-bar cls-bar-width3'
                    : `cls-notification-progress-bar cls-bar-width${dataLength}`
                }
              >
                <Col className="cls-progress-bar">
                  {Object.entries(data)
                    .filter(([key]) => ['success', 'queue', 'failure'].includes(key))
                    .map(([key, value]) => (
                      <div
                        key={key}
                        style={{
                          width: `${parseFloat(value as string)}%`,
                          backgroundColor: color[key as keyof typeof color],
                          height: '100%'
                        }}
                      ></div>
                    ))}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default NotificationStatus;
