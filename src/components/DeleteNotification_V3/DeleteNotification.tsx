import { Checkbox, Modal, notification } from 'antd';
import './DeleteNotification.scss';
import { SuccessAnimation } from '../AnimationsExport/AnimationsExport';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { DeleteNotificationIcon } from '../Icons/Icons';

interface DeleteNotificationProps {
  serviceMethod: (id: any, options?: { forceDeletion?: boolean }) => Promise<any>;
  deletingData: {
    id: string | number;
    isDeleteNotify: boolean;
    representingName?: string;
    concernConfig?: {
      message: string;
      warningText?: string;
    };
  };
  setDeleteNotify: (value: boolean) => void;
}

const DeleteNotification = ({ serviceMethod, deletingData, setDeleteNotify }: DeleteNotificationProps) => {
  const [concernSwitch, setConcernSwitch] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOk = async () => {
    try {
      setIsDeleting(true);
      await serviceMethod(deletingData.id, {
        forceDeletion: deletingData.concernConfig ? concernSwitch : undefined
      });
      setIsDeleting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setDeleteNotify(false);
      }, 2000);
    } catch (error: any) {
      setDeleteNotify(false);
      notification.error({
        message: 'Delete operation failed',
        description: error || 'Delete operation failed'
      });
    }
  };

  const handleCancel = () => {
    setDeleteNotify(false);
    setConcernSwitch(false);
  };

  return (
    <Modal
      open={deletingData.isDeleteNotify}
      onOk={handleOk}
      onCancel={handleCancel}
      className="cls-delete-confirmation-modal"
      okButtonProps={{ disabled: isDeleting || isSuccess }}
      cancelButtonProps={{ disabled: isDeleting || isSuccess }}
      width={500}
      height={360}
    >
      <div className="cls-delete-modal-content">
        {!isSuccess && !isDeleting && <DeleteNotificationIcon />}
        {isDeleting && <DeleteNotificationIcon />}
        {isSuccess && <SuccessAnimation />}
        <h1>Warning!</h1>
        <p>{isSuccess ? 'Deleted successfully!' : `Do you want to delete? ${deletingData?.representingName || ''}`}</p>

        {!isSuccess && deletingData.concernConfig && (
          <>
            <div className="cls-delete-concern">
              <Checkbox
                checked={concernSwitch}
                onChange={(e) => setConcernSwitch(e.target.checked)}
                disabled={isDeleting}
              >
                {deletingData.concernConfig.message}
              </Checkbox>
            </div>
            {concernSwitch && (
              <div className="cls-delete-warning">
                <span>
                  <InfoCircleOutlined />
                  Warning: {deletingData.concernConfig.warningText || deletingData.concernConfig.message} permanently.
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default DeleteNotification;
