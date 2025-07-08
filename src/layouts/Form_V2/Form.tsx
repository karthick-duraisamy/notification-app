import { Col, Row } from 'antd';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import './Form.scss';
import { useLocation } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';

interface ContainerProps {
  title: string;
  children: ReactNode;
  additionalHead?: ReactNode;
  pathname?: string;
  description?: ReactNode;
  backFunction?: any;
  isBack?: boolean;
}

const FormLayout = ({ children, title, additionalHead, description, backFunction, isBack }: ContainerProps) => {
  const { t } = useTranslation();
  let location = useLocation();

  // For hiding the Lengend
  const isManageGroupCreate = () => {
    return location?.pathname ? location.pathname.includes('/manageGroup') : false;
  };

  return (
    <>
      <Row className="dynamic-form" data-testid="form">
        <Col span={24}>
          <Row justify="space-between">
            <Col xs={12} sm={12} md={12} xl={12} xxl={12}>
              <p className={`title ${!description ? 'cls-no-subhead' : ''}`}>{title}</p>
              {description && <p className="group-description">{description}</p>}
            </Col>
            { !isManageGroupCreate &&<Col xs={12} sm={12} md={12} xl={12} xxl={12}>
              <Row align="middle" gutter={[24, 0]}>
                <Col>{additionalHead}</Col>
                {isBack === undefined ? (
                  <Col>
                    <BackButton backFunction={backFunction} />
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
            </Col>}
          </Row>
        </Col>
        <Col
          span={24}
          className={`form-container ${location.pathname.includes('campaign') ? 'cls-campaign-page-container' : ''}`}
        >
          {!isManageGroupCreate() && <div className={`cls-form-legend ${location.pathname.includes('campaign') ? 'cls-campaign-page' : ''}`}>
            {t('fill_below_details')}
          </div>}
          {children}
        </Col>
      </Row>
    </>
  );
};

export { FormLayout };
