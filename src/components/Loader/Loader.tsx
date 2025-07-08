import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import css from './Loader.module.scss';
import { memo } from 'react';

interface LoaderProps {
  fallback?: boolean;
}

const Loader = memo(({ fallback }: LoaderProps) => {
  const Loader = memo(() => {
    return (
      <div className={css['container']}>
        <div className={css['loader']}>
          <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 80, color: '#fd9646' }} />} />
        </div>
      </div>
    );
  });

  return fallback ? <Loader /> : null;
});

export { Loader };
