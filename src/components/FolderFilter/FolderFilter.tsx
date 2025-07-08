import { Input, Select, Button, Form, Modal, Switch, notification } from 'antd';
import { useEffect, useState } from 'react';
import {
  CaretDownOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  PlusCircleFilled
} from '@ant-design/icons';
import {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderForcefullyMutation,
  useCloneFolderMutation
} from '../../services/folder/Folder';
import './FolderFilter.scss';
import {
  useAddEnvironmentMutation,
  useDeleteEnvironmentMutation,
  useUpdateEnvironmentMutation
} from '../../services/mailer/Mailer';
import { useDispatch } from 'react-redux';
import { setIsEnvironmentUpdate } from '../../stores/TemplateProject.store';
import { useAppSelector } from '../../hooks/App.hook';
import { useEnvironmentSelection } from '../../hooks/Selection.hook';
import {
  useAddFieldMutation,
  useAddTopicMutation,
  useLazyGetContactGroupMasterQuery,
  useLazyGetDetailFieldsQuery,
  useUpdateFieldMutation,
  useUpdateTopicMutation
} from '../../services/contacts/groups/Group';
import { fieldNameFormatter, generateRandomLetters } from '../../Utils/commonFunction';
import { DeleteIcon, EditIcon, CopyIcon } from '../Icons/Icons';

interface IFolderFilter {
  pathname: string;
  folders: IFolders[];
  handler: Function;
  activeFolder?: number | string;
  version?: string;
}
interface IFolders {
  folder_id?: string;
  folder_name?: string;
  count?: number;
  environment_name?: string;
  environment_id?: string;
  environment_status: string;
}

const FolderFilter = ({ pathname, folders, handler, activeFolder, version }: IFolderFilter) => {
  const [folderList, setFolderList] = useState<any>(folders);
  const { folders: folderListInfo } = useAppSelector((state) => state.TemplateReducer.templateFolder);
  const { project } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const { Option } = Select;
  const dispath = useDispatch();
  const { enviromentUpdate } = useAppSelector((state) => state.TemplateProjectReducer);
  // const totalTemplates =
  //   folders.length > 0 ? folders?.reduce((totalCount, currentCount) => totalCount + currentCount.count, 0) : 0;
  const [isEditFolder, setIsEditFolder] = useState(false);
  const [type, setType] = useState('');
  const [enviroinmentId, setEnviroinmentId] = useState<any>(undefined);
  const [isAddFolder, setIsAddFolder] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editMailerForm] = Form.useForm();
  const [isRename, setIsRename] = useState('');
  const [createFolderform] = Form.useForm();
  const [updateFolderform] = Form.useForm();
  const [createFolderService] = useCreateFolderMutation();
  const [updateEnvironmentService, updateEnvironmentServiceStatus] = useUpdateEnvironmentMutation();
  const [addEnvironmentService, addEnvironmentServiceStatus] = useAddEnvironmentMutation();
  const [deleteEnvironment, deleteEnvironmentStatus] = useDeleteEnvironmentMutation();
  const [deleteFolderService] = useDeleteFolderMutation();
  const [updateFolderService] = useUpdateFolderMutation();
  const [forceDeleteService] = useDeleteFolderForcefullyMutation();
  const [cloneService] = useCloneFolderMutation();
  const { options: environmentOptions, reloadOptions } = useEnvironmentSelection();
  const [getContactGroupService, getContactGroup] = useLazyGetContactGroupMasterQuery();
  const [addTopicService] = useAddTopicMutation();
  const [updateTopic] = useUpdateTopicMutation();
  const [contactFieldsService, contactFieldsInfo]: any = useLazyGetDetailFieldsQuery();
  const [addField] = useAddFieldMutation();
  const [updateField] = useUpdateFieldMutation();

  // To Set the field type
  const fieldOptions = ['string', 'integer', 'float', 'boolean', 'date', 'datetime', 'email', 'phone_number'];

  // To call the MasterInfo get the Group topics
  useEffect(() => {
    if (project) {
      getContactGroupService({ project: project });
      contactFieldsService({ project: project });
    }
  }, [project, getContactGroupService, contactFieldsService]);

  useEffect(() => {
    if (pathname === 'mailer' && (environmentOptions as any)?.length > 0) setFolderList(environmentOptions);
  }, [environmentOptions]);

  useEffect(() => {
    if (pathname !== 'mailer' && pathname !== 'manageGroup' && (folderListInfo as any)?.length > 0)
      setFolderList(folderListInfo);
  }, [folderListInfo]);

  // To sets the response to the Form dropdown
  useEffect(() => {
    if (pathname === 'manageGroup' && getContactGroup.data) {
      const data = getContactGroup.data as { response?: { data?: { topic?: string } } };
      data.response?.data?.topic && setFolderList(data?.response?.data?.topic);
    }
  }, [getContactGroup]);

  // To sets the response to the Form dropdown  from the contact fields
  useEffect(() => {
    if (pathname === 'manageGroupForm' && contactFieldsInfo.isSuccess && contactFieldsInfo.data) {
      const data = contactFieldsInfo.data as { response?: { data?: { results?: any[] } } };
      setFolderList(data.response?.data?.results);
      console.log(data.response?.data?.results);
    }
  }, [contactFieldsInfo]);

  useEffect(() => {
    if (
      updateEnvironmentServiceStatus?.isSuccess ||
      addEnvironmentServiceStatus?.isSuccess ||
      deleteEnvironmentStatus?.isSuccess
    )
      reloadOptions();
  }, [updateEnvironmentServiceStatus, addEnvironmentServiceStatus, deleteEnvironmentStatus]);

  const updateFolder = (fName: any) => {
    fName['project'] = localStorage.getItem('project');
    updateFolderService({ folder_id: isRename, update_folder: fName, pathname });
    updateFolderform.resetFields();
    setIsRename('');
  };
  const createFolder = (values: any) => {
    values['project'] = localStorage.getItem('project');
    createFolderService({ add_folder: values, pathname });
    createFolderform.resetFields();
    setIsAddFolder(false);
  };
  const resetCreateFolder = () => {
    createFolderform.resetFields();
    setIsAddFolder(false);
  };
  const deleteFolder = (folder_id: string) => {
    deleteFolderService({ folder_id, pathname })
      .unwrap()
      .catch((err) => {
        if (err.data.response.errors.non_field_errors) {
          Modal.confirm({
            title: 'Warning!',
            icon: <ExclamationCircleOutlined />,
            content: err.data.response.errors.non_field_errors,
            onOk() {
              forceDeleteService({ folder_id, pathname });
            },
            onCancel() {
              return;
            }
          });
        }
      });
  };
  const cloneFolder = (folder_id: string, folder_name: string) => {
    let folderNumber = /\(([^)]+)\)/.exec(folder_name);
    let cloneNumber = folderNumber ? parseInt(folderNumber[1]) + 1 : 2;
    let newName = folder_name.split('(', 1)[0];
    let cloneData = {
      selected_folder_id: folder_id,
      select_template_all: 'Y',
      new_folder_name: `${newName}(${cloneNumber})`
    };
    cloneService({ cloneData, pathname })
      .unwrap()
      .catch(() => {
        Modal.error({
          title: 'Problem while cloning',
          content: 'Kindly rename the folder and check again'
        });
      });
  };

  // To handle the selection change
  const handleSelectionChange = (value: any) => {
    // For manageGroupForm, handle multiple selections
    if (pathname === 'manageGroupForm') {
      // Find the email field
      const emailField = folderList?.find((f: any) => f.field_type === 'email');

      // If there's an email field, ensure it's always included
      if (emailField) {
        const emailFieldName = emailField.field_name;

        // If email field was deselected, add it back
        if (!value.includes(emailFieldName)) {
          value = [emailFieldName, ...value];
        }
      }

      handler(value);
    } else {
      handler(value);
    }
  };

  return (
    <>
      <Select
        mode={pathname === 'manageGroupForm' ? 'multiple' : undefined}
        placeholder={
          pathname === 'manageGroup' || pathname === 'campaign'
            ? 'Select topic'
            : pathname === 'template'
            ? 'Folders'
            : 'Select environment'
        }
        style={{ minWidth: 190 }}
        data-testid="folder_click_Indicator"
        className={`cls-folders ${pathname === 'manageGroupForm' ? 'cls-manageGroupForm' : ''}`}
        value={activeFolder}
        onChange={(value) => {
          handleSelectionChange(value);
        }}
        allowClear={pathname === 'manageGroupForm'}
        suffixIcon={version === 'v3' ? <CaretDownOutlined style={{ color: '#888', fontSize: 16 }} /> : undefined}
        showArrow
        dropdownRender={(menu) => (
          <>
            {menu}
            {pathname === 'template' ? (
              <div className="flex-container folder-btns">
                {isAddFolder && (
                  <Form className="px-2 mt-2" form={createFolderform} name="newFolder" onFinish={createFolder}>
                    <Form.Item name="folder_name" rules={[{ required: true, message: 'Name required' }]}>
                      <Input autoComplete="off" placeholder="Enter folder name" />
                    </Form.Item>
                    <Form.Item className="flex-container">
                      <Button htmlType="button" onClick={resetCreateFolder}>
                        Cancel
                      </Button>{' '}
                      <Button type="primary" htmlType="submit">
                        Create
                      </Button>
                    </Form.Item>
                  </Form>
                )}
                {isRename !== '' && (
                  <Form onFinish={updateFolder} form={updateFolderform}>
                    <Form.Item name="folder_name" rules={[{ required: true, message: 'Name required' }]}>
                      <Input.Search
                        placeholder="Enter name"
                        autoComplete="off"
                        enterButton={<CheckOutlined style={{ fontSize: 14 }} />}
                        addonAfter={
                          <Button
                            onClick={() => {
                              setIsRename('');
                            }}
                          >
                            <CloseOutlined style={{ fontSize: 14 }} />
                          </Button>
                        }
                        onSearch={() => {
                          updateFolderform.submit();
                        }}
                      />
                    </Form.Item>
                  </Form>
                )}
                {!isAddFolder && isRename === '' && (
                  <Button
                    type="default"
                    disabled={isEditFolder}
                    onClick={() => {
                      setIsEditFolder(true);
                    }}
                  >
                    Edit folder
                  </Button>
                )}
                {!isEditFolder && !isAddFolder && isRename === '' && (
                  <Button type="primary" data-testid="add_folder_btn" onClick={() => setIsAddFolder(true)}>
                    Add folder
                  </Button>
                )}
                {isEditFolder && !isAddFolder && isRename === '' && (
                  <Button type="primary" onClick={() => setIsEditFolder(false)}>
                    Apply
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="flex-container folder-btns">
                  <Button
                    type="primary"
                    style={{ width: pathname === 'mailer' ? '150px' : '100px' }}
                    data-testid="add_environment_btn"
                    onClick={() => {
                      setType('create');
                      setIsEditModalVisible(true);
                      editMailerForm.setFieldsValue({
                        environment: undefined,
                        status: undefined
                      });
                    }}
                    icon={<PlusCircleFilled />}
                  >
                    {pathname === 'mailer' ? 'Add environment' : pathname === 'manageGroup' ? 'Add Topic' : 'Add Field'}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      >
        {folderList?.map((folder: IFolders | any) => (
          <Option
            className="folder-option"
            value={
              pathname === 'template'
                ? parseInt(folder.folder_id)
                : pathname === 'manageGroup'
                ? folder?.value
                : pathname === 'manageGroupForm'
                ? folder.field_name
                : folder.environment_id
            }
            disabled={pathname === 'manageGroupForm' ? folder.field_type === 'email' : isEditFolder}
            key={
              pathname === 'manageGroup'
                ? folder?.value
                : pathname === 'manageGroupForm'
                ? folder.field_id
                : folder.folder_name
                ? folder.folder_name
                : folder.environment_name
            }
          >
            <span className={`folder-name ${pathname === 'manageGroup' ? 'cls-folder-name' : ''}`}>
              {pathname === 'manageGroup'
                ? folder?.label
                : pathname === 'manageGroupForm'
                ? folder.field_name
                  ? fieldNameFormatter(folder.field_name)
                  : ''
                : folder.folder_name
                ? folder.folder_name
                : folder.environment_name}
            </span>
            {pathname === 'template' ? <span className="folder-count">{folder.count}</span> : <></>}
            {pathname === 'mailer' || pathname === 'manageGroup' || pathname === 'manageGroupForm' ? (
              <div className="folder-actions">
                <button
                  className="pr-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditModalVisible(true);
                    setType('edit');

                    if (pathname === 'mailer') {
                      setEnviroinmentId(folder.environment_id);
                      editMailerForm.setFieldsValue({
                        environment: folder.environment_name,
                        status: folder.environment_status
                      });
                    } else if (pathname === 'manageGroup') {
                      setEnviroinmentId(folder.value);
                      editMailerForm.setFieldsValue({
                        environment: folder.label
                      });
                    } else if (pathname === 'manageGroupForm') {
                      setEnviroinmentId(folder.field_id);
                      editMailerForm.setFieldsValue({
                        environment: folder.field_name,
                        status: folder.required,
                        field_type: folder.field_type,
                        regex: folder.regex,
                        description: folder.description,
                        field_name: folder.field_name
                      });
                    }
                  }}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={(e) => {
                    if (pathname === 'mailer') {
                      setEnviroinmentId(folder.environment_id);
                      deleteEnvironment({ id: folder.environment_id, project: localStorage.getItem('project') });
                      dispath(setIsEnvironmentUpdate(enviromentUpdate));
                    }
                    if (pathname === 'manageGroup') {
                      console.log(folder);
                    }
                    if (pathname === 'manageGroupForm') {
                      console.log(folder);
                    }
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DeleteIcon />{' '}
                </button>
              </div>
            ) : (
              <></>
            )}
            {isEditFolder && isRename !== folder.folder_id && (
              <div className="folder-actions">
                <button
                  className="pr-2"
                  onClick={() => {
                    setIsRename(folder.folder_id);
                    updateFolderform.setFieldsValue({ folder_name: folder.folder_name });
                    // editFolder(folder.folder_id);
                  }}
                >
                  <EditIcon />
                </button>
                {pathname === 'template' ? (
                  <button
                    className="pr-2"
                    onClick={() => {
                      cloneFolder(folder.folder_id, folder.folder_name);
                    }}
                  >
                    <CopyIcon />
                  </button>
                ) : (
                  <></>
                )}
                <button
                  onClick={() => {
                    deleteFolder(folder.folder_id);
                  }}
                >
                  <DeleteIcon />{' '}
                </button>
              </div>
            )}
          </Option>
        ))}
      </Select>
      {(pathname === 'mailer' || pathname === 'manageGroup' || pathname === 'manageGroupForm') && (
        <Modal
          title={
            type === 'create'
              ? pathname === 'manageGroup'
                ? 'Create topic'
                : pathname === 'manageGroupForm'
                ? 'Create Field Details'
                : 'Create Environment'
              : pathname === 'manageGroup'
              ? 'Edit topic'
              : pathname === 'manageGroupForm'
              ? 'Edit Field Details'
              : 'Edit Environment'
          }
          open={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          onOk={() => {
            setIsEditModalVisible(false);
            const environment: any = {
              environment: {
                [pathname === 'manageGroupForm' ? 'field_name' : 'name']: editMailerForm.getFieldsValue().environment,
                [pathname === 'manageGroupForm' ? 'project_id' : 'project']: localStorage.getItem('project'),
                [pathname === 'manageGroupForm' ? 'required' : 'status']:
                  pathname === 'manageGroupForm'
                    ? editMailerForm.getFieldsValue().status || true
                    : editMailerForm.getFieldsValue().status
                    ? '1'
                    : '2'
              }
            };
            if (pathname == 'manageGroupForm') {
              environment.environment['field_type'] = editMailerForm.getFieldsValue().field_type;
              environment.environment['regex'] = editMailerForm.getFieldsValue().regex || '';
              environment.environment['description'] = editMailerForm.getFieldsValue().description || '';
              environment.environment['status'] = folderList.status;

              //To find the required status from the folderList
              const currentField = folderList?.find((field: any) => field.field_id === enviroinmentId);
              environment.environment['status'] = currentField?.status || ' ';
            }
            if (type === 'create') {
              if (type === 'create') {
                if (pathname == 'manageGroup') {
                  const generatedTopicCode = generateRandomLetters();
                  addTopicService({
                    name: environment.environment.name,
                    topic_code: generatedTopicCode,
                    field_type: 'string',
                    required: false,
                    project_id: environment.environment.project
                  })
                    .unwrap()
                    .then(() => {
                      notification.success({
                        message: 'Topic created successfully'
                      });
                      getContactGroupService({
                        project: environment.environment.project
                      });
                      setType('');
                      setEnviroinmentId(undefined);
                    })
                    .catch((error) => {
                      notification.error({
                        message: 'Failed to create topic',
                        description: error.message
                      });
                    });
                } else if (pathname === 'manageGroupForm') {
                  addField({
                    contact_fields: environment.environment
                  })
                    .unwrap()
                    .then(() => {
                      notification.success({
                        message: 'Field created successfully'
                      });
                      contactFieldsService({
                        project: environment.environment.project_id
                      });
                      setType('');
                      setEnviroinmentId(undefined);
                    })
                    .catch((error) => {
                      notification.error({
                        message: 'Failed to create field',
                        description: error.message
                      });
                    });
                } else {
                  addEnvironmentService(environment);
                }
              }
            } else if (type === 'edit') {
              if (pathname === 'manageGroup') {
                updateTopic({
                  id: enviroinmentId,
                  contactGroup: {
                    name: environment.environment.name
                  }
                })
                  .unwrap()
                  .then(() => {
                    notification.success({
                      message: 'Topic updated successfully'
                    });
                    getContactGroupService({
                      project: environment.environment.project
                    });
                    setType('');
                    setEnviroinmentId(undefined);
                  })
                  .catch((error) => {
                    notification.error({
                      message: 'Failed to update topic',
                      description: error.message
                    });
                  });
              } else if (pathname === 'manageGroupForm') {
                updateField({
                  id: enviroinmentId,
                  contactGroup: environment.environment
                })
                  .unwrap()
                  .then(() => {
                    notification.success({
                      message: 'Field created successfully'
                    });
                    contactFieldsService({
                      project: environment.environment.project_id
                    });
                    setType('');
                    setEnviroinmentId(undefined);
                  })
                  .catch((error) => {
                    notification.error({
                      message: 'Failed to create field',
                      description: error.message
                    });
                  });
              } else {
                updateEnvironmentService({
                  enviroinmentId,
                  environment: environment.environment
                });
              }
            }

            if (pathname !== 'manageGroup') {
              dispath(setIsEnvironmentUpdate(enviromentUpdate));
              setType('');
              setEnviroinmentId(undefined);
            }
          }}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            labelAlign="left"
            form={editMailerForm}
            onFinish={(values: any) => {
              console.log(values);
            }}
            initialValues={editMailerForm}
          >
            <Form.Item
              name="environment"
              label={
                pathname === 'manageGroupForm' ? 'Field Name' : pathname === 'manageGroup' ? 'Topic' : 'Environment'
              }
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            {pathname === 'manageGroupForm' && (
              <>
                <Form.Item
                  name="field_type"
                  label="Field Type"
                  rules={[{ required: true, message: 'Please select a field type' }]}
                >
                  <Select placeholder="Select field type" style={{ width: '100%' }} data-testid="field-type-select">
                    {fieldOptions?.map((option: string) => (
                      <Select.Option key={option} value={option}>
                        {option ? fieldNameFormatter(option) : ''}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="regex" label="Regex">
                  <Input placeholder="Enter regex pattern" />
                </Form.Item>

                <Form.Item name="description" label="Description">
                  <Input placeholder="Enter description" />
                </Form.Item>
              </>
            )}
            <Form.Item
              name="status"
              label={pathname === 'manageGroupForm' ? 'Required' : 'Status'}
              rules={[{ required: true }]}
            >
              <Switch defaultChecked={true} />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};
export default FolderFilter;
