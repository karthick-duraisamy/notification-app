import React from 'react';
import { Button, Tooltip } from 'antd';

interface TableDataType {
  [key: string]: any;
}

interface ButtonConfig {
  icon: React.ReactNode;
  onClick: (data: TableDataType) => void;
  className?: string;
}

interface DynamicTableCellProps {
  data: TableDataType;
  title: string;
  key: string;
  width: string;
  descriptionKey: string;
  buttons: ButtonConfig[];
  className?: string;
}

const DynamicTableCell: React.FC<DynamicTableCellProps> = ({
  data,
  descriptionKey,
  buttons,
  className,
}) => {
  return (
    <div className={className}>
      {data[descriptionKey]?.length > 35 ? (
        <Tooltip title={data[descriptionKey]} mouseEnterDelay={0.5}>
          <span className="cls-description-text">
            {data[descriptionKey].substring(0, 25)}
            <span className="ellipsis">...</span>
          </span>
        </Tooltip>
      ) : (
        <span className="cls-description-text">{data[descriptionKey]}</span>
      )}
      <div className="cls-hover-actions">
        {buttons.map((button, index) => (
          <Button
            key={index}
            type="text"
            icon={button.icon}
            onClick={() => button.onClick(data)}
            className={`cls-custom-icon ${button.className}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicTableCell;
