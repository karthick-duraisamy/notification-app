import { Col, Row, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Language from '@/components/Language/Language';
import './PageNotFound.scss';
import { Logo } from '@/components/Logo/Logo';
import { Theme } from '@/components/Theme/Theme';

const PageNotFound = () => {
  const navigate = useNavigate();
  const previousPage = () => {
    navigate(-1);
  };
  return (
    <>
      <Row data-testid="PageNotFound" align="top" justify="start" className='cls-pagenotfound-logo'>
        <Col xs={12} sm={12} md={13} lg={16} xl={0} xxl={19}>
          <Logo />
        </Col>
        <Col xs={0} sm={0} md={6} lg={5} xl={3} xxl={3}>
          <Theme />
        </Col>
        <Col xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} className='cls-select-language'>
          <Language />
        </Col>
      </Row>
      <Row align="top" justify="center" className="PageNotFound">
        <Col>
          <div className="image"></div>
          <div className="heading">Page not found !</div>
          <div className="help-text">We can’t find the page you are looking for</div>
          <Button type="primary" data-testid="previous_btn" onClick={previousPage}>
            Back to previous page
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PageNotFound;
