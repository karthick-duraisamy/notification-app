import React, { useState, useEffect } from 'react';
import { Checkbox, Dropdown, Menu, MenuProps, Tooltip } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCreatedAt } from '../../stores/TemplateProject.store';
import './CustomTableColumn.scss';

interface CustomTableColumnCompType {
  initialColumns: any[];
  setVisibleColumn: (columns: any[]) => void;
  hideableColumns?: string[];
  selected?: string[];
  disabledSelected?: string[];
  setCreatedAt?: (value: boolean) => void; // Add this prop
  pathname: string;
}

const CustomTableColumn: React.FC<CustomTableColumnCompType> = ({
  initialColumns,
  setVisibleColumn,
  hideableColumns = [],
  selected = [],
  disabledSelected = [],
  pathname
}) => {
  const dispatch = useDispatch();
  const storedPathnames = useSelector((state: any) => state.TemplateProjectReducer.showCreatedAt);
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

  // Add createdAt to initial columns if not present
  useEffect(() => {
    if (!initialColumns.some((col: any) => col.key === 'created_at')) {
      initialColumns.push({
        title: 'Created At',
        key: 'created_at'
      });
    }
  }, [initialColumns]);

  // Update the checkbox checked state based on stored pathname
  const isCreatedAtChecked = Boolean(storedPathnames?.[pathname]);

  // To check the box to store the pathname and boolean for show up
  const handleCreatedAtToggle = (checked: boolean) => {
    dispatch(setShowCreatedAt({ 
      pathname,
      value: checked 
    }));
  };

  // Generate dropdown items dynamically
  const items: MenuProps['items'] = [
    ...initialColumns
      .filter(col => col.key !== 'created_at')
      .map((col: any, index) => ({
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
            <span
              className="cls-editcolumn-title"
              title={col.title}
            >
              {col.title === 'Created At' ? 'Created At' : col.title}
            </span>
          </div>
        ),
        key: `${col.key}_${index}` 
      })),
    {
    label: (
      <div className="cls-slect-option">
        <Checkbox
          checked={isCreatedAtChecked}
          onChange={(e) => handleCreatedAtToggle(e.target.checked)}
        />
        <span className="cls-editcolumn-title">
          Created At
        </span>
      </div>
    ),
    key: `created_at_${pathname}`
  } 
  ].filter((item: any) => !hideableColumns.includes(item.key?.split('_')[0]));

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
