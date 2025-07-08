import { useAppSelector } from '../../../../../../hooks/App.hook';
import { PreviewMode } from '@/stores/Modal.store';
import { DesktopOutlined, MobileOutlined, TabletOutlined } from '@ant-design/icons/lib/icons/';
import { Space } from 'antd';

export const PreviwModalTitle = () => {
  const { mode } = useAppSelector((state) => state.ModalReducer.previewModal);

  const Icon = () => {
    switch (mode) {
      case PreviewMode.desktop:
        return [<DesktopOutlined />, <span>Desktop preview</span>];
      case PreviewMode.mobile:
        return [<MobileOutlined />, <span>Mobile preview</span>];
      case PreviewMode.tablet:
        return [<TabletOutlined />, <span>Tablet preview</span>];
    }
  };

  return (
    <div style={{ display: 'inline' }}>
      <Space size="small">{Icon()}</Space>
    </div>
  );
};
