import { Button, Checkbox, Dropdown, Menu, Space, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setActionName,
  setApiRequestID,
  setApiResponseId,
  setCreatedAtDate,
  setCreatedEndDate,
  setCreatedStartDate,
  setDynamicFilterInfo,
  setEnvironment,
  setFilterFieldsOptions,
  setIsCustomDateInfo,
  setLanguage,
  setNotificationType,
  setSettingId,
  setSettingType,
  setStatusOptions,
  setTemplateName
} from '../../stores/DynamicFilter.store';
import './DynamicFilter.scss';
import { useAppSelector } from '../../hooks/App.hook';
import { MenuIcon } from '../Icons/Icons';

const DynamicFilter = (props: any) => {
  const [selectedFilters, setSelectedFilters] = useState<any>(['Date range']);
  const { project } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const [menuVisible, setMenuVisible] = useState(false);
  const dispath = useDispatch();
  const { filterOption } = useAppSelector((state) => state.DynamicFilterReducer);
  // const { filterOption } = useAppSelector((state) => state.DynamicFilterReducer);
  // if (
  //   selectedFilters &&
  //   selectedFilters?.filter((Item: any) => Item === 'Custom Date').length === 0 &&
  //   filterOption?.filter((item: any) => item === 'Custom Date').length > 0
  // ) {
  //   let data = JSON.parse(JSON.stringify(selectedFilters));
  //   data = data.push('Custom Date');
  //   setSelectedFilters(data);
  // }

  const [filterOptions, setFilterOptions] = useState(props?.options);
  const handleMenuClick = (e: any) => {
    const value = e.key;

    // Close the dropdown on 'Apply' button click
    // if (value === 'apply') setMenuVisible(false);

    // Reset selected filters on 'Reset' button click
    // if (value === 'reset') setSelectedFilters([]);

    if (filterOptions.includes(value)) {
      if (value === 'Created on' && selectedFilters?.filter((item: any) => item === 'Date range').length === 0) {
        dispath(setCreatedStartDate(undefined));
        dispath(setCreatedEndDate(undefined));
      }
      if (value === 'Date range' && selectedFilters?.filter((item: any) => item === 'Created on').length === 0)
        dispath(setCreatedAtDate(undefined));
      if (
        (value === 'Created on' && selectedFilters?.filter((item: any) => item === 'Date range').length === 0) ||
        (value === 'Date range' && selectedFilters?.filter((item: any) => item === 'Created on').length === 0) ||
        (value !== 'Date range' && value !== 'Created on')
      ) {
        if (value === 'Date range' && selectedFilters?.filter((item: any) => item === 'Date range').length > 0)
          dispath(setIsCustomDateInfo(false));
        if (selectedFilters.includes(value)) {
          setSelectedFilters(selectedFilters?.filter((item: any) => item !== value));
          if (value === 'Api request') dispath(setApiRequestID(undefined));
          if (value === 'Setting Id') dispath(setSettingId(undefined));
          if (value === 'Action name') dispath(setActionName(undefined));
          if (value === 'Template name') dispath(setTemplateName(undefined));
          if (value === 'Language code') dispath(setLanguage(undefined));
          if (value === 'Attachments') dispath(setFilterFieldsOptions(undefined));
          if (value === 'Status') dispath(setStatusOptions(undefined));
          if (value === 'Notification') dispath(setNotificationType(undefined));
          if (value === 'Setting type') dispath(setSettingType(undefined));
          if (value === 'Environment') dispath(setEnvironment(undefined));
          if (value === 'Api response id') dispath(setApiResponseId(undefined));
          if (value === 'Created on') dispath(setCreatedAtDate(undefined));
          if (value === 'Date range') {
            dispath(setCreatedStartDate(undefined));
            dispath(setCreatedEndDate(undefined));
          }
        } else {
          setSelectedFilters([...selectedFilters, value]);
        }
      } else {
        notification.error({
          message: "Not able to select 'Created on' and 'Date range' filters together. Select any one filter."
        });
      }
    }
  };

  useEffect(() => {
    setSelectedFilters(['Date range']);
  }, [project]);

  useEffect(() => {
    if (filterOption.length == 0) setSelectedFilters(['Date range']);
  }, [filterOption.length == 0]);

  useEffect(() => {
    dispath(setDynamicFilterInfo(selectedFilters));
  }, [dispath, selectedFilters]);

  const handleVisibleChange = (flag: any) => {
    setMenuVisible(flag);
  };
  useEffect(() => {
    const itemsToRemove = ['Api request', 'Action name', 'Template name', 'Setting Id'];
    let filteredArray;
    if (sessionStorage?.getItem('iframe_token')) {
      filteredArray = filterOptions.filter((item: any) => !itemsToRemove.includes(item));
      setFilterOptions(filteredArray);
    }
  }, [sessionStorage?.getItem('iframe_token')]);
  const menu = (
    <Menu onClick={handleMenuClick}>
      {filterOptions.map((option: any) => (
        <Menu.Item className="cls-filter-opt" key={option}>
          <Checkbox checked={selectedFilters.includes(option)}>{option}</Checkbox>
        </Menu.Item>
      ))}
      <Menu.Divider />
      {/* Uncommand the following line when 'Apply' and 'Reset' button needed */}
      {/* <Menu.Item key="apply" style={{ textAlign: 'center' }}>
        <Button type="link">Apply</Button>
      </Menu.Item>
      <Menu.Item key="reset" style={{ textAlign: 'center' }}>
        <Button type="link">Reset</Button>
      </Menu.Item> */}
    </Menu>
  );

  return (
    <Space className="mr-2">
      <Dropdown
        className="cls-filter-downdown"
        overlay={menu}
        trigger={['click']}
        open={menuVisible}
        onOpenChange={handleVisibleChange}
      >
        <Button>
          <MenuIcon /> <i className="anticon anticon-filter" />
        </Button>
      </Dropdown>
    </Space>
  );
};

export default DynamicFilter;
