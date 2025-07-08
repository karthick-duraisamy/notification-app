/**
 * Author: abdul azeez
 * Description: common filter component with input, select, input with filter checkbox component
 * Input: refer ICustomFilter interface
 * labelKey: folder - Folderfilter component, search - search input, date - datepicker
 * * * * * * * * * *  searchFilter - input with filter checkbox component
 */
import { Select, Space, Input, DatePicker, Col, Row, Button } from 'antd';
import { useRef, useState } from 'react';
import { CheckOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Folder } from '../../services/folder/FolderTypes';
import { useLocation } from 'react-router-dom';
import '../FolderFilter/FolderFilter.scss';
import dayjs, { Dayjs } from 'dayjs';
import './CustomFilter.scss';
export interface ICustomFilter {
  label: string;
  labelKey: string;
  data: any[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  handler: Function;
  defaultValue?: string;
  handleButtonPress?: Function;
  value?: string | number | undefined;
  test_id?: string;
}
interface IFilterprops {
  filters: ICustomFilter[];
  pathname: string;
  searchProps?: {
    placeholder: string;
    onSearch: () => void;
    onChange: (event: any) => void;
    style?: React.CSSProperties;
    value?: string;
    setApiTriggerSetup?: Function;
  }[];
}

interface IFolderSelect {
  folders: Folder[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  handler: Function;
}
const CustomFilter = ({ filters, pathname, searchProps }: IFilterprops) => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  // Update the state and handler types
  interface DateRange {
    dates: [Dayjs | null, Dayjs | null];
    isValid: boolean;
  }

  // Update the state definition
  const [dateRange, setDateRange] = useState<DateRange>({
    dates: [null, null],
    isValid: false
  });

  const [selectedValues, setSelectedValues] = useState<{ [key: string]: any }>({});
  const [singleDate, setSingleDate] = useState<Dayjs | null>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const searchInput = useRef<Input>(null);
  const folderData = filters.filter((f) => f.labelKey === 'folder');
  const datePicker = filters.filter((f) => f.labelKey === 'date');
  const rangePicker = filters.filter((f) => f.labelKey === 'rangePicker');

  // The following method is used to disable the future date for date picker and range picker.
  const handleChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates.length === 2 && dates[0] && dates[1]) {
      const [startDate, endDate] = dates;

      // Update local state
      setDateRange({
        dates: [startDate, endDate],
        isValid: true
      });

      // Pass formatted dates to handler
      if (rangePicker[0]?.handler) {
        rangePicker[0].handler({
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD')
        });
      }
    } else {
      // Reset dates if invalid selection
      setDateRange({
        dates: [null, null],
        isValid: false
      });

      // Call handler with null values
      if (rangePicker[0]?.handler) {
        rangePicker[0].handler({
          startDate: null,
          endDate: null
        });
      }
    }
  };

  const disabledDate = (current: Dayjs | null): boolean => {
    // Prevent selecting dates in the future
    return current ? current.isAfter(dayjs().endOf('day')) : false;
  };

  const disableDate = (current?: Dayjs | null) => {
    return current ? current.isAfter(dayjs()) : false;
  };

  // Add reset handler function
  const handleReset = () => {
    // Reset all select inputs
    setSelectedValues({});

    // Reset both date pickers
    setDateRange({
      dates: [null, null],
      isValid: false
    });
    setSingleDate(null);

    // Reset the handlers
    if (datePicker.length > 0) {
      datePicker[0].handler(null);
    }
    if (rangePicker.length > 0) {
      rangePicker[0].handler(null, null);
    }

    // Reset search input
    searchProps?.forEach((prop) => {
      if (prop.onChange) {
        prop.onChange({ target: { value: '' } });
      }
    });

    // Reset folder selection if exists
    if (folderData.length > 0) {
      folderData[0].handler('all');
    }

    // Reset all other filters
    filters.forEach((filter) => {
      if (filter.handler) {
        filter.handler(undefined);
      }
    });

    // Trigger API reset
    searchProps?.[0]?.setApiTriggerSetup?.(false);
  };

  return (
    <Row justify={'space-between'}>
      <Col span={20}>
        <Space size={8} className="cls-custom-filter">
          {searchProps?.map((searchProp, index) => (
            <div className="cls-filter-item" key={`search-${index}`} style={{ marginTop: '3px' }}>
              <Input
                prefix={<SearchOutlined style={{ color: '#878a99' }} />}
                placeholder={searchProp.placeholder}
                allowClear
                onChange={searchProp.onChange}
                value={searchProp.value}
                onPressEnter={() => searchProps?.[0]?.setApiTriggerSetup?.(true)} // Trigger on Enter
              />
            </div>
          ))}
          {folderData.length > 0 && <FolderSelect folders={folderData[0].data} handler={folderData[0].handler} />}

          {filters &&
            filters.map((filter, index) => {
              return filter.labelKey !== 'folder' &&
                filter.labelKey !== 'search' &&
                filter.labelKey !== 'rangePicker' &&
                filter.labelKey !== 'date' ? (
                <Col key={index}>
                  <Row className="cls-filter-options">
                    {pathname === 'tracking' ? (
                      <Col xs={12} sm={12} md={24} lg={24} xxl={24} className="cls-label">
                        <label className="cls-custom-filter-label">{filter?.label}</label>
                      </Col>
                    ) : (
                      <></>
                    )}
                    <Col xs={12} sm={12} md={24} lg={24}>
                      <Select
                        placeholder={filter.label}
                        key={filter.label}
                        defaultValue={filter.defaultValue}
                        style={{ minWidth: pathname === 'tracking' ? 120 : 150 }}
                        className="cls-select-option"
                        onChange={(value: any) => {
                          setSelectedValues((prev) => ({ ...prev, [filter.label]: value }));
                          filter.handler(value);
                        }}
                        value={selectedValues[filter.label] || undefined}
                        data-testid={filter.test_id}
                        showSearch
                        allowClear
                        notFoundContent={'Not Found'}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option as any)?.children?.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {pathname === 'tracking' && filter.label !== 'Attachments' && filter.label !== 'Date range' ? (
                          <Option value={-1} key="all" data-testid="optionBox1">
                            All
                          </Option>
                        ) : (
                          <></>
                        )}
                        {filter.data &&
                          filter.data.map((option) => (
                            <Option key={option.label} value={option.value} data-testid="optionBox">
                              {option.label}
                            </Option>
                          ))}
                      </Select>
                    </Col>
                  </Row>
                </Col>
              ) : (
                <Row key={index}></Row>
              );
            })}
          {datePicker.length > 0 && (
            <Col>
              <Row className="cls-filter-options">
                {pathname === 'tracking' ? (
                  <Col xs={12} sm={12} md={24} lg={24} xxl={24} className="cls-label">
                    <label className="cls-custom-filter-label">{datePicker[0].label}</label>
                  </Col>
                ) : (
                  <></>
                )}
                <Col xs={12} sm={12} md={24} lg={24} xxl={24}>
                  <DatePicker
                    value={singleDate}
                    onChange={(date) => {
                      setSingleDate(date);
                      datePicker[0].handler(date ? date.toDate() : null);
                    }}
                    disabledDate={disableDate}
                  />
                </Col>
              </Row>
            </Col>
          )}
          {rangePicker.length > 0 && (
            <Col className="cls-range-picker">
              <Row>
                {pathname === 'tracking' && (
                  <Col xs={12} sm={12} md={24} lg={24} xxl={24} className="cls-label">
                    <label className="cls-custom-filter-label">Custom date range</label>
                  </Col>
                )}
              </Row>
              <Row>
                <RangePicker
                  value={dateRange.dates}
                  onChange={handleChange}
                  disabledDate={disabledDate}
                  format="YYYY-MM-DD"
                  allowEmpty={[true, true]}
                  style={{ minWidth: 220 }}
                />
              </Row>
            </Col>
          )}
        </Space>
      </Col>
      <Col className="cls-justify-center">
        <Button
          type="primary"
          className="cls-apply-button"
          icon={<CheckOutlined />}
          onClick={() => searchProps?.[0]?.setApiTriggerSetup?.(true)}
        >
          Apply
        </Button>
        <Button
          type="link"
          className="cls-reset-button"
          icon={<ReloadOutlined />}
          onClick={() => {
            searchProps?.[0]?.setApiTriggerSetup?.(true);
            handleReset();
          }}
        >
          <span>Reset</span>
        </Button>
      </Col>
    </Row>
  );
};

const FolderSelect = ({ folders, handler }: IFolderSelect) => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);
  const folderParam = queryParam.get('folder');
  const { Option } = Select;
  const totalTemplates =
    folders.length > 0 ? folders?.reduce((totalCount, currentCount) => totalCount + currentCount.count, 0) : 0;
  return (
    <Select
      placeholder="Folders"
      style={{ minWidth: 220, marginTop: '4px' }}
      className="cls-folders"
      defaultValue={folderParam}
      onChange={(value) => handler(value)}
    >
      <Option className="folder-option" value="all" key="0">
        All <span className="folder-count">{totalTemplates}</span>
      </Option>
      {folders.map((folder) => (
        <Option className="folder-option" value={folder.folder_id} key={folder.folder_name}>
          <span className="folder-name">{folder.folder_name}</span>
          <span className="folder-count">{folder.count}</span>
        </Option>
      ))}
    </Select>
  );
};

export default CustomFilter;
