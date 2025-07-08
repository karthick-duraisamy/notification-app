import { Button, Col, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const BackButtons = styled(Button)`
  background: #d8d8d8;
  color: #0c28a8;
  border-radius: 6px;
`;

interface BackButtonProps {
  backFunction?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ backFunction }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackClick = () => {
    if (backFunction) {
      backFunction();
    } else {
      navigate(-1);
    }
  };

  return (
    <Row justify="end">
      <Col data-testid="backbutton">
        <BackButtons
          className="back-btn"
          onClick={handleBackClick}
          type="default"
          icon={<ArrowLeftOutlined />}
          size="small"
        >
          {t('back')}
        </BackButtons>
      </Col>
    </Row>
  );
};

export { BackButton };
