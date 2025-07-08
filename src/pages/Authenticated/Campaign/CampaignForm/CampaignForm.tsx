import './CampaignForm.scss';
import { Col, Form, Input, Row, Select, Steps, Button, Tabs, Modal, Pagination, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TrackingModal from '../../Tracking/TrackingModal';
import {
  RocketOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  ArrowLeftOutlined as Back
} from '@ant-design/icons';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import { useAppSelector } from '../../../../hooks/App.hook';
import { FormLayout } from '../../../../layouts/Form/Form';
import FolderFilter from '@/components/FolderFilter/FolderFilter';
import { useLazyGetFolderQuery } from '../../../../services/folder/Folder';
import { useAddCampaignMutation, useLazyGetCampaignMasterInfoQuery, useLazyGetTemplateForCampaignQuery } from '../../../../services/campaign/campaign';
import { useSettingSelect } from '../../../../hooks/SettingForm.hook';
import ContactInfo from '@/components/ContactInfo/ContactInfo';
import { dateFormat } from '../../../../Utils/date';
import { useLazyGetTemplateQuery } from '../../../../services/templates/Templates';
import { useLazyGetGroupsListQuery } from '../../../../services/contacts/groups/Group';
import ContactGroupCard from '@/components/ContactGroupCard/ContactGroupCard';

const { Option } = Select;
const steps = [
  {
    title: 'Campaign Basics'
  },
  {
    title: 'Select Contacts'
  },
  {
    title: 'Schedule Launch'
  }
];

const CampaignForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [getFolderInfo, getFolderInfoStatus] = useLazyGetFolderQuery();
  let { project } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const [campaignMasterInfo, campaignMasterInfoStatus] = useLazyGetCampaignMasterInfoQuery();
  const [getTemplateInfo, getTemplateInfoStatus] = useLazyGetTemplateForCampaignQuery();
  const [current, setCurrent] = React.useState(0);
  const { options } = useSettingSelect();
  const [folderId, setFolderId] = useState<number | undefined>(undefined);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [templateInfo, setTemplateInfo] = useState(undefined);
  const [getTemplateService, getTemplateServiceStatus] = useLazyGetTemplateQuery();
  const [addCampaignService] = useAddCampaignMutation();
  const [completeTemplateData, setCompleteTemplateData] = useState<any>(undefined);
  const [schedulerType, setSchedulerType] = useState<string | undefined>(undefined);
  const [filedsValSelect, setFieldsValSelect] = useState<any>(undefined);
  const [createFormValue, setCreateFormValue] = useState({});
  const [groupNameSearch, setGroupNameSearch] = useState<any>(undefined);
  const [topicValSelect, setTopicValSelect] = useState(undefined)
  const [templateButtonHide, setTemplateButtonHide] = useState(false);
  const [selectedContactview, setSelectedContactView] = useState<string | undefined>(undefined);

  // The following useEffect is used to trigger the folder list api
  useEffect(() => {
    getFolderInfo({
      pathname: 'template',
      project: project
    });
  }, []);

  // The following useEffect is used to trigger the folder list api when project is modified
  useEffect(() => {
    getFolderInfo({
      pathname: 'template',
      project: project
    });
  }, [project]);

  // The following useEffect is tiggered to get preview template data when user select the template.
  useEffect(() => {
    templateInfo !== undefined &&
      folderId !== undefined &&
      getTemplateService({ template_id: templateInfo, folder: folderId?.toString() });
  }, [templateInfo]);

  // The following useEffect is triggered when preview api response is completed
  useEffect(() => {
    console.log(getTemplateServiceStatus);
    console.log((getTemplateServiceStatus as any)?.data?.response?.data);
    getTemplateServiceStatus?.isSuccess &&
      setCompleteTemplateData((getTemplateServiceStatus as any)?.data?.response?.data);
  }, [getTemplateServiceStatus]);

  const [groupNameFilter, setGroupNameFilter] = useState({
    project: project,
    page: 1,
    name: undefined,
    r_topic: undefined
  });

  // The following line is used to define the service name and their respective value for getting group list
  const [getGroupsData, getGroupsDataStatus] = useLazyGetGroupsListQuery();
  const [selectedGroupId, setSelectedGroupId] = React.useState<any>(undefined);

  // The following useEffect is triggered to get the group data
  useEffect(() => {
    project !== undefined && project !== null && getGroupsData(groupNameFilter);
  }, [groupNameFilter]);

  // The following useEffect is triggered to get the template info against the select folder
  useEffect(() => {
    folderId !== undefined && getTemplateInfo({ folderId: folderId });
  }, [folderId]);

  // The following useEffect is triggered to get campaign master information
  useEffect(() => {
    project !== undefined && project !== null && campaignMasterInfo({ project: project });
  }, []);

  // The following useEffect is triggered to get campaign master information when project is modified
  useEffect(() => {
    project !== undefined && project !== null && campaignMasterInfo({ project: project });
  }, [project]);

  // The following method is used to validation the fields will be filled or not
  const isAllFieldsFilled = (obj: Record<string, any>, optionalFields: string[] = []): boolean => {
    return Object.entries(obj).every(([key, value]) => {
      if (optionalFields.includes(key)) {
        return true; // skip optional fields
      }
      return value !== null && value !== undefined && (typeof value !== 'string' || value.trim() !== '');
    });
  };

  const formSubmit = (_values?: any) => {
    let formValues = form.getFieldsValue();
    if (isAllFieldsFilled(formValues, ['launch_option'])) {
      let scheduler: any = {};
      switch (schedulerType) {
        case '681e080347e451e50daa3cb9': // NOW
          scheduler = {
            r_launch_option: '681e080347e451e50daa3cb9'
          };
          break;
        case '681e080347e451e50daa3cba': // NOWB
          scheduler = {
            r_launch_option: '681e080347e451e50daa3cba',
            batch_details: {
              batch_size: Number(formValues?.batch_size),
              interval_minutes: Number(formValues?.interval_minute)
            }
          };
          break;
        case '681e080347e451e50daa3cbb': // FTZ
          scheduler = {
            r_launch_option: '681e080347e451e50daa3cbb',
            scheduled_date: formValues?.scheduled_date,
            scheduled_time: formValues?.scheduled_time,
            time_zone: formValues?.time_zone
          };
          break;
        case '681e080347e451e50daa3cbd': // FTZB
          scheduler = {
            r_launch_option: '681e080347e451e50daa3cbd',
            scheduled_date: formValues?.scheduled_date,
            scheduled_time: formValues?.scheduled_time,
            time_zone: formValues?.time_zone,
            batch_details: {
              batch_size: formValues?.batch_size,
              interval_minutes: formValues?.interval_minute
            }
          };
          break;
        case '6818695071c05d94b88043fd': // RTZ
          scheduler = {
            r_launch_option: '6818695071c05d94b88043fd',
            time_zone: formValues?.time_zone,
            send_windows: formValues?.send_windows.map(() => ({
              timezone_group: formValues?.timezone_group,
              local_time: formValues?.local_time
            }))
          };
          break;
        default:
          break;
      }

      let formDataValue: any = createFormValue;
      formDataValue['r_contact_group'] = [selectedGroupId?.id];
      formDataValue['scheduler'] = scheduler;
      addCampaignService(formDataValue)
        .unwrap()
        .catch((resp: any) => resp.data)
        .then((response: any) => {
          if (response.responseCode === 0 || response?.response?.Message === 'Success') {
            notification.success({ message: 'Campaign created successfully' });
            navigate('/campaign');
          } else {
            let errorObj =
              Object.keys(response?.response?.errors).length > 0
                ? Object.keys(response?.response?.errors)[0]
                : undefined;
            let errorMsg = errorObj ? response?.response?.errors[errorObj][0] : 'Invalid input';
            notification.error({ message: errorMsg });
          }
        });
    }
  };

  // Call back function from folder filter component
  const topicValueSet = (topicData: any) => {
    form.setFieldsValue({ r_topic: topicData });
    setTopicValSelect(topicData)
  };

  // Form-changes value-set function-based field selection
  const fieldSelect = (formSelectVal: any, i: number) => {
    setSchedulerType(formSelectVal);
    setFieldsValSelect(i);
  };

  // When you click on the folder dropdown, the template field value is reset function.
  const teplateFieldReset = (key: any) => {
    setFolderId(key);
    form.setFieldsValue({ r_template_id: undefined });
    setTemplateButtonHide(false);
  }

  // const handleNewGroupCreation = () => {
  //   navigate('/manageGroup/create');
  // };

  const handleGroupSelection = (groupDetail: any) => {
    let groupInfo = {
      description: groupDetail?.description,
      name: groupDetail?.group_name,
      id: groupDetail?.group_id,
      count: groupDetail?.contact_count,
      created_by: groupDetail?.created_by,
      created_at: groupDetail?.created_at
    };
    setSelectedGroupId(groupInfo);
    setCreateFormValue((prev) => ({
      ...prev,
      total_contact: groupDetail?.contact_count,
    }));
  };

  const next = () => {
    if (current === 0)
      setCreateFormValue((prev) => ({
        ...prev,
        name: form.getFieldsValue()?.name,
        subject: form.getFieldsValue()?.subject,
        pre_header: form.getFieldsValue()?.pre_header,
        r_template_id: form.getFieldsValue()?.r_template_id,
        r_topic: form.getFieldsValue()?.r_topic,
        r_campaign_type: form.getFieldsValue()?.r_campaign_type,
        r_project: project,
        r_setting_id: form.getFieldsValue()?.r_setting_id
      }));
    setGroupNameFilter((prev) => ({
      ...prev,
      project: project,
      r_topic: form.getFieldsValue()?.r_topic
    }));
    form
      .validateFields()
      .then(() => {
        console.log(form.getFieldsValue());
        if (current === 1 && selectedGroupId === null) {
          form.scrollToField('contactGroups');
          message.error('Kindly select which group contacts for campaign');
          return Promise.reject(new Error('Please select at least one contact group'));
        }
        if (current === 0) {
          message.success('Kindly fill the required fields');
        }
        if (current === 2) {
          message.success('Kindly fill the required fields');
        }
        setCurrent(current + 1);
      })
      .catch((errorInfo) => {
        console.log('Failed:', errorInfo);
        // message.error('Kindly fill the required fields');
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  // Create campaign Batch form component 
  const campaignFormBatchComponent = () => (
    <Row className="cls-selected-fields">
      <Col span={24}>
        <Title level={4}>Batch Configuration</Title>
      </Col>
      <Col xs={24} sm={10} md={10} xl={11} xxl={11}>
        <Form.Item
          name="batch_size"
          label="Batch Size"
          rules={[
            {
              required: true,
              message: 'Enter batch size'
            }
          ]}
        >
          <Input type="number" placeholder="Enter batch size" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={10} md={10} xl={11} xxl={11} offset={2}>
        <Form.Item
          name="interval_minute"
          label="Interval Minute"
          rules={[
            {
              required: true,
              message: 'Enter interval minute'
            }
          ]}
        >
          <Input type="number" placeholder="Enter interval minute" />
        </Form.Item>
      </Col>
    </Row>
  )

  // Create campaign timezone form component
  const campaignFormTimeZoneComponent = () => (
    <Row className="cls-selected-fields">
      <Col span={24}>
        <Title level={4}>Fixed Time Configuration</Title>
      </Col>
      <Col xs={24} sm={10} md={10} xl={7} xxl={7}>

        <Form.Item
          name="scheduled_date"
          label="Scheduled Date"
          rules={[
            {
              required: true,
              message: 'Enter scheduled date'
            }
          ]}
        >
          <Input type="date" placeholder="Enter scheduled date" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={10} md={10} xl={7} xxl={7} offset={1}>
        <Form.Item
          name="scheduled_time"
          label="Scheduled Time"
          rules={[
            {
              required: true,
              message: 'Enter scheduled time'
            }
          ]}
        >
          <Input type="time" placeholder="Enter scheduled time" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={10} md={10} xl={7} xxl={7} offset={1}>
        <Form.Item
          name="time_zone"
          label="Time Zone"
          rules={[
            {
              required: true,
              message: 'Enter time zone'
            }
          ]}
        >
          <Input placeholder="Enter time zone" />
        </Form.Item>
      </Col>
    </Row>

  )

  // Steps component
  const renderStepContent = () => {
    switch (current) {
      case 0:
        return (
          <Col span={24} className="fields-container">
            <Row gutter={32}>
              <Col xs={24} sm={10} md={10} xl={12} xxl={12}>
                <Form.Item
                  name="name"
                  label="Campaign name"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Missing campaign name'
                    }
                  ]}
                >
                  <Input placeholder="Enter campaign name" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={10} md={10} xl={12} xxl={12}>
                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Missing subject'
                    }
                  ]}
                >
                  <Input placeholder="Enter subject" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={10} md={10} xl={12} xxl={12}>
                <Form.Item
                  name="pre_header"
                  label="Pre header"
                  rules={[
                    {
                      required: false
                    }
                  ]}
                >
                  <Input placeholder="Enter pre header" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={10} md={10} xl={12} xxl={12}>
                <Form.Item
                  name="r_topic"
                  label="Topic"
                  rules={[
                    {
                      required: true,
                      message: 'Select topic'
                    }
                  ]}
                >
                  <FolderFilter folders={[]} pathname="manageGroup" activeFolder={topicValSelect} handler={topicValueSet} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={10} md={10} xl={12} xxl={12}>
                <Form.Item
                  name="r_campaign_type"
                  label="Campaign type"
                  rules={[
                    {
                      required: true,
                      message: 'Select campaign type'
                    }
                  ]}
                >
                  <Select placeholder="Select connection type">
                    {(campaignMasterInfoStatus as any)?.data?.response?.data?.campaign_types?.map((option: any) => (
                      <Option key={option?.value} value={option?.value} data-testid="optionBox">
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={10} md={10} xl={12} xxl={12}>
                <Form.Item
                  name="r_setting_id"
                  label="Setting type"
                  rules={[
                    {
                      required: true,
                      message: 'Select setting type'
                    }
                  ]}
                >
                  <Select placeholder="Select setting type">
                    {options?.map((option: any) => (
                      <Option key={option?.id} value={option?.id} data-testid="optionBox">
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={10} md={10} xl={12} xxl={12}>
                <Form.Item
                  name="r_folder_id"
                  label="Folder"
                  rules={[
                    {
                      required: true,
                      message: 'Select folder'
                    }
                  ]}
                >
                  <Select placeholder="Select folder" onChange={(key: any) => teplateFieldReset(key)}>
                    {(getFolderInfoStatus as any)?.data?.response?.data?.map((option: any) => (
                      <Option key={option?.folder_id} value={option?.folder_id}>
                        {option.folder_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={10} md={10} xl={folderId === undefined || templateInfo === undefined || !templateButtonHide ? 12 : 8} xxl={8}>
                <Form.Item
                  name="r_template_id"
                  label="Template"
                  rules={[
                    {
                      required: true,
                      message: 'Select template'
                    }
                  ]}
                  dependencies={['r_folder_id']}
                >
                  <Select
                    placeholder="Select template"
                    filterOption={(input, option) =>
                      (option as any)?.children?.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    allowClear
                    showSearch
                    onChange={(value) => {
                      setTemplateInfo(value);
                      setCompleteTemplateData(undefined);
                      setTemplateButtonHide(true)
                    }}
                    disabled={folderId === undefined}
                  >
                    {(getTemplateInfoStatus as any)?.data?.response?.data?.map((option: any) => (
                      <Option key={option?.template_id} value={option?.template_id} data-testid="optionBox">
                        {option.template_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              {
                folderId === undefined || templateInfo === undefined || !templateButtonHide ? <></> :
                  <Col xs={24} sm={10} md={10} xl={4} xxl={4}>
                    <Button
                      type="primary"
                      style={{ marginTop: '31px', backgroundColor: 'blue', border: '1px solid blue' }}
                      onClick={() => setModalVisibility(true)}
                    >
                      {t('preview_template')}
                    </Button>
                  </Col>
              }
            </Row>
          </Col>
        );
      case 1:
        return (
          <>
            {selectedContactview === undefined ? (
              <Col span={24} className="fields-container">
                <Row gutter={32}>
                  <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
                    <h3>Select Contacts</h3>
                    <Tabs defaultActiveKey="1">
                      <Tabs.TabPane tab="Contact Groups" key="1">
                        <Row>
                          <Col span={6}>
                            {/* <Input placeholder="Search groups..." style={{ marginBottom: 16 }} /> */}
                            <Input
                              data-testid="tracking_input_searchbox"
                              suffix={
                                <SearchOutlined
                                  data-testid="tracking_search_icon"
                                  style={{ color: '#666' }}
                                  onClick={() => {
                                    setGroupNameFilter((prev) => ({
                                      ...prev,
                                      project: project,
                                      name: groupNameSearch
                                    }));
                                  }}
                                />
                              }
                              placeholder="Search groups..."
                              allowClear
                              onChange={(event) => {
                                if (event?.target?.value === '' || event?.target?.value === undefined) {
                                  setGroupNameFilter((prev) => ({
                                    ...prev,
                                    project: project,
                                    name: undefined
                                  }));
                                } else setGroupNameSearch(event?.target?.value);
                              }}
                            />
                          </Col>
                          {/* <Col span={4} offset={14}>
                            <Button
                              type="primary"
                              style={{ marginBottom: 16, background: 'blue', border: '1px solid blue' }}
                              onClick={handleNewGroupCreation}
                            >
                              Create New Group
                            </Button>
                          </Col> */}
                        </Row>
                        <Row>
                          <Col span={24}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                              {(getGroupsDataStatus as any)?.data?.response?.data?.results
                                ?.slice(0, 6)
                                .map((group: any) => (
                                  <div
                                    key={group.group_id}
                                    style={{ width: '33.33%', marginBottom: '20px', padding: '0 10px' }}
                                  >
                                    <ContactGroupCard
                                      group={group}
                                      selectedGroupId={selectedGroupId?.id}
                                      onSelect={(groupInfo) => handleGroupSelection(groupInfo)}
                                      setSelectedContactView={setSelectedContactView}
                                    />
                                  </div>
                                ))}
                            </div>
                            <Pagination
                              showQuickJumper
                              defaultCurrent={1}
                              total={(getGroupsDataStatus as any)?.data?.response?.data?.count}
                              pageSize={6}
                              onChange={(info) =>
                                setGroupNameFilter((prev) => ({
                                  ...prev,
                                  project: project,
                                  page: info
                                }))
                              }
                            />
                          </Col>
                        </Row>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Segments" key="2">
                        <p>Implement segments list here</p>
                      </Tabs.TabPane>
                    </Tabs>
                  </Col>
                </Row>
              </Col>
            ) : (
              <>
                <Row>
                  <Col span={24} className="cls-campaign-contact">
                    <Row>
                      <Col>
                        <h2>
                          <a href="#" className="cls-back-button">
                            <Back onClick={() => {
                              setSelectedGroupId(undefined);
                              setSelectedContactView(undefined);
                            }} />
                          </a>
                        </h2>
                      </Col>
                      <Col>
                        <Row className='cls-contact-header'>
                          <h2>
                            <span>
                              {selectedGroupId?.name} | {selectedGroupId?.description}
                            </span>
                          </h2>
                        </Row>
                        <Row>
                          <h4>
                            <span>Contact count: {selectedGroupId?.count} | {selectedGroupId?.created_by} | {dateFormat(selectedGroupId?.created_at)}</span>
                          </h4>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <ContactInfo id={selectedGroupId?.id} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            )}
          </>
        );
      case 2:
        return (
          <Col span={24} className="fields-container">
            <Row gutter={32}>
              <Col xs={24} sm={10} md={10} xl={24} xxl={24}>
                {/* <Form.Item
                  name="scheduler_type"
                  label="Scheduler Type"
                  rules={[
                    {
                      required: true,
                      message: 'Select scheduler type'
                    }
                  ]}
                >
                  <Select placeholder="Select Scheduler Type" onChange={(value) => setSchedulerType(value)}>
                    {schedulerOptions.map((option: any) => (
                      <Option key={option.value} value={option.value} data-testid="optionBox">
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item> */}
                <Form.Item
                  name="launch_option"
                  label="Launch Option"
                  rules={[
                    {
                      required: true,
                      message: ''
                    }
                  ]}
                >
                  <Row>
                    <Col className="cls-form-fields-select" span={24}>
                      {(campaignMasterInfoStatus as any)?.data?.response?.data?.launch_options?.map(
                        (option: any, index: any) => (
                          <span
                            className={index == filedsValSelect ? 'cls-active' : ''}
                            onClick={() => fieldSelect(option.value, index)}
                          >
                            {option.label}
                          </span>
                        )
                      )}
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
            {schedulerType === '681e080347e451e50daa3cba' && (
              <>
                {campaignFormBatchComponent()}
              </>
            )}
            {schedulerType === '681e080347e451e50daa3cbb' && (
              <>
                {campaignFormTimeZoneComponent()}
              </>
            )}
            {schedulerType === '681e080347e451e50daa3cbc' && (
              <>
                {campaignFormTimeZoneComponent()}
                {campaignFormBatchComponent()}
              </>
            )}
            {schedulerType === '681e080347e451e50daa3cbd' && (
              <>
                <Row className="cls-selected-fields">
                  <Col xs={24} sm={10} md={10} xl={11} xxl={11}>
                    <Form.Item
                      name="time_zone"
                      label="Time Zone"
                      rules={[
                        {
                          required: true,
                          message: 'Enter time zone'
                        }
                      ]}
                    >
                      <Input placeholder="Enter time zone" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={10} md={10} xl={11} xxl={11} offset={2}>
                    <Form.List name="send_windows">
                      {(fields, { add }) => (
                        <>
                          <label>Send Windows</label>
                          {fields.map(({ key, name, ...restField }) => (
                            <Row key={key} gutter={16}>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'timezone_group']}
                                  label="Timezone Group"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Missing timezone group'
                                    }
                                  ]}
                                >
                                  <Input placeholder="Timezone Group" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'local_time']}
                                  label="Local Time"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Missing local time'
                                    }
                                  ]}
                                >
                                  <Input type="number" placeholder="Local Time" />
                                </Form.Item>
                              </Col>
                            </Row>
                          ))}

                          <Form.Item>
                            <Button
                              type="dashed"
                              style={{ background: 'blue', border: '1px solid blue', color: '#fff' }}
                              onClick={() => add()}
                              block
                            >
                              Add Send Window
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <FormLayout title="Create campaign">
        <Steps className="cls-step-campaign" current={current} style={{ marginBottom: 25 }}>
          {steps.map((item, index) => (
            <Steps.Step
              key={item.title}
              title={item.title}
              icon={index === 0 ? <RocketOutlined /> : index === 1 ? <UserOutlined /> : <ClockCircleOutlined />}
            />
          ))}
        </Steps>
        <Form
          form={form}
          onReset={() => alert('reset')}
          className=""
          layout="vertical"
          onFinish={formSubmit}
          name="dynamicform"
          initialValues={{ actions: [''] }}
        >
          {renderStepContent()}
          <div className="steps-action" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => {
                if (current === 1) {
                  if (selectedGroupId?.id !== undefined) {
                    next();
                  } else {
                    message.warning('Please select a Contact Information')
                  }
                } else {
                  next();
                }
              }}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" htmlType="submit" onClick={() => formSubmit()}>
                Done
              </Button>
            )}
          </div>
        </Form>
      </FormLayout>
      {completeTemplateData && (
        <Modal
          className="TrackingModal"
          width={'80%'}
          style={{ top: 32 }}
          open={modalVisibility}
          onCancel={() => setModalVisibility(false)}
          onOk={() => {
            setModalVisibility(false);
            // const to = email.includes(',') ? email.split(',') : [email];
            // selectedOption &&
            //   triggerService({
            //     setting_id: selectedOption.toString(),
            //     recipientList: [{ data: '', to, action_name: 'test mail' }]
            // });
          }}
          okText="send test notification"
          cancelText="cancel"
          footer={null}
          closeIcon={<CloseCircleOutlined style={{ fontSize: 22, color: '#FF4646' }} />}
          closable={true}
          title={null}
        >
          <TrackingModal
            params={{
              preview: completeTemplateData?.template_content,
              request_JSON: completeTemplateData?.request_format,
              closeModalCallBack: () => setModalVisibility(false),
              subject: completeTemplateData?.subject,
              template_name: completeTemplateData?.template_name
            }}
            mode="Editor"
          />
        </Modal>
      )}
    </>
  );
};

export default CampaignForm;
