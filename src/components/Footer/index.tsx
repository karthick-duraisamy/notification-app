import { Col, Row } from 'antd';
import css from './Footer.module.scss';

const Footer = () => {
  return (
    <Row className={css['footer']}>
      <Col className={css['text']}><p>Powered by Infiniti Software Solution</p></Col>
      <Col className={css['text']}><p>Copyright @ 2021 - {new Date().getFullYear()}. All rights Reserved</p></Col>
    </Row>
  );
};

export { Footer };
