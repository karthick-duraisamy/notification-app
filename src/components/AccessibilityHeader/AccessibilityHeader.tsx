import { Button, Col, Radio, Row } from 'antd';
import type { RadioChangeEvent } from 'antd';
import './AccessibilityHeader.scss';
import { useTheming } from '../../hooks/Theme.hook';

const AccessibilityHeader = () => {
  const { changeTheme } = useTheming();

  // handle contrast theme change

  return (
    <Row className="AccessibilityHeader" align="middle">
      <Col className="cls-contrast-cont d-iblock">
        Contrast :
        <Radio.Group
          className="custom-radio cls-contrast rounded d-iblock"
          value="default"
          onChange={(e: RadioChangeEvent) => {
            changeTheme(e.target.value);
          }}
        >
          <Radio.Button className="rounded" value="light">
            <span className="cls-default">Default</span>
          </Radio.Button>
          <Radio.Button value="contrast-bw">
            <span className="cls-bw rounded">A</span>
          </Radio.Button>
          <Radio.Button value="contrast-by">
            <span className="cls-by rounded">A</span>
          </Radio.Button>
          <Radio.Button data-testid="acccessibility_color_change" value="contrast-yb">
            <span className="cls-yb rounded">A</span>
          </Radio.Button>
        </Radio.Group>
      </Col>
      <Col>
        <Button type="link" className="mr-2 pr-2">
          Accessibility
        </Button>
      </Col>
      <Col className="cls-fsize-cont d-iblock">
        Font size :
        <span className="cls-fsize rounded">
          <button className="cls-default">Default</button>
          <button className="text-dark px-2">0-</button>
          <button className="text-dark">0+</button>
        </span>
      </Col>
    </Row>
  );
};
export default AccessibilityHeader;
