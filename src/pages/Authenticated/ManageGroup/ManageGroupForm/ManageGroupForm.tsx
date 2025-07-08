import { Button, Col, Row, Form, Input, Spin, Radio, Upload, message, notification, Modal } from 'antd';
import { PlusCircleFilled, ReloadOutlined, DeleteOutlined, InboxOutlined } from '@ant-design/icons';
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
import FolderFilter from '@/components/FolderFilter/FolderFilter';
import { downloadFile, fieldNameFormatter } from '../../../../Utils/commonFunction';
import { FormLayout } from '../../../../layouts/Form/Form';
import GroupDetailShow from '@/components/GroupDetailShow/GroupDetailShow';

interface ContactField {
  email: string;
  firstName: string;
  lastName: string;
  details: string;
}

const { Dragger } = Upload;

const ManageGroupForm: React.FC<ManageGroupFormProps> = ({ pathName, groupData, closeModal, isBack }) => {
  const { action: actionUrl } = useParams() as { action: string; id: string };
  const [form] = useForm();
  const navigate = useNavigate();
  const [addContactGroupService, { isLoading }] = useAddContactsGroupMutation();
  const [updateGroupIdContactsService] = useUpdateGroupIdContactsMutation();
  const { project } = useAppSelector((state: { TemplateProjectReducer: any }) => state.TemplateProjectReducer);
  const [createInfo, setCreateInfo] = useState<CreateGroupBasicInfo | undefined>({
    group_name: undefined,
    description: undefined,
    project_id: undefined,
    status: undefined,
    topic: undefined,
    attachment: [],
    contacts: []
  });
  const [isCreate, setIsCreate] = useState(actionUrl === 'create');
  const [step, setStep] = useState(1);
  const [contactAddMethod, setContactAddMethod] = useState('file');
  const [contactFields, setContactFields] = useState<ContactField[]>([
    { email: '', firstName: '', lastName: '', details: '' }
  ]);
  const [selectedFields, setSelectedFields] = useState<any>(['email_id', 'first_name', 'last_name']);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [contactFieldsStatus, contactFieldsInfo]: any = useLazyGetDetailFieldsQuery();
  // const [topicList, setTopicList] = useState<string | undefined>();
  const [fileList, setFiles] = useState<any | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [getContactGroup, getContactGroupInfo] = useLazyGetContactGroupMasterQuery();
  // To trigger the call with project by using project id
  useEffect(() => {
    if (project != undefined) {
      getContactGroup({ project: project });
      contactFieldsStatus({ project: project });
    }
  }, [project]);

  useEffect(() => {
    if (getContactGroupInfo.isSuccess && getContactGroupInfo.data) {
      // const data = getContactGroupInfo.data as { response?: { data?: { topic?: string } } };
      const masterFiles = getContactGroupInfo.data as { response?: { data?: { others?: any } } };
      // setTopicList(data.response?.data?.topic);
      setFiles(masterFiles.response?.data?.others);
    }
  }, [getContactGroupInfo]);

  //define the responseData
  const [responseData, setResponseData] = useState<any | undefined>();

  // Handle form submission for the first step
  const addContactData = async (values: any) => {
    if (isCreate && (values?.group_name !== undefined || values?.description !== undefined)) {
      setCreateInfo((prev: any) => ({
        ...prev,
        group_name: values?.group_name,
        description: values?.description,
        project_id: project
      }));
      setStep(2);
    } else {
      let updatedInfo: CreateGroupBasicInfo = createInfo as CreateGroupBasicInfo;
      updatedInfo.contacts = values?.contact_add_method === 'manual' ? values?.contacts : [];
      updatedInfo.topic = (groupData as any)?.topic_id || '681e080347e451e50daa3caa';
      updatedInfo.attachment = [];
      updatedInfo.status = (groupData as any)?.status || '681e080347e451e50daa3c8f';
      if (pathName != undefined && pathName == 'manageView') {
        updatedInfo.contact_group_id = (groupData as any)?.group_id || values?.group_name;
        updatedInfo.project_id = project;
        updatedInfo.contacts = values?.contact_add_method === 'manual' ? values?.contacts : undefined;
      }
      setCreateInfo((prev: any) => ({
        ...prev,
        ...(pathName != undefined &&
          pathName == 'manageView' && {
            contact_group_id: (groupData as any)?.group_id || values?.group_name,
            project_id: project
          }),
        contacts: values?.contact_add_method === 'manual' ? values?.contacts : [],
        topic: (groupData as any)?.topic_id || '681e080347e451e50daa3caa',
        attachment: [uploadedFile],
        status: (groupData as any)?.status || '681e080347e451e50daa3c8f'
      }));

      if (values?.contact_add_method === 'manual') {
        try {
          if (pathName != undefined && pathName == 'manageView')
            updateGroupIdContactsService(updatedInfo)
              .unwrap()
              .catch((resp: any) => resp.data)
              .then((response: any) => {
                if (response.responseCode === 0 || response?.response?.Message === 'Success') {
                  notification.success({ message: 'Contact group created successfully' });
                  closeModal();
                } else {
                  let errorObj =
                    Object.keys(response?.response?.errors).length > 0
                      ? Object.keys(response?.response?.errors)[0]
                      : undefined;
                  let errorMsg = errorObj ? response?.response?.errors[errorObj][0] : 'Invalid input';
                  notification.error({ message: errorMsg });
                }
              });
          else
            addContactGroupService(updatedInfo)
              .unwrap()
              .catch((resp: any) => resp.data)
              .then((response: any) => {
                if (response.responseCode === 0 || response?.response?.Message === 'Success') {
                  notification.success({ message: 'Contact group created successfully' });
                  navigate('/manageGroup');
                } else {
                  let errorObj =
                    Object.keys(response?.response?.errors).length > 0
                      ? Object.keys(response?.response?.errors)[0]
                      : undefined;
                  let errorMsg = errorObj ? response?.response?.errors[errorObj][0] : 'Invalid input';
                  notification.error({ message: errorMsg });
                }
              });
        } catch (error) {
          // message.error('Failed to create group.');
        }
      } else if (values?.contact_add_method === 'file') {
        const formData = new FormData();
        formData.append('request', JSON.stringify(updatedInfo));
        formData.append('attachment', uploadedFile as any, uploadedFile?.name);
        try {
          if (pathName != undefined && pathName == 'manageView')
            updateGroupIdContactsService(formData)
              .unwrap()
              .catch((resp: any) => resp.data)
              .then((response: any) => {
                if (response.responseCode === 0) {
                  closeModal();
                  setResponseData(response);
                  setOpenModal(true);
                  notification.success({ message: 'Contact group created successfully' });
                } else {
                  let errorMsg = response[0];
                  notification.error({ message: errorMsg ? errorMsg : 'Invalid input. Kindly check.' });
                }
              });
          else
            addContactGroupService(formData)
              .unwrap()
              .catch((resp: any) => resp.data)
              .then((response: any) => {
                if (response.responseCode === 0) {
                  setResponseData(response);
                  setOpenModal(true);
                  notification.success({ message: 'Contact group created successfully' });
                } else {
                  let errorMsg = response[0];
                  notification.error({ message: errorMsg ? errorMsg : 'Invalid input. Kindly check.' });
                }
              });
        } catch (error) {
          // message.error('Failed to create group.');
        }
      }
    }
  };

  // The following method is triggered when file is file selected or drop
  const handleBeforeUpload = (file: File) => {
    setUploadedFile(file); // Store the File object
    message.success(`${file.name} selected.`);
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
    if (step > 1) {
      setStep(1);
      setIsCreate(true);
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) {
        setIsCreate(true);
      }
    }
  };

  // Render group info (Step 1)
  const renderGroupInfo = () => {
    return (
      <Row gutter={32}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Form.Item
            name="group_name"
            label={<span className="cls-required-label">Group name</span>}
            rules={[
              {
                required: true,
                message: 'Missing group name'
              }
            ]}
          >
            <Input placeholder="Enter the group name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Form.Item
            name="description"
            label={<span className="cls-required-label">Description detail</span>}
            rules={[
              {
                required: true,
                message: 'Missing description'
              }
            ]}
          >
            <Input placeholder="Enter the description" />
          </Form.Item>
        </Col>
      </Row>
    );
  };

  // Render contact add options (Step 2)
  const renderContactAddOptions = () => {
    return (
      <>
        {pathName === undefined && (
          <Row gutter={32}>
            <Col lg={4}>
              <label>
                <span className="cls-required-star">*</span>
                Topic :
              </label>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <FolderFilter folders={[]} pathname="manageGroup" activeFolder={undefined} handler={() => {}} />
            </Col>
          </Row>
        )}
        <Row gutter={32}>
          <Col lg={pathName != undefined && pathName === 'manageView' ? 6 : 4}>
            <label>
              <span className="cls-required-star">*</span>
              Contact add by :
            </label>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={pathName != undefined && pathName === 'manageView' ? 18 : 12}
            xxl={24}
          >
            <Form.Item
              name="contact_add_method"
              rules={[{ required: true, message: 'Please select a method to add contacts' }]}
            >
              <Radio.Group onChange={handleContactAddMethodChange} value={contactAddMethod}>
                <Radio value="file">Contact imported by external file</Radio>
                <Radio value="manual">Contact added manually</Radio>
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
        <Col lg={pathName != undefined && pathName === 'manageView' ? 6 : 4}>
          <label>
            <span className="cls-required-star">*</span>
            Import contact :
          </label>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={pathName != undefined && pathName === 'manageView' ? 18 : 20} xxl={24}>
          <Form.Item name="import_file" rules={[{ required: true, message: 'Please upload a file' }]}>
            <Row className="cls-import-file-container">
              <div className="cls-file-upload-container">
                <Dragger
                  name="file"
                  multiple={false}
                  accept=".xls,.xlsx,.csv"
                  beforeUpload={handleBeforeUpload}
                  showUploadList={true}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
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
      <>
        <Row gutter={32}>
          <Col lg={4}>
            <label>
              <span className="cls-required-star">*</span>
              Field details :
            </label>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={24}>
            <Form.Item name="field_selection" rules={[{ required: true, message: 'Please select at least one field' }]}>
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
                        {index === 0 && fieldNameFormatter(config.field_name)}
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
      </>
    );
  };

  useEffect(() => {
    if (pathName != undefined && pathName === 'manageView') {
      setCreateInfo((prev: any) => ({
        ...prev,
        group_name: 'Create Contact'
      }));
      setStep(2);
    }
  }, []);

  return (
    <div className={`cls-manage-group-form ${pathName === 'manageView' ? 'cls-manage-form-container' : ''}`}>
      <FormLayout
        title={step === 1 ? 'Create group' : createInfo?.group_name || ''}
        description={step === 1 ? '' : createInfo?.description || ''}
        pathname="group form"
        backFunction={step === 1 ? undefined : handleBack}
        isBack={isBack ? true : undefined}
      >
        <Spin
          spinning={actionUrl === 'edit' && step === 1}
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 80, color: '#fd9646' }} />}
        >
          <Form
            layout={step === 1 ? 'vertical' : 'horizontal'}
            form={form}
            initialValues={{
              contact_add_method: 'file',
              field_selection: selectedFields
            }}
            onFinish={addContactData}
          >
            <Col span={24} className="cls-fields-container">
              {step === 1 ? renderGroupInfo() : renderContactAddOptions()}
            </Col>
            <Row className="cls-form-btns" gutter={32} justify="end">
              <Col>
                <Button type="default" className="cls-reset-btn" onClick={handleReset}>
                  <ReloadOutlined />
                  Reset
                </Button>
              </Col>
              <Col>
                {step === 1 ? (
                  <Button htmlType="submit" type="primary" size="middle" icon={<PlusCircleFilled />}>
                    Add contacts
                  </Button>
                ) : (
                  <Button htmlType="submit" type="primary" size="middle">
                    {isLoading ? <LoadingOutlined /> : 'Submit'}
                  </Button>
                )}
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
        <GroupDetailShow
          responseData={responseData}
          groupDetails={groupData?.response?.data}
          manageGroup={undefined}
          index={''}
          pathName={'ManageGroupForm'}
        />
      </Modal>
    </div>
  );
};

export default ManageGroupForm;
