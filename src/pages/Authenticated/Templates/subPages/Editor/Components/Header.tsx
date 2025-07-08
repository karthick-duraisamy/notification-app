import { Badge, Col, Row } from 'antd';
export const Header = () => {
  return (
    <Row style={{ background: '#f5f5f5' }} align="middle">
      <Col style={{ padding: '12px 16px' }}>
        <Badge color="#FEBA2C" />
        <Badge color="#5344FF" />
        <Badge color="#24DAC5" />
      </Col>
    </Row>
  );
};
