import React, { useState } from 'react';
import { Col, Row, Input, Button, Select } from 'antd';

interface TrackingPopoverProps {
  applyFilter: () => void;
  clearFilter: () => void;
  handleApiRequest: (event: any, optionName: string) => void;
  handleFlynasContent: () => void;
  masterInfo?: any;
}

const { Option } = Select;

const TrackingPopover: React.FC<TrackingPopoverProps> = ({
  applyFilter,
  clearFilter,
  handleApiRequest,
  handleFlynasContent,
  masterInfo
}) => {
  const initialFilterValue = {
    apiRequestValue: undefined,
    settingIdValue: undefined,
    actionNameValue: undefined,
    templateNameValue: undefined,
    languageId: undefined,
    attachmentInfo: undefined,
    statusInfo: undefined,
    enviromentInfo: undefined,
    settingTypeInfo: undefined,
    notificationTypeInfo: undefined,
    apiResponseId: undefined
  };
  const [currentfilterInfo] = useState(initialFilterValue);
  let customDropDownValue: any = {
    attachmentInfo: [
      { label: 'Yes', value: 1 },
      { label: 'No', value: 2 }
    ]
  };

  const filterFields = [
    {
      label: 'Attachement',
      placeholder: 'Attachement',
      type: 'select',
      value: currentfilterInfo.attachmentInfo,
      optionType: 'custom',
      optionKey: 'attachmentInfo',
      key: 'attachmentInfo'
    },
    {
      label: 'Status',
      placeholder: 'Status',
      type: 'select',
      value: currentfilterInfo.statusInfo,
      optionKey: 'status',
      key: 'status'
    },
    {
      label: 'Request ID',
      placeholder: 'ID',
      type: 'input',
      value: currentfilterInfo.apiRequestValue,
      key: 'api_request'
    },
    {
      label: 'Setting ID',
      placeholder: 'Setting ID',
      type: 'input',
      value: currentfilterInfo.settingIdValue,
      key: 'setting_id'
    },
    {
      label: 'Action Name',
      placeholder: 'Action Name',
      type: 'input',
      value: currentfilterInfo.actionNameValue,
      key: 'action_name'
    },
    {
      label: 'Environment',
      placeholder: 'Environment',
      type: 'input',
      value: currentfilterInfo.enviromentInfo,
      key: 'environment'
    },
    {
      label: 'Notification type',
      placeholder: 'Notification type',
      type: 'select',
      value: currentfilterInfo.notificationTypeInfo,
      optionKey: 'notification_type',
      key: 'type'
    },
    {
      label: 'Setting type',
      placeholder: 'Setting type',
      type: 'select',
      value: currentfilterInfo.settingTypeInfo,
      optionKey: 'setting_type',
      key: 'setting_type'
    },
    {
      label: 'Template Name',
      placeholder: 'Template Name',
      type: 'input',
      value: currentfilterInfo.templateNameValue,
      key: 'template_name'
    },
    {
      label: 'Language Code',
      placeholder: 'Eg., EN',
      type: 'input',
      value: currentfilterInfo.languageId,
      key: 'language'
    },
    {
      label: 'Api Response id',
      placeholder: 'Api Response id',
      type: 'input',
      value: currentfilterInfo.apiResponseId,
      key: 'api_response_id'
    }
  ];

  return (
    <div className="Tracking">
      <Col xs={24}>
        {filterFields.map(({ label, placeholder, value, key, type, optionKey, optionType }) => (
          <div className="filter-item" key={key}>
            <Row className="cls-filter-options">
              <Col xs={12}>
                <label className="cls-filter-label">{label}</label>
              </Col>
              <Col xs={12}>
                {type === 'input' ? (
                  <Input
                    placeholder={placeholder}
                    allowClear
                    value={value}
                    onPressEnter={applyFilter}
                    onBlur={handleFlynasContent}
                    onChange={(event) => handleApiRequest(event, key)}
                  />
                ) : (
                  <Select
                    style={{ width: '153px' }}
                    placeholder={placeholder}
                    allowClear
                    value={value}
                    onBlur={handleFlynasContent}
                    onChange={(event) => handleApiRequest(event, key)}
                  >
                    {(optionType === 'custom' ? customDropDownValue[optionKey] : masterInfo[optionKey as any])?.map(
                      (items: any, index: any) => {
                        return (
                          <Option value={items.value ? items.value : items.id} key={index}>
                            {items.label}
                          </Option>
                        );
                      }
                    )}
                  </Select>
                )}
              </Col>
            </Row>
          </div>
        ))}
        <div className="cls-btn-section">
          <Row>
            <Col xs={24} className="cls-filter-btn cls-fixed-button">
              <Button className="cls-tracking-btn" onClick={applyFilter}>
                Apply Filter
              </Button>
              <Button className="cls-tracking-btn cls-clear-button" onClick={clearFilter}>
                Clear Filter
              </Button>
            </Col>
          </Row>
        </div>
      </Col>
    </div>
  );
};

export default TrackingPopover;
