import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const DeleteNotification = (props: any) => {
  Modal.confirm({
    title: 'Warning!',
    icon: <ExclamationCircleOutlined />,
    content: 'Related mapping exists, Do you want to delete?',
    onOk() {
      props.serviceMethod(props.id);
      // console.log(props);
    },
    onCancel() {
      return;
    }
  });
};

export { DeleteNotification };
