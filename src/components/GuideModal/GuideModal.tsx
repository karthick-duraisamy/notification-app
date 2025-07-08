import React from 'react';
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import './GuideModal.scss';
import { useAppSelector } from '../../hooks/App.hook';
import { CheckGuideModal } from '../../Utils/commonFunction';
import { useDispatch } from 'react-redux';
import { setGuideModalInfo } from '../../stores/TemplateProject.store';
import { clearGuideModalInfo } from '../../stores/TemplateProject.store';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isNext: boolean;
  status: 'success' | 'error' | 'info' | 'warning'; // Use lowercase
  message: string;
  nextStep: string;
  buttonLabel?: string;
  navigateTo?: string;
  additionButtonLabel?: string;
  additionNavigateTo?: string;
  pathName?: string;
}

const statusIcons: Record<string, JSX.Element> = {
  success: <CheckCircleOutlined style={{ color: 'green', fontSize: 24 }} />,
  error: <CloseCircleOutlined style={{ color: 'red', fontSize: 24 }} />,
  info: <InfoCircleOutlined style={{ color: 'blue', fontSize: 24 }} />,
  warning: <ExclamationCircleOutlined style={{ color: 'orange', fontSize: 24 }} />
};

const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  isNext,
  status,
  message,
  nextStep,
  buttonLabel,
  navigateTo,
  additionButtonLabel,
  additionNavigateTo,
  pathName
}) => {
  const navigate = useNavigate();
  const { modalGuide } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const dispatch = useDispatch();

  // This function is used to store and clear the specific store value for integration workflow modal.(Guide)
  const handleNavigate = (navigates: any) => {
    if (pathName == 'dashboard') {
      sessionStorage.setItem('isModel', '0');
      let valueSet = CheckGuideModal(modalGuide, pathName);
      dispatch(setGuideModalInfo({ value: valueSet }));
    } else if (pathName && modalGuide.includes(pathName)) {
      dispatch(clearGuideModalInfo({ value: pathName }));
    }
    if (navigates) {
      navigate(navigates);
    }
    onClose();
  };

  return (
    <Modal className="cls-guide-model" open={isOpen} onCancel={onClose} footer={null} centered>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {statusIcons[status]} {/* Correctly maps the icon based on status */}
        <h2 style={{ textTransform: 'capitalize' }}>{status}</h2>
      </div>
      <p>{message}</p>
      <p>
        {isNext && <strong>Next Step:</strong>} {nextStep}
      </p>
      {buttonLabel && navigateTo && (
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => handleNavigate(additionNavigateTo)} className="cls-mr-10">
            {additionButtonLabel}
          </Button>
          <Button type="primary" onClick={() => handleNavigate(navigateTo)}>
            {buttonLabel}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default GuideModal;
