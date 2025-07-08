import { Button, Col, Form, Input, Modal, notification, Row, Select, Collapse, Tooltip, Tabs } from 'antd';
import './CampaignForm.scss';
import { useTranslation } from 'react-i18next';
import FolderFilter from '@/components/FolderFilter/FolderFilter';
import { useEffect, useState } from 'react';
import {
  useAddCampaignMutation,
  useLazyGetCampaignMasterInfoQuery,
  useLazyGetTemplateForCampaignQuery
} from '@/services/campaign/campaign';
import { useAppSelector } from '@/hooks/App.hook';
import { useSettingSelect } from '@/hooks/SettingForm.hook';
import { useLazyGetFolderQuery } from '@/services/folder/Folder';
import {
  AimOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  EyeFilled,
  LoadingOutlined,
  ReloadOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons';
import TrackingModal from '../../Tracking/TrackingModal';
import { useLazyGetGroupsListQuery } from '@/services/contacts/groups/Group';
import { GroupSelect } from '@/components/CustomFilter/CustomFilter';
import { useLazyGetTemplateQuery } from '@/services/templates/Templates';
import Templates from '../../Templates/Templates';
import ManageGroupForm from '../../ManageGroup_V2/ManageGroupForm/ManageGroupForm';
import { AIicon, CustomInfo } from '@/components/Icons/Icons';
import {
  formatMinutes,
  generateRange,
  validateNoSQL,
  validateNoHTML,
  validateSpecialChars
} from '@/Utils/commonFunction';
import { useNavigate } from 'react-router-dom';
import AiSubjectLineGenerator from '@/components/AiSubjectLineGenerator/AiSubjectLineGenerator';
import TabPane from 'antd/es/tabs/TabPane';

const { Option } = Select;
const { Panel } = Collapse;

const CampaignForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { options } = useSettingSelect();
  let { project } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const [modalOpen, setModalOpen] = useState(false);
  const [topicValSelect, setTopicValSelect] = useState(undefined);
  const [folderId, setFolderId] = useState<number | undefined>(undefined);
  const [templateButtonHide, setTemplateButtonHide] = useState(false);
  const [templateInfo, setTemplateInfo] = useState(undefined);
  const [completeTemplateData, setCompleteTemplateData] = useState<any>(undefined);
  // The following useState is used to display the template preview option
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  // The following useState is used to display the template creation model
  const [templateModal, setTemplateModal] = useState<any>({
    template: false,
    group: false,
    segment: false
  });
  // The following useState is used to update the contact type like group or segments
  const [groupNameFilter, setGroupNameFilter] = useState({
    project: project,
    page: 1,
    name: undefined,
    r_topic: undefined
  });
  const [formDetails, setFormDetails] = useState<any>({ contactType: 'group' });

  const [campaignMasterInfo, campaignMasterInfoStatus] = useLazyGetCampaignMasterInfoQuery();
  const [getFolderInfo, getFolderInfoStatus] = useLazyGetFolderQuery();
  const [getTemplateInfo, getTemplateInfoStatus] = useLazyGetTemplateForCampaignQuery();
  const [getGroupsData, getGroupsDataStatus] = useLazyGetGroupsListQuery();
  const [getTemplateService, getTemplateServiceStatus] = useLazyGetTemplateQuery();
  const [addCampaignService] = useAddCampaignMutation();
  const [resetFields, setRestFields] = useState(false);
  const [setFieldsValues, setSetFieldValues] = useState<any>();

  // To set the initial values for the form when the component mounts
  useEffect(() => {
    if (
      (campaignMasterInfoStatus.isSuccess && 'data' in campaignMasterInfoStatus && campaignMasterInfoStatus.data) ||
      (getFolderInfoStatus.isSuccess && 'data' in getFolderInfoStatus && getFolderInfoStatus.data)
    ) {
      const data = (campaignMasterInfoStatus as any).data?.response?.data;
      const folderData = (getFolderInfoStatus as any).data?.response?.data;
      setTopicValSelect(data?.topic?.[0]?.value || undefined);

      form.setFieldsValue({
        r_topic: data?.topic?.[0]?.value || undefined,
        r_campaign_type: data?.campaign_types?.[0]?.value || undefined,
        r_setting_id: options?.options?.[0]?.id || undefined,
        r_folder_id: folderData?.[0]?.folder_id || undefined
      });

      setFormDetails((prev: any) => ({
        ...prev,
        selectedSetting: options?.optionDetails?.[0]
      }));

      // Update group filter if needed
      setGroupNameFilter((prev) => ({
        ...prev,
        project: project,
        r_topic: data?.topic?.[0]?.value || undefined,
        r_campaign_type: data?.campaign_types?.[0]?.value || undefined,
        r_setting_id: options?.options?.[0]?.id || undefined,
        r_folder_id: folderData?.[0]?.folder_id || undefined
      }));

      // Validate fields to update completion status
      validateFields();
    }
  }, [campaignMasterInfoStatus, getFolderInfoStatus, resetFields]);

  // Add this to your state declarations
  const [activeKeys, setActiveKeys] = useState<string[]>(['1']);
  type SectionKey = 'campaign' | 'template' | 'contact' | 'schedule';
  const [completedSections, setCompletedSections] = useState<Record<SectionKey, boolean>>({
    campaign: false,
    template: false,
    contact: false,
    schedule: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // The following useEffect is triggered to get campaign master information
  useEffect(() => {
    project !== undefined && project !== null && campaignMasterInfo({ project: project });
  }, []);

  // The following useEffect is triggered to get campaign master information when project is modified
  useEffect(() => {
    project !== undefined && project !== null && campaignMasterInfo({ project: project });
  }, [project]);

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

  // The following useEffect is triggered to get the template info against the select folder
  useEffect(() => {
    folderId !== undefined && getTemplateInfo({ folderId: folderId });
  }, [folderId]);

  // The following useEffect is triggered to get the group data
  useEffect(() => {
    project !== undefined && project !== null && getGroupsData(groupNameFilter);
  }, [groupNameFilter]);

  // The following useEffect is tiggered to get preview template data when user select the template.
  useEffect(() => {
    templateInfo !== undefined &&
      folderId !== undefined &&
      getTemplateService({
        template_id: templateInfo,
        folder: folderId?.toString()
      });
  }, [templateInfo]);

  // The following useEffect is triggered when preview api response is completed
  useEffect(() => {
    getTemplateServiceStatus?.isSuccess &&
      setCompleteTemplateData((getTemplateServiceStatus as any)?.data?.response?.data);
  }, [getTemplateServiceStatus]);

  // The following method is used to customize the group api service
  const extractGroupData = (input: any) => {
    return input?.map((item: any) => ({
      group_id: item?.group_id,
      group_name: item?.group_name,
      contact_count: item?.contact_count
    }));
  };

  // To validate the form fields when the form details change
  useEffect(() => {
    validateFields();
  }, [formDetails]);

  // Call back function from folder filter component
  const topicValueSet = (topicData: any) => {
    form.setFieldsValue({ r_topic: topicData });
    setTopicValSelect(topicData);
    setGroupNameFilter((prev) => ({
      ...prev,
      project: project,
      r_topic: topicData
    }));
  };

  // When you click on the folder dropdown, the template field value is reset function.
  const templateFieldReset = (key: any) => {
    setFolderId(key);
    form.setFieldsValue({ r_template_id: undefined });
    setTemplateButtonHide(false);
  };

  // To set the Batch size and interval minute options
  const numberOptions = generateRange(5, 25);
  const intervals = generateRange(15, 300, 15);

  const formSubmit = async (values: any) => {
    setIsSubmitting(true);

    try {
      // Base form structure
      const baseFormValues = {
        name: form.getFieldValue('name'),
        subject: form.getFieldValue('subject'),
        pre_header: form.getFieldValue('pre_header'),
        r_template_id: form.getFieldValue('r_template_id'),
        r_topic: form.getFieldValue('r_topic'),
        r_campaign_type: form.getFieldValue('r_campaign_type'),
        r_project: project,
        total_contact: form.getFieldValue('total_contact'),
        r_contact_group: form.getFieldValue('r_contact_group'),
        r_setting_id: form.getFieldValue('r_setting_id')
      };

      // Create scheduler object based on launch type
      let schedulerConfig = {};

      switch (formDetails?.scheduleTypeType?.value) {
        case '681e080347e451e50daa3cb9': // NOW
          schedulerConfig = {
            r_launch_option: '681e080347e451e50daa3cb9'
          };
          break;
        case '681e080347e451e50daa3cba': // NOWB
          schedulerConfig = {
            r_launch_option: '681e080347e451e50daa3cba',
            batch_details: {
              batch_size: Number(values?.batch_size),
              interval_minutes: Number(values?.interval_minute)
            }
          };
          break;
        case '681e080347e451e50daa3cbb': // FTZ
          schedulerConfig = {
            r_launch_option: '681e080347e451e50daa3cbb',
            scheduled_date: values?.scheduled_date,
            scheduled_time: values?.scheduled_time,
            time_zone: values?.time_zone
          };
          break;
        case '681e080347e451e50daa3cbd': // FTZB
          schedulerConfig = {
            r_launch_option: '681e080347e451e50daa3cbd',
            scheduled_date: values?.scheduled_date,
            scheduled_time: values?.scheduled_time,
            time_zone: values?.time_zone,
            batch_details: {
              batch_size: values?.batch_size,
              interval_minutes: values?.interval_minute
            }
          };
          break;
        case '6818695071c05d94b88043fd': // RTZ
          schedulerConfig = {
            r_launch_option: '6818695071c05d94b88043fd',
            time_zone: values?.time_zone,
            send_windows: values?.send_windows.map(() => ({
              timezone_group: values?.timezone_group,
              local_time: values?.local_time
            }))
          };
          break;
        default:
          break;
      }

      // Combine base values with scheduler config
      const formValues = {
        ...baseFormValues,
        scheduler: schedulerConfig
      };

      const response = await addCampaignService(formValues).unwrap();

      if (response.responseCode === 0 || response?.response?.Message === 'Success') {
        notification.success({ message: 'Campaign created successfully' });
        navigate('/campaign');
      }
    } catch (error) {
      let errorObj = undefined;
      if (
        error &&
        typeof error === 'object' &&
        'data' in error &&
        (error as any).data?.response?.errors &&
        Object.keys((error as any)?.data?.response?.errors).length > 0
      ) {
        errorObj = Object.keys((error as any)?.data?.response?.errors)[0];
      }
      let errorMsg =
        errorObj && (error as any)?.data?.response?.errors
          ? (error as any)?.data?.response?.errors[errorObj]
          : 'Invalid input';
      notification.error({ message: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create campaign Batch form component
  const LaunchTypeBatch = () => (
    <Row className="cls-selected-field cls-manual-select" justify={'space-evenly'}>
      <Col xs={24} sm={11} md={11} xl={11} xxl={11}>
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
          <Select placeholder="Select a batch size">
            {numberOptions.map((num) => (
              <Option key={num} value={num}>
                {num}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} sm={11} md={11} xl={11} xxl={11}>
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
          <Select placeholder="Select time interval">
            {intervals.map((mins) => (
              <Option key={mins} value={mins}>
                {formatMinutes(mins)}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );

  // Create campaign timezone form component
  const LaunchTypeBatchTimeZone = () => (
    <Row className="cls-selected-fields cls-manual-select" justify={'space-around'}>
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
      <Col xs={24} sm={10} md={10} xl={7} xxl={7}>
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
      <Col xs={24} sm={10} md={10} xl={7} xxl={7}>
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
  );

  // Create campaign basic form component
  const CampaignBasic = () => (
    <Row className="cls-selected-fields">
      <Col span={24}>
        <Row>
          <Col xs={24} sm={8} md={8} xl={8} xxl={8}>
            <Form.Item
              name="name"
              label="Campaign name"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Missing campaign name'
                },
                { validator: validateNoSQL },
                { validator: validateNoHTML }
              ]}
            >
              <Input
                placeholder="Enter campaign name"
                onBlur={() => {
                  validateFields();
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8} md={8} xl={8} xxl={8}>
            <Form.Item
              name="subject"
              label={
                <Row justify="space-between" className="cls-subject-label">
                  <Col>Subject</Col>
                  <Tooltip title="Ask AI">
                    <Col
                      style={{
                        cursor: 'pointer',
                        color: 'var(--sub-title-color)',
                        marginLeft: 'auto'
                      }}
                      onClick={() => setModalOpen(true)}
                      className="cls-heartbeat"
                    >
                      <span>Ask AI</span> <AIicon />
                    </Col>
                  </Tooltip>
                </Row>
              }
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Missing subject'
                },
                { validator: validateNoSQL },
                { validator: validateNoHTML },
                { validator: validateSpecialChars }
              ]}
            >
              <Input placeholder="Enter subject" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8} md={8} xl={8} xxl={8}>
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
        </Row>
        <Row>
          <Col xs={24} sm={8} md={8} xl={8} xxl={8}>
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

          <Col xs={24} sm={8} md={8} xl={8} xxl={8}>
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

          <Col xs={24} sm={8} md={8} xl={8} xxl={8}>
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
              <Select
                placeholder="Select setting type"
                onChange={(value) => {
                  // Find selected option
                  const selectedOption = options?.options?.find((opt: any) => opt.id === value);
                  setFormDetails((prev: any) => ({
                    ...prev,
                    selectedSetting: selectedOption
                  }));
                }}
              >
                {options?.options?.map((option: any) => (
                  <Option key={option?.id} value={option?.id} data-testid="optionBox">
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} xl={24} xxl={24} className="cls-align-end">
            {formDetails?.selectedSetting && (
              <Row className="cls-setting-details">
                <CustomInfo />
                <Col className="cls-email-info">
                  <label>From Email: </label>
                  <span>{formDetails.selectedSetting.from_email_id}</span>
                </Col>
                <Col className="cls-email-info">
                  <label>Reply Email: </label>
                  <span>{formDetails.selectedSetting.from_email_id}</span>
                </Col>
                {/* <Col
                    span={1}
                    className="cls-edit-btn  "
                    onClick={() => {
                      editSettings();
                    }}
                  >
                    <CustomEditIcon />
                  </Col> */}
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );

  // Create campaign Batch form component
  const TemplateSection = () => (
    <Row className="cls-selected-fields">
      <Col span={24}>
        <Row>
          <Col xs={24} sm={8} md={8} xl={8} xxl={8}>
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
              <Select placeholder="Select folder" onChange={(key: any) => templateFieldReset(key)}>
                {(getFolderInfoStatus as any)?.data?.response?.data?.map((option: any) => (
                  <Option key={option?.folder_id} value={option?.folder_id}>
                    {option.folder_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col
            xs={24}
            sm={10}
            md={10}
            xl={folderId === undefined || templateInfo === undefined || !templateButtonHide ? 8 : 8}
            xxl={8}
          >
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
                  setTemplateButtonHide(true);
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

          {folderId === undefined || templateInfo === undefined || !templateButtonHide ? (
            <></>
          ) : (
            <Col xs={24} sm={8} md={8} xl={4} xxl={4}>
              <Button
                type="primary"
                icon={<EyeFilled />}
                className="cls-preview-btn cls-submit-button"
                onClick={() => setModalVisibility(true)}
              >
                {t('preview_template')}
              </Button>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );

  // Create campaign basic form component
  const ContactForm = () => (
    <Row className="cls-selected-fields">
      <Col span={24}>
        <Row>
          <Col xs={24} sm={24} md={8} xl={8} xxl={8}>
            <Form.Item
              name="contact_type"
              label="Contact type"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Missing contact type'
                }
              ]}
            >
              <Select
                placeholder="Select contact type"
                onChange={(value: any) =>
                  setFormDetails((prev: any) => ({
                    ...prev,
                    contactType: value
                  }))
                }
              >
                <Option value="group">Groups</Option>
                <Option value="Segments">Segments</Option>
              </Select>
            </Form.Item>
          </Col>

          {getGroupsDataStatus?.isSuccess && formDetails?.contactType === 'group' && (
            <Col xs={24} sm={8} md={8} xl={8} xxl={8}>
              <Form.Item
                name="r_contact_group"
                label="Groups"
                rules={[
                  {
                    required: true,
                    message: 'Select groups'
                  }
                ]}
              >
                <GroupSelect
                  placeHolder="Select group"
                  folders={extractGroupData((getGroupsDataStatus as any)?.data?.response?.data?.results)}
                  handler={(groupIds: any, counts: any) => {
                    // Get the selected group names for display
                    const groupFolders = extractGroupData((getGroupsDataStatus as any)?.data?.response?.data?.results);
                    const selectedGroupNames = groupFolders
                      .filter((folder: any) => groupIds.includes(folder.group_id))
                      .map((folder: any) => folder.group_name);
                    // Update both form field and state
                    form.setFieldsValue({
                      r_contact_group: groupIds,
                      total_contact: counts
                    });
                    setFormDetails((prev: any) => ({
                      ...prev,
                      groupValue: counts,
                      selectedGroupNames: selectedGroupNames
                    }));
                  }}
                  selectedValue={formDetails?.selectedGroupNames || []}
                />
              </Form.Item>
            </Col>
          )}

          {formDetails?.groupValue && (
            <Col span={8}>
              <a className="cls-submit-button">View groups</a>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );

  // Following component is used to render the launch type
  const ScheduleType = () => (
    <Row className="cls-selected-fields cls-launch-option">
      <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
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
          <Col className="cls-form-fields-select" span={24}>
            <Tabs
              activeKey={String(formDetails?.scheduleIndex)}
              tabBarStyle={{ borderBottom: 'none' }}
              onChange={(key) => {
                let selectedOption;
                if (
                  campaignMasterInfoStatus &&
                  'data' in campaignMasterInfoStatus &&
                  (campaignMasterInfoStatus as any).data?.response?.data?.launch_options
                ) {
                  selectedOption = (campaignMasterInfoStatus as any).data.response.data.launch_options[key];
                } else {
                  selectedOption = undefined;
                }
                setFormDetails((prev: any) => ({
                  ...prev,
                  scheduleTypeType: selectedOption,
                  scheduleIndex: Number(key),
                  launch_option: (formDetails as any)?.scheduleTypeType?.value
                }));
              }}
            >
              {'data' in campaignMasterInfoStatus &&
                (campaignMasterInfoStatus as any).data?.response?.data?.launch_options?.map(
                  (option: any, index: number) => <TabPane tab={option.label} key={String(index)} />
                )}
            </Tabs>
          </Col>

          {/* Tab content rendering based on selected option */}
          {['Immediate Send (Batches)', 'Fixed Timezone (Batches)'].includes(formDetails?.scheduleTypeType?.label) && (
            <Col span={24} style={{ marginTop: '10px' }}>
              <LaunchTypeBatch />
            </Col>
          )}

          {['Fixed Timezone', 'Fixed Timezone (Batches)'].includes(formDetails?.scheduleTypeType?.label) && (
            <Col span={24} style={{ margin: '10px 0px' }}>
              <LaunchTypeBatchTimeZone />
            </Col>
          )}

          {['Immediate Send'].includes(formDetails?.scheduleTypeType?.label) && (
            <Col span={24} style={{ marginTop: '10px' }}>
              <Row className="cls-setting-details">
                <CustomInfo />
                <Col className="cls-email-info">
                  <span>
                    The 'Immediate Send' option sends emails instantly and is recommended for sending a small number of
                    emails.
                  </span>
                </Col>
              </Row>
            </Col>
          )}
        </Form.Item>
      </Col>
    </Row>
  );

  // Add this function to check section completion
  const checkSectionCompletion = (section: string) => {
    switch (section) {
      case 'campaign':
        const campaignFields = ['name', 'subject', 'r_topic', 'r_campaign_type', 'r_setting_id'];
        return campaignFields.every((field) => form.getFieldValue(field));
      case 'template':
        return form.getFieldValue('r_template_id') && form.getFieldValue('r_setting_id');
      case 'contact':
        return form.getFieldValue('contact_type') && form.getFieldValue('r_contact_group')?.[0];
      case 'schedule':
        const launchType = formDetails?.scheduleTypeType?.value;
        switch (launchType) {
          // Immediate Send (Batches)
          case '681e080347e451e50daa3cba':
            return form.getFieldValue('batch_size') && form.getFieldValue('interval_minute');

          // Fixed Timezone
          case '681e080347e451e50daa3cbb':
            return (
              form.getFieldValue('scheduled_date') &&
              form.getFieldValue('scheduled_time') &&
              form.getFieldValue('time_zone')
            );

          // Fixed Timezone (Batches)
          case '681e080347e451e50daa3cbc':
            return (
              form.getFieldValue('scheduled_date') &&
              form.getFieldValue('scheduled_time') &&
              form.getFieldValue('time_zone') &&
              form.getFieldValue('batch_size') &&
              form.getFieldValue('interval_minute')
            );

          // Rolling Time Zone
          case '6818695071c05d94b88043fd':
            return (
              form.getFieldValue('time_zone') &&
              form.getFieldValue('timezone_group') &&
              form.getFieldValue('local_time')
            );

          // Immediate Send (NOW)
          case '681e080347e451e50daa3cb9':
            return true;

          default:
            return false;
        }
      default:
        return false;
    }
  };

  // To check the completion of all sections and update active keys
  const validateFields = () => {
    const newCompletedSections = {
      campaign: checkSectionCompletion('campaign'),
      template: checkSectionCompletion('template'),
      contact: checkSectionCompletion('contact'),
      schedule: checkSectionCompletion('schedule')
    };
    setCompletedSections(newCompletedSections);

    const sectionMap: Record<string, SectionKey> = {
      '1': 'campaign',
      '2': 'template',
      '3': 'contact',
      '4': 'schedule'
    };

    // Find next incomplete section
    const orderedSections = ['1', '2', '3', '4'];
    let sectionKey;
    const nextIncompleteSection = orderedSections.find((key) => {
      sectionKey = sectionMap[key];
      return !newCompletedSections[sectionKey];
    });
    // Add next section to activeKeys if found
    if (nextIncompleteSection && !activeKeys.includes(nextIncompleteSection)) {
      if (sectionKey === 'schedule') setActiveKeys([...activeKeys, '4']);
      else setActiveKeys([...activeKeys, nextIncompleteSection]);
    }
    scrollToPanel(nextIncompleteSection || '1');
  };

  // Add this scroll helper function at the top of your component
  const scrollToPanel = (panelKey: string) => {
    const panel = document.querySelector(`[data-panel-key="${panelKey}"]`);

    if (panel) {
      const headerOffset = 100;
      const layout = document.querySelector('.cls-form-collapse');

      if (layout) {
        const layoutRect = layout.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();

        // Calculate scroll position considering panel height
        // const scrollTop = layout.scrollTop + (panelRect.top - headerOffset);
        const scrollTop = layout.scrollTop + (layoutRect.height - panelRect.height) - headerOffset;

        // Scroll the container
        layout.scrollTo({
          top: Math.max(0, scrollTop),
          behavior: 'smooth'
        });
      }
    }
  };

  // Add this at the top of your component after state declarations
  useEffect(() => {
    // Get current date in MMDD format
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const hour = String(today.getHours()).padStart(2, '0');
    const defaultCampaignName = `Campaign_${day}${hour}`;

    // Set initial form values
    form.setFieldsValue({
      name: defaultCampaignName,
      subject: '',
      pre_header: '',
      launch_option: '681e080347e451e50daa3cb9', // Immediate Send (NOW)
      contact_type: 'group'
    });

    // Set schedule type in formDetails
    setFormDetails((prev: any) => ({
      ...prev,
      scheduleTypeType: {
        value: '681e080347e451e50daa3cb9',
        label: 'Immediate Send'
      },
      scheduleIndex: 0 // Assuming Immediate Send is first option
    }));

    validateFields();
  }, []); // Run once on component mount

  // To set the Subject and Pre header fronm Ai
  useEffect(() => {
    if (setFieldsValues) {
      form.setFieldsValue({
        subject: setFieldsValues.subject,
        pre_header: setFieldsValues.preheader
      });
      setSetFieldValues(undefined);
    }
  }, [setFieldsValues]);

  return (
    <div className="cls-common-style">
      <Row className="cls-campaign-form">
        <AiSubjectLineGenerator
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          inputInfo={form.getFieldValue('subject')}
          setFieldsValues={setSetFieldValues}
        />
        <Col span={24}>
          <div>
            <div className="cls-form-header">
              <Button
                type="link"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowLeftOutlined />
              </Button>
              <h1>Create campaign</h1>
            </div>
            <Form
              layout="vertical"
              form={form}
              onFinish={formSubmit}
              initialValues={{
                contact_type: 'group',
                launch_option: '681e080347e451e50daa3cb9',
                r_project: project,
                name: `Campaign_${new Date()
                  .toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit'
                  })
                  .replace('/', '')}`
              }}
              onFieldsChange={(changedFields) => {
                // Handle validation based on field type
                changedFields.forEach((field) => {
                  const fieldName = field.name[0];
                  // Check if the field is an input field by checking if it ends with specific strings
                  const isInputField = [
                    'name',
                    'subject',
                    'pre_header',
                    'batch_size',
                    'interval_minute',
                    'scheduled_date',
                    'scheduled_time',
                    'time_zone'
                  ].includes(fieldName);

                  // For non-input fields (select, etc.), validate immediately
                  if (!isInputField && field.touched) {
                    validateFields();
                  }
                });
              }}
            >
              <Collapse
                activeKey={activeKeys}
                onChange={(keys) => {
                  if (Array.isArray(keys)) {
                    const newKey = keys.find((key) => !activeKeys.includes(key));
                    setActiveKeys(keys);

                    // If there's a newly opened panel, scroll to it
                    if (newKey) {
                      setTimeout(() => scrollToPanel(newKey), 100);
                    }
                  } else if (keys) {
                    setActiveKeys((prev) => {
                      const newKeys = [...prev, keys].filter((key, index, self) => self.indexOf(key) === index);
                      // Scroll to newly added panel
                      setTimeout(() => scrollToPanel(keys), 100);
                      return newKeys;
                    });
                  }
                }}
                className="cls-form-collapse"
              >
                <Panel
                  header={
                    <Row className="cls-panel-header" justify={'space-between'}>
                      <Col md={17} xl={19}>
                        <AimOutlined className="  cls-padding-right" /> <h4>Campaign basic</h4>
                      </Col>
                      <Col className={`${completedSections.campaign ? 'cls-completed' : 'cls-not-completed'}`}>
                        {completedSections.campaign ? (
                          <span>
                            <CheckCircleOutlined /> Completed
                          </span>
                        ) : (
                          <span>
                            <CloseCircleOutlined /> Not Completed
                          </span>
                        )}
                      </Col>
                    </Row>
                  }
                  key="1"
                  data-panel-key="1"
                >
                  <CampaignBasic />
                </Panel>

                <Panel
                  header={
                    <Row className="cls-panel-header" justify={'space-between'}>
                      <Col md={17} xl={19}>
                        <SettingOutlined className="  cls-padding-right" /> <h4>Template configration</h4>
                      </Col>
                      <Col>
                        <a
                          onClick={() =>
                            setTemplateModal((prev: any) => ({
                              ...prev,
                              template: true
                            }))
                          }
                        >
                          + New template
                        </a>
                      </Col>
                      <Col className={`${completedSections.template ? 'cls-completed' : 'cls-not-completed'}`}>
                        {completedSections.template ? (
                          <span>
                            <CheckCircleOutlined /> Completed
                          </span>
                        ) : (
                          <span>
                            <CloseCircleOutlined /> Not Completed
                          </span>
                        )}
                      </Col>
                    </Row>
                  }
                  key="2"
                  data-panel-key="2"
                >
                  <TemplateSection />
                </Panel>

                <Panel
                  header={
                    <Row className="cls-panel-header" justify={'space-between'}>
                      <Col md={17} xl={19}>
                        <TeamOutlined className="  cls-padding-right" /> <h4>Contact information</h4>
                      </Col>
                      <Col>
                        <a
                          onClick={() =>
                            setTemplateModal((prev: any) => ({
                              ...prev,
                              group: formDetails?.contactType === 'group',
                              segment: formDetails?.contactType === 'Segments'
                            }))
                          }
                        >
                          {formDetails?.contactType === 'group' ? '+  Create groups' : '+ Create segments'}
                        </a>
                      </Col>
                      <Col className={`${completedSections.contact ? 'cls-completed' : 'cls-not-completed'}`}>
                        {completedSections.contact ? (
                          <span>
                            <CheckCircleOutlined /> Completed
                          </span>
                        ) : (
                          <span>
                            <CloseCircleOutlined /> Not Completed
                          </span>
                        )}
                      </Col>
                    </Row>
                  }
                  key="3"
                  data-panel-key="3"
                >
                  <ContactForm />
                </Panel>

                <Panel
                  header={
                    <Row className="cls-panel-header" justify={'space-between'}>
                      <Col md={17} xl={19}>
                        <CalendarOutlined className="  cls-padding-right" /> <h4>Schedule Launch</h4>
                      </Col>
                      <Col className={`${completedSections.schedule ? 'cls-completed' : 'cls-not-completed'}`}>
                        {completedSections.schedule ? (
                          <span>
                            <CheckCircleOutlined /> Completed
                          </span>
                        ) : (
                          <span>
                            <CloseCircleOutlined /> Not Completed
                          </span>
                        )}
                      </Col>
                    </Row>
                  }
                  key="4"
                  data-panel-key="4"
                >
                  <ScheduleType />
                </Panel>
              </Collapse>

              <Row className="form-btns" justify="end">
                <Col>
                  <Button
                    type="link"
                    className="cls-resetting-button"
                    onClick={() => {
                      // form.resetFields();
                      setRestFields(!resetFields);
                    }}
                  >
                    <ReloadOutlined />
                    Reset
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    className="cls-submit-button"
                    htmlType="submit"
                    disabled={
                      !completedSections.campaign ||
                      !completedSections.template ||
                      !completedSections.contact ||
                      !completedSections.schedule
                    }
                  >
                    {isSubmitting ? <LoadingOutlined /> : <CheckOutlined />}
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
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
          <Modal
            open={templateModal.template || templateModal.group || templateModal.segment}
            onCancel={() =>
              setTemplateModal((prev: any) => ({
                ...prev,
                template: false,
                group: false,
                segment: false
              }))
            }
            footer={null}
          >
            {templateModal.template && <Templates />}
            {templateModal.group && (
              <ManageGroupForm
                pathName={''}
                groupData={undefined}
                closeModal={() => () => setTemplateModal((prev: any) => ({ ...prev, group: false }))}
              />
            )}
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default CampaignForm;
