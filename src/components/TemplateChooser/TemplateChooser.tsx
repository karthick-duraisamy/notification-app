import type { ReactNode } from 'react';
import { Col, Row } from 'antd';
import css from './TemplateChooser.module.scss';

interface TemplateChooserProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}

const TemplateChooser = ({ icon, title, subtitle, onClick }: TemplateChooserProps) => (
  <div className={css['container']} data-testid="TemplateChooser" onClick={onClick}>
    <Row className={css['row']} align="middle">
      <Row align="top" style={{ width: '100%' }}>
        <Col span={24} className={css['icon']}>
          {icon}
        </Col>
        <Col span={24}>
          <h3 className="f-sbold">{title}</h3>
        </Col>
        <Col span={24} className={css['subtitle']}>
          <span>{subtitle}</span>
        </Col>
      </Row>
    </Row>
  </div>
);

export { TemplateChooser };
