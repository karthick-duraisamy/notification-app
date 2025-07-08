import React, { useState, useEffect } from 'react';
import { Checkbox, Dropdown, Menu, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './CustomTableColumn.scss';

type CustomTableColumnCompType = {
  initialColumns: any[];
  setVisibleColumn: (visibleColumn: any) => void;
  selected?: string[];
  hideableColumns?: string[];
  disabledSelected?: string[];
};

const CustomTableColumn: React.FC<CustomTableColumnCompType> = ({
  initialColumns,
  setVisibleColumn,
  hideableColumns = [],
  selected = [],
  disabledSelected = []
}) => {
  const [open, setOpen] = useState(false);

  // Initialize the selected column keys. If selected is provided, use that. Otherwise, select all columns by default.
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    selected.length > 0 ? selected : initialColumns.map((col: any) => col.key)
  );

  // The following useEffect used to update visible columns when user check or uncheck the column
  useEffect(() => {
    setVisibleColumn(initialColumns.filter((col: any) => selectedColumnKeys.includes(col.key)));
  }, [selectedColumnKeys, setVisibleColumn]);

  // The following is trigged when user check or uncheck the column fields
  const handleColumnChange = (checkedValues: string[]) => setSelectedColumnKeys(checkedValues);

  // Generate dropdown items dynamically
  const items: MenuProps['items'] = initialColumns
    .map((col: any) => ({
      label: (
        <div
          className="cls-slect-option"
          onClick={() => {
            if (!disabledSelected.includes(col.key)) {
              handleColumnChange(
                selectedColumnKeys.includes(col.key)
                  ? selectedColumnKeys.filter((key) => key !== col.key)
                  : [...selectedColumnKeys, col.key]
              );
            }
          }}
        >
          <Checkbox
            checked={selectedColumnKeys.includes(col.key)}
            onChange={(e) =>
              handleColumnChange(
                e.target.checked
                  ? [...selectedColumnKeys, col.key]
                  : selectedColumnKeys.filter((key: any) => key !== col.key)
              )
            }
            disabled={disabledSelected.includes(col.key)}
          />
          <span className="cls-editcolumn-title" title={col.title}>
            {col.title}
          </span>
        </div>
      ),
      key: col.key
    }))
    .filter((item: any) => !hideableColumns.includes(item.key));

  return (
    <Dropdown
      className="cls-custom-table-column"
      overlay={<Menu items={items} />}
      trigger={['click']}
      open={open}
      onOpenChange={() => setOpen((prev) => !prev)}
    >
      <Tooltip title="Edit Columns">
        <MenuOutlined />
      </Tooltip>
    </Dropdown>
  );
};

export default CustomTableColumn;
