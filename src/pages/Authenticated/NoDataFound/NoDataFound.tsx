import { Col, Row } from 'antd';
import './NoDataFound.scss';
import { useTranslation } from 'react-i18next';

const NoDataFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <Row align="top" justify="center" className="PageNotFound">
        <Col>
          <div className="image"></div>
          <div className="heading">{t('no_menu_mapped')}</div>
          {/* <div className="help-text">We can’t find the page you are looking for</div> */}
        </Col>
      </Row>
    </>
  );
};

export default NoDataFound;
