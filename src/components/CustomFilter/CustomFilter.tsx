/**
 * Author: abdul azeez
 * Description: common filter component with input, select, input with filter checkbox component
 * Input: refer ICustomFilter interface
 * labelKey: folder - Folderfilter component, search - search input, date - datepicker
 * * * * * * * * * *  searchFilter - input with filter checkbox component
 */
import { Select, Space, Input, DatePicker, Col, Row, notification } from 'antd';
import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import '../FolderFilter/FolderFilter.scss';
import type { Folder } from '../../services/folder/FolderTypes';
import dayjs, { Dayjs } from 'dayjs';
import './CustomFilter.scss';
import { formatNumber } from '@/Utils/commonFunction';

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
    style: {
      marginTop: string;
    };
    value: string | undefined;
  }[];
}
interface IFolderSelect {
  folders: Folder[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  handler: Function;
  placeHolder?: string;
}
const CustomFilter = ({ filters, pathname }: IFilterprops) => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const searchInput = useRef<Input>(null);
  const [searchInputValue, setSearchInputValue] = useState('');
  filters = filters.filter((obj, index) => {
    return index === filters.findIndex((o) => obj.labelKey === o.labelKey && obj.label === o.label);
  });
  const folderData = filters.filter((f) => f.labelKey === 'folder');
  const search = filters.filter((f) => f.labelKey === 'search');
  const datePicker = filters.filter((f) => f.labelKey === 'date');
  const rangePicker = filters.filter((f) => f.labelKey === 'rangePicker');
  // const isDateRange = filters.filter((f) => f.labelKey === "dateRange");
  const searchHandler = () => {
    if (pathname === 'template') {
      search[0].handler(searchInputValue);
    } else {
      search[0].handler(searchInput.current ? searchInput.current.state.value : undefined);
    }
  };

  // The following method is used to disable the future date for date picker and range picker.
  const handleChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0]) {
      const startDate = dates[0];
      let endDate = dates[1];

      if (endDate && endDate.diff(startDate, 'day') <= 30) {
        setDates([startDate, endDate]);
      } else {
        notification.warning({
          message: 'Please select a date within a 30-day range'
        });
        endDate = startDate.add(30, 'day');
        setDates([startDate, endDate]);
      }

      rangePicker[0].handler(startDate?.toDate(), endDate?.toDate());
    } else {
      setDates([null, null]);
    }
  };

  const disabledDate = (current: Dayjs | null): boolean => {
    return current ? current.isAfter(dayjs().endOf('day')) : false;
  };

  const disableDate = (current?: any) => {
    return current && current > Date.now();
  };

  const handleSearchInput = (event: any) => {
    if ((search[0] as any).handleButtonPress) (search[0] as any).handleButtonPress(event.target.value);
    setSearchInputValue(event.target.value);
  };

  return (
    <Space size={8} className="cls-custom-filter">
      {search.length > 0 && (
        <Input
          ref={searchInput}
          suffix={<SearchOutlined style={{ color: '#666' }} onClick={searchHandler} />}
          placeholder="Search"
          data-testid="customFilterSearch"
          allowClear
          value={search[0].value ? search[0].value : undefined}
          onChange={handleSearchInput}
          onPressEnter={searchHandler}
        />
      )}
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
                    // defaultValue={
                    //   isDateRange.length > 0
                    //     ? datePicker.length > 0 && pathname === 'tracking'
                    //       ? 'created_at'
                    //       : rangePicker.length > 0 && pathname === 'tracking'
                    //         ? 'custom'
                    //         : 'today'
                    //     : undefined
                    // }
                    defaultValue={filter.defaultValue}
                    style={{ minWidth: pathname === 'tracking' ? 120 : 150 }}
                    className="cls-select-option"
                    onChange={(value: any) => filter.handler(value)}
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
              <DatePicker onChange={(date) => datePicker[0].handler((date as any)?._d)} disabledDate={disableDate} />
            </Col>
          </Row>
        </Col>
      )}
      {rangePicker.length > 0 && (
        <Col className="cls-range-picker">
          <Row>
            <label className="cls-custom-filter-label">Custom date range </label>
          </Row>
          <Row>
            <RangePicker value={dates} onChange={handleChange} disabledDate={disabledDate} />
          </Row>
        </Col>
      )}
    </Space>
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
      style={{ minWidth: 220 }}
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

export const GroupSelect = ({ folders, handler, placeHolder, selectedValue }: any) => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);
  const folderParamRaw = queryParam.get('folder');
  const folderParam = folderParamRaw ? folderParamRaw.split(',') : [];

  const { Option } = Select;

  const totalTemplates =
    folders.length > 0
      ? folders.reduce((totalCount: any, currentCount: any) => totalCount + currentCount?.contact_count, 0)
      : 0;

  // To give the group_ids and their total contact count.
  const handleChange = (selectedValues: string[]) => {
    if (selectedValues.includes('all')) {
      const allGroupIds = folders.map((folder: { group_id: any }) => folder.group_id);
      handler(allGroupIds, totalTemplates);
    } else {
      const selectedCount = folders
        .filter((folder: { group_name: string }) => selectedValues.includes(folder.group_name))
        .reduce((total: any, folder: { contact_count: any }) => total + (folder.contact_count || 0), 0);

      const selectedGroupIds = folders
        .filter((folder: { group_name: string }) => selectedValues.includes(folder.group_name))
        .map((folder: { group_id: any }) => folder.group_id);

      handler(selectedGroupIds, selectedCount);
    }
  };

  return (
    <Select
      mode="multiple"
      placeholder={placeHolder || 'Folders'}
      style={{ minWidth: 220 }}
      className="cls-groups"
      defaultValue={folderParam}
      onChange={handleChange}
      allowClear
      value={selectedValue}
    >
      <Option className="folder-option" value="all" key="0">
        All <span className="folder-count">{formatNumber(totalTemplates)}</span>
      </Option>
      {folders.map((folder: any) => (
        <Option className="folder-option" value={folder?.group_name} key={folder?.group_id}>
          <span className="folder-name">{folder?.group_name}</span>
          <span className="folder-count">{formatNumber(folder?.contact_count)}</span>
        </Option>
      ))}
    </Select>
  );
};

export default CustomFilter;
