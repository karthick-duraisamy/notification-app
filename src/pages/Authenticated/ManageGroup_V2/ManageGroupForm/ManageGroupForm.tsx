import { Button, Col, Row, Form, Input, Spin, Radio, Upload, message, notification, Modal } from 'antd';
import {
  ReloadOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
  UploadOutlined,
  UserAddOutlined,
  CheckOutlined,
  NumberOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './ManageGroupForm.scss';
import { useForm } from 'antd/lib/form/Form';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { CreateGroupBasicInfo, ManageGroupFormProps } from '../../../../services/contacts/groups/GroupTypes';
import {
  useAddContactsGroupMutation,
  useLazyGetContactGroupMasterQuery,
  useLazyGetDetailFieldsQuery,
  useUpdateGroupIdContactsMutation
} from '../../../../services/contacts/groups/Group';
import { useAppSelector } from '../../../../hooks/App.hook';
import FolderFilter from '../../../../components/FolderFilter/FolderFilter';
import { downloadFile, fieldNameFormatter } from '../../../../Utils/commonFunction';
import { FormLayout } from '../../../../layouts/Form_V2/Form';
import GroupDetailShow from '../../../../components/GroupDetailShow/GroupDetailShow';
import TextArea from 'antd/es/input/TextArea';
import { UploadsAnimation } from '@/components/AnimationsExport/AnimationsExport';
import { useDispatch } from 'react-redux';
import { setUnwantedTrigger } from '@/stores/TemplateProject.store';

interface ContactField {
  email: string;
  firstName: string;
  lastName: string;
  details: string;
}

const { Dragger } = Upload;

const ManageGroupForm: React.FC<ManageGroupFormProps> = ({ pathName, groupData, closeModal }) => {
  const { action: actionUrl } = useParams() as { action: string; id: string };
  const [form] = useForm();
  const navigate = useNavigate();
  const [addContactGroupService, { isLoading }] = useAddContactsGroupMutation();
  const [updateGroupIdContactsService] = useUpdateGroupIdContactsMutation();
  const { project, isUnwantedTrigger } = useAppSelector(
    (state: { TemplateProjectReducer: any }) => state.TemplateProjectReducer
  );
  const [createInfo, setCreateInfo] = useState<CreateGroupBasicInfo | undefined>({
    group_name: undefined,
    description: undefined,
    project_id: project,
    status: undefined,
    topic: undefined,
    attachment: [],
    contacts: []
  });
  const [contactAddMethod, setContactAddMethod] = useState('file');
  const [contactFields, setContactFields] = useState<ContactField[]>([
    { email: '', firstName: '', lastName: '', details: '' }
  ]);
  const [selectedFields, setSelectedFields] = useState<any>(['email_id', 'first_name', 'last_name']);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [contactFieldsStatus, contactFieldsInfo]: any = useLazyGetDetailFieldsQuery();
  const [_topicList, setTopicList] = useState<string | undefined>();
  const [fileList, setFiles] = useState<any | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [reloadApiTrigger, setReloadApiTrigger] = useState<any>(isUnwantedTrigger);

  const [getContactGroup, getContactGroupInfo] = useLazyGetContactGroupMasterQuery();
  // To trigger the call with project by using project id
  useEffect(() => {
    if (project != undefined) {
      getContactGroup({ project: project });
      contactFieldsStatus({ project: project });
    }
  }, [project]);

  //This function to set the respected values for showing the remaining details show up
  const handleInputChange = (fieldName: string, value: any) => {
    form.setFieldsValue({
      [fieldName]: value
    });
    setCreateInfo((prev: any) => ({
      ...prev,
      [fieldName]: value
    }));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (getContactGroupInfo.isSuccess && getContactGroupInfo.data) {
      const data = getContactGroupInfo.data as { response?: { data?: { topic?: string } } };
      const masterFiles = getContactGroupInfo.data as { response?: { data?: { others?: any } } };
      setTopicList(data.response?.data?.topic);
      setFiles(masterFiles.response?.data?.others);
    }
  }, [getContactGroupInfo]);

  //define the responseData
  const [responseData, setResponseData] = useState<any | undefined>();

  // Handle form submission for the first step
  const addContactData = async (values: any) => {
    if (values?.group_name !== undefined && values?.topic !== undefined) {
      setCreateInfo((prev: any) => ({
        ...prev,
        group_name: values?.group_name,
        description: values?.description,
        project_id: project
      }));
    }
    let updatedInfo: CreateGroupBasicInfo = createInfo as CreateGroupBasicInfo;
    updatedInfo.contacts = values?.contact_add_method === 'manual' ? values?.contacts : [];
    updatedInfo.topic = (groupData as any)?.topic_id || '681e080347e451e50daa3caa';
    updatedInfo.attachment = [];
    updatedInfo.status = (groupData as any)?.status || '681e080347e451e50daa3c8f';
    if (pathName != undefined && (pathName == 'manageView' || pathName == 'manageContact')) {
      updatedInfo.contact_group_id = (groupData as any)?.group_id || values?.group_name;
      updatedInfo.project_id = project;
      updatedInfo.contacts = values?.contact_add_method === 'manual' ? values?.contacts : undefined;
    }
    setCreateInfo((prev: any) => ({
      ...prev,
      ...(pathName != undefined &&
        (pathName == 'manageView' || pathName == 'manageContact') && {
          contact_group_id: (groupData as any)?.group_id || values?.group_name,
          project_id: project
        }),
      description: values?.description ? values?.description : '',
      contacts: values?.contact_add_method === 'manual' ? values?.contacts : [],
      topic: (groupData as any)?.topic_id || '681e080347e451e50daa3caa',
      attachment: [uploadedFile],
      status: (groupData as any)?.status || '681e080347e451e50daa3c8f'
    }));

    if (values?.contact_add_method === 'manual') {
      try {
        if (pathName != undefined && (pathName == 'manageView' || pathName == 'manageContact'))
          updateGroupIdContactsService(updatedInfo)
            .unwrap()
            .catch((resp: any) => resp.data)
            .then((response: any) => {
              if (response.responseCode === 0 || response?.response?.Message === 'Success') {
                notification.success({ message: 'Contact group created successfully' });
                closeModal();
                form.resetFields();
                return true;
              } else {
                let errorObj =
                  Object.keys(response?.response?.errors).length > 0
                    ? Object.keys(response?.response?.errors)[0]
                    : undefined;
                let errorMsg = errorObj ? response?.response?.errors[errorObj][0] : 'Invalid input';
                notification.error({ message: errorMsg });
                return false;
              }
            });
        else
          addContactGroupService(updatedInfo)
            .unwrap()
            .catch((resp: any) => resp.data)
            .then((response: any) => {
              closeModal();
              if (response.responseCode === 0 || response?.response?.Message === 'Success') {
                notification.success({ message: 'Contact group created successfully' });
                navigate('/manageGroup');
                form.resetFields();
                return true;
              } else {
                let errorObj =
                  Object.keys(response?.response?.errors).length > 0
                    ? Object.keys(response?.response?.errors)[0]
                    : undefined;
                let errorMsg = errorObj ? response?.response?.errors[errorObj][0] : 'Invalid input';
                notification.error({ message: errorMsg });
                return false;
              }
            });
      } catch (error) {
        // message.error('Failed to create group.');
        return false;
      }
    } else if (values?.contact_add_method === 'file') {
      const formData = new FormData();
      formData.append('request', JSON.stringify(updatedInfo));
      formData.append('attachment', uploadedFile as any, uploadedFile?.name);
      try {
        if (pathName != undefined && (pathName == 'manageView' || pathName == 'manageContact'))
          updateGroupIdContactsService(formData)
            .unwrap()
            .catch((resp: any) => resp.data)
            .then((response: any) => {
              if (response.responseCode === 0) {
                closeModal();
                setResponseData(response?.response?.data);
                if (pathName !== 'manageContact') setOpenModal(true);
                notification.success({ message: 'Contact group created successfully' });
                form.resetFields();
                // To set the Api trigger true for represented one.
                setReloadApiTrigger({
                  ...isUnwantedTrigger,
                  manageGroup: true,
                  contactGroup: true
                });
                return true;
              } else {
                let errorMsg = response?.response?.errors?.non_field_errors[0];
                notification.error({ message: errorMsg ? errorMsg : 'Invalid input. Kindly check.' });
                // To set the Api trigger false for represented one.
                setReloadApiTrigger({
                  ...isUnwantedTrigger,
                  manageGroup: false,
                  contactGroup: false
                });
                return undefined;
              }
            });
        else
          addContactGroupService(formData)
            .unwrap()
            .catch((resp: any) => resp.data)
            .then((response: any) => {
              if (response.responseCode === 0) {
                closeModal();
                setResponseData(response?.response?.data);
                if (pathName !== 'manageContact') setOpenModal(true);
                notification.success({ message: 'Contact group created successfully' });
                form.resetFields();
                // To set the Api trigger true for represented one.
                setReloadApiTrigger({
                  ...isUnwantedTrigger,
                  manageGroup: true,
                  contactGroup: true
                });
                return true;
              } else {
                let errorMsg = response?.response?.errors?.non_field_errors[0];

                notification.error({ message: errorMsg ? errorMsg : 'Invalid input. Kindly check.' });
                // To set the Api trigger false for represented one.
                setReloadApiTrigger({
                  ...isUnwantedTrigger,
                  manageGroup: false,
                  contactGroup: false
                });
                return undefined;
              }
            });
      } catch (error) {
        // message.error('Failed to create group.');
        // To set the Api trigger false for represented one.
        setReloadApiTrigger({
          ...isUnwantedTrigger,
          manageGroup: false,
          contactGroup: false
        });
        return false;
      }
    }
  };

  // The following method is triggered when file is file selected or drop
  const handleBeforeUpload = (file: File) => {
    // On dropping to check the file type
    const isValidType = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ].includes(file.type);

    if (!isValidType) {
      message.error('You can only upload XLS, XLSX or CSV files!');
      return false;
    }
    setUploadedFile(file); // Store the File object
    message.success(`${file.name} selected.`);
    form.setFieldsValue({ import_file: file });
    return false; // Prevent auto upload
  };

  // Handle contact add method change
  const handleContactAddMethodChange = (e: any) => {
    setContactAddMethod(e.target.value);
  };

  // Handle field selection change
  const handleFieldSelectionChange = (value: string[]) => {
    setSelectedFields(value);
    form.setFieldsValue({ field_selection: value });
  };

  // Add a new row of contact fields
  const addContactRow = () => {
    setContactFields([...contactFields, { email: '', firstName: '', lastName: '', details: '' }]);
  };

  // Remove a row of contact fields
  const removeContactRow = (index: number) => {
    const updatedFields = [...contactFields];
    updatedFields.splice(index, 1);
    setContactFields(updatedFields);
  };

  // Reset form
  const handleReset = () => {
    form.resetFields();
    setContactAddMethod('file');
  };

  // Handle form submission to reload api trigger
  useEffect(() => {
    console.log('Reload API Trigger:', reloadApiTrigger);
    dispatch(setUnwantedTrigger({ value: reloadApiTrigger }));
  }, [reloadApiTrigger]);

  // Render group info (Step 1)
  const renderGroupInfo = () => {
    return (
      <>
        <Row gutter={32}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="group_name"
              label={
                <div>
                  <NumberOutlined className="label-icon cls-icon-bounce" style={{ color: '#8b5cf6' }} /> Group name
                </div>
              }
              rules={[
                {
                  required: true,
                  message: 'Missing group name'
                },
                {
                  min: 5,
                  message: 'Group name must be at least 5 characters'
                }
              ]}
            >
              <Input
                placeholder="Enter the group name"
                prefix={<UsergroupAddOutlined />}
                onChange={(e) => handleInputChange('group_name', e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="topic"
              label={
                <div style={{ marginBottom: '7px' }}>
                  <FileTextOutlined className="label-icon cls-icon-bounce" style={{ color: '#ec4899' }} /> Topic
                </div>
              }
            >
              <FolderFilter
                folders={[]}
                pathname="manageGroup"
                activeFolder={undefined}
                handler={(value: any) => handleInputChange('topic', value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              name="description"
              label={
                <div>
                  <FileTextOutlined className="label-icon cls-icon-bounce" style={{ color: '#10b981' }} /> Description
                  detail
                </div>
              }
            >
              <TextArea placeholder="Enter the description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  // Render contact add options (Step 2)
  const renderContactAddOptions = () => {
    return (
      <>
        <Row gutter={32}>
          <Col span={24} style={{ paddingBottom: '8px' }}>
            <label>
              <div className="cls-form-sub-title">
                <UserAddOutlined className="label-icon cls-icon-bounce" style={{ color: '#f97316' }} /> Contact add by :
              </div>
            </label>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              name="contact_add_method"
              rules={[{ required: true, message: 'Please select a method to add contacts' }]}
            >
              <Radio.Group
                onChange={handleContactAddMethodChange}
                value={contactAddMethod}
                className="contact-method-radio"
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Radio value="file" className="radio-file">
                      <div className="radio-content">
                        <div className="radio-text">
                          <UploadOutlined className="radio-icon cls-icon-bounce" />
                          <div className="primary-text">Import File</div>
                          <div className="secondary-text">Upload CSV or Excel file</div>
                        </div>
                      </div>
                    </Radio>
                  </Col>
                  <Col span={12}>
                    <Radio value="manual" className="radio-manual ">
                      <div className="radio-content">
                        <div className="radio-text">
                          <UserAddOutlined className="radio-icon cls-icon-bounce" />
                          <div className="primary-text">Manual Entry</div>
                          <div className="secondary-text">Add contacts manually</div>
                        </div>
                      </div>
                    </Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        {contactAddMethod === 'file' ? renderFileUpload() : renderManualContactAdd()}
      </>
    );
  };

  // Render file upload section
  const renderFileUpload = () => {
    return (
      <Row gutter={32}>
        {/* <Col lg={pathName != undefined && pathName === 'manageView' ? 6 : 4}>
                    <label>
                        <span className='cls-form-sub-title cls-sub-topic'><UploadOutlined /> Import contact :</span>
                    </label>
                </Col> */}
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Form.Item
            name="import_file"
            rules={[{ required: true, message: 'Please upload a file' }]}
            validateTrigger={['onChange', 'onBlur']}
          >
            <Row className="cls-import-file-container">
              <div className="cls-file-upload-container">
                <Dragger
                  name="file"
                  multiple={false}
                  accept=".xls,.xlsx,.csv"
                  beforeUpload={handleBeforeUpload}
                  showUploadList={true}
                >
                  <Row align="middle">
                    <Col span={10}>
                      <UploadsAnimation />
                    </Col>
                    <Col span={14}>
                      <p className="cls-upload-text">Drag and drop your files or click here to upload</p>
                      <p className="cls-upload-hint">Supported file formats are XLSX, XLS & CSV</p>
                      <p className="cls-download-sample">
                        Click here to download Sample File
                        {fileList?.map((file: any, index: any) => (
                          <a key={index} href="#" onClick={() => downloadFile(file.value)}>
                            {file.label}
                          </a>
                        ))}
                      </p>
                    </Col>
                  </Row>
                </Dragger>
              </div>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    );
  };

  // Render manual contact add section
  const renderManualContactAdd = () => {
    const formFields = contactFieldsInfo.data?.response.data.results;
    return (
      <div className="cls-manual-select">
        <Row gutter={32}>
          {/* <Col>
                        <span className='cls-sub-topic'><UserAddOutlined /> Manual contact entry</span>
                    </Col> */}
        </Row>
        <Row gutter={32}>
          <Col lg={4}>
            <label>
              <span className="cls-required-star">*</span>
              <span className="cls-form-sub-title">Field details :</span>
            </label>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={24}>
            <Form.Item
              name="field_selection"
              rules={[{ required: true, message: 'Please select at least one field' }]}
              className="cls-custom-filter-selector"
            >
              <FolderFilter
                folders={selectedFields}
                pathname="manageGroupForm"
                activeFolder={selectedFields}
                handler={handleFieldSelectionChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className={selectedFields.length > 4 ? 'cls-contact-fields-row-border' : 'cls-contact-fields-row'}>
          <Col
            span={23}
            className={selectedFields.length > 4 ? 'cls-contact-fields-scroll' : ''}
            style={{ overflowX: 'auto' }}
          >
            {contactFields.map((_field, index) => (
              <Row gutter={32} key={index} className="cls-contact-row">
                {selectedFields.map((fieldKey: any) => {
                  const config = formFields.find((field: any) => field.field_name === fieldKey);
                  if (!config) return null;

                  return (
                    <Col span={6} key={config.field_id}>
                      <label className={index === 0 ? 'cls-group-label' : ''}>
                        {fieldKey === 'email_id' && index === 0 && <span className="cls-required-star">*</span>}
                        {index === 0 && (
                          <span className="cls-form-sub-title">{fieldNameFormatter(config.field_name)}</span>
                        )}
                      </label>
                      <Form.Item
                        className="cls-contact-fields"
                        name={['contacts', index, config.field_name]}
                        rules={[
                          {
                            required: config.required,
                            message: fieldNameFormatter(config.field_name) + ' is required'
                          },

                          ...(config.field_type === 'email'
                            ? [
                                {
                                  pattern: new RegExp(
                                    config.regex || '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
                                  ),
                                  message: fieldNameFormatter(config.field_name) + ' is invalid'
                                }
                              ]
                            : []),

                          ...(config.field_type === 'string' && config.field_name !== 'phone_number'
                            ? [
                                {
                                  pattern: new RegExp(config.regex || '^[A-Za-z\\s]+$'),
                                  message: fieldNameFormatter(config.field_name) + ' is invalid'
                                }
                              ]
                            : []),

                          ...(config.field_type === 'string' && config.field_name === 'phone_number'
                            ? [
                                {
                                  pattern: new RegExp(config.regex || '^\\+?[1-9]\\d{1,14}$'),
                                  message: fieldNameFormatter(config.field_name) + ' is invalid'
                                }
                              ]
                            : []),

                          ...(config.field_type === 'number'
                            ? [
                                {
                                  pattern: new RegExp(config.regex || '^-?\\d+(\\.\\d+)?$'),
                                  message: fieldNameFormatter(config.field_name) + ' is invalid'
                                }
                              ]
                            : [])
                        ]}
                      >
                        <Input
                          type={config.field_type === 'email' ? 'text' : config.field_type}
                          placeholder={config.description}
                        />
                      </Form.Item>
                    </Col>
                  );
                })}
              </Row>
            ))}
          </Col>
          <Col span={1}>
            <Row>
              {contactFields.map((_field, index) =>
                index > 0 ? (
                  <Button
                    type="text"
                    danger
                    className="cls-delete-row-btn"
                    icon={<DeleteOutlined onClick={() => removeContactRow(index)} />}
                  />
                ) : null
              )}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Button type="link" onClick={addContactRow} className="cls-add-row-btn">
              + Add row
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  useEffect(() => {
    if (pathName != undefined && (pathName === 'manageView' || pathName == 'manageContact')) {
      setCreateInfo((prev: any) => ({
        ...prev,
        group_name: 'Create Contact'
      }));
    }
  }, []);

  return (
    <div
      className={`cls-manage-group-form cls-common-style ${
        pathName === 'manageView' || pathName == 'manageContact' ? 'cls-manage-form-container' : ''
      }`}
    >
      <FormLayout
        title={pathName === 'manageView' || pathName == 'manageContact' ? 'Create contact' : 'Create group'}
        description={'Manage your contact group efficiently'}
        pathname="group_form"
        backFunction={undefined}
        isBack={undefined}
      >
        <Spin
          spinning={actionUrl === 'edit'}
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 80, color: '#fd9646' }} />}
        >
          <Form
            layout={'vertical'}
            form={form}
            initialValues={{
              contact_add_method: 'file',
              field_selection: selectedFields
            }}
            onFinish={addContactData}
          >
            {pathName !== 'manageView' && pathName !== 'manageContact' && <Col span={24}>{renderGroupInfo()}</Col>}
            <Col>{renderContactAddOptions()}</Col>
            <Row className="cls-form-btns" gutter={32} justify="end">
              <Col>
                <Button type="link" className="cls-reset-btn" onClick={handleReset}>
                  <ReloadOutlined />
                  Reset
                </Button>
              </Col>
              <Col>
                <Button htmlType="submit" type="primary" size="middle" className="cls-primary-button">
                  {isLoading ? (
                    <LoadingOutlined />
                  ) : (
                    <span>
                      <CheckOutlined /> Submit
                    </span>
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      </FormLayout>
      <Modal
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          if (pathName == undefined) navigate('/manageGroup');
        }}
        footer={null}
        centered
        className="cls-modal-section"
      >
        <GroupDetailShow responseData={responseData} groupDetails={groupData} manageGroup={undefined} index={''} />
      </Modal>
    </div>
  );
};

export default ManageGroupForm;
