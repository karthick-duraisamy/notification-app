import { Button, Col, Row, Form, Input, notification, Spin, Switch, message } from 'antd';
import { PlusOutlined, CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { FormLayout } from '../../../layouts/Form/Form';
import './Mailer.scss';
import { useEffect, useState } from 'react';
import {
  useActionSelection,
  useFolderSelection,
  useAutoCompleteSelection,
  useLanguageTypeSelection
} from '../../../hooks/Selection.hook';
import {
  useAddMailerMutation,
  useLazyGetMailerQuery,
  useUpdateMailerMutation,
  useLazyGetMailerMasterQuery,
  useGetMailerMasterQuery
} from '../../../services/mailer/Mailer';
import { useForm } from 'antd/lib/form/Form';
import { LoadingOutlined } from '@ant-design/icons';
import { useSettingSelect } from '../../../hooks/SettingForm.hook';
import { useAppSelector } from '../../../hooks/App.hook';
import { AutoComplete } from '@/components/AutoComplete/AutoComplete';
import FolderFilter from '@/components/FolderFilter/FolderFilter';

const MailerForm = () => {
  const { project, enviromentUpdate } = useAppSelector((state) => state.TemplateProjectReducer);
  const navigate = useNavigate();
  const { action: actionUrl, id } = useParams() as { action: string; id: string };
  const [form] = useForm();
  const { folderOptions: MailerFolderOptions } = useFolderSelection({ mode: 'mailer' });
  const { folderOptions: TemplateFolderOptions } = useFolderSelection({ mode: 'template' });
  const { isSuccess: isMasterSuccess, data: masterData } = useGetMailerMasterQuery({ project });
  const [selectedEnv, setSelectedEnv] = useState<any>(undefined);
  const languageOption = useLanguageTypeSelection((masterData?.response as any)?.data?.language);
  const environmentOption = useLanguageTypeSelection((masterData?.response as any)?.data?.enviroinment);
  const { options } = useSettingSelect();
  let init = '' as unknown as number;
  let templateData: any[] = [];
  const [searchValue, setSearchValue] = useState<string>('');
  const [autoCompleteIndex, setAutoCompleteIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState({
    project: init,
    settings: init,
    mailer_folder: init,
    status: 1,
    template_folder: [''] as any,
    template: [] as any, // numbered list?
    actions: [] as number[],
    language: [''] as unknown as number[]
  });

  const { actions } = useActionSelection({
    project_id: project?.toString()
  });
  const { autoCompleteTemplateOption } = useAutoCompleteSelection({
    search_string: searchValue,
    folder_id: selectedOptions.template_folder[autoCompleteIndex],
    language_id: selectedOptions.language[autoCompleteIndex]
  });
  const [addMailerService] = useAddMailerMutation();
  const [getMailerService, getMailerServiceStatus] = useLazyGetMailerQuery();
  const [updateMailerService] = useUpdateMailerMutation();
  const [masterService, masterServiceStatus] = useLazyGetMailerMasterQuery();
  useEffect(() => {
    if (actionUrl && id && actionUrl === 'edit') {
      getMailerService({ id, project });
    }
    masterService({ project });
    // eslint-disable-next-line
  }, [actionUrl, id]);

  useEffect(() => {
    masterService({ project });
  }, [enviromentUpdate]);

  useEffect(() => {
    masterService({ project });
  }, [enviromentUpdate]);

  useEffect(() => {
    if (masterServiceStatus?.isSuccess) console.log(masterServiceStatus);
  }, [masterServiceStatus]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [folderInfo, setFolderInfo] = useState<number | string | undefined>();

  useEffect(() => {
    if (getMailerServiceStatus && getMailerServiceStatus.isSuccess && getMailerServiceStatus.data.responseCode === 0) {
      const mailer = getMailerServiceStatus.data.response.data;
      if (mailer.environment_id) setSelectedEnv(mailer?.environment_id);
      if (mailer && form) {
        setFolderInfo(mailer.folder);
        setSelectedOptions((prev: any) => {
          return {
            ...prev,
            project: Number(project),
            mailer_folder: parseInt(mailer.folder),
            language: mailer.mailer_templates.map((item: any) => item.language),
            // template_folder: mailer.folder,
            // The code is removed due because of on the edit flow the template api is failed due to folder id not passed
            template_folder: mailer.mailer_templates?.map((template: any) => template.folder_info.folder),
            // The code is added to fix the issue of folder id is not passed properly for template list api
            template: mailer.mailer_templates?.map((template: any) => template.template),
            status: mailer.status.toString(),
            settings: (mailer.settings && mailer.settings.length) > 0 ? mailer.settings[0] : ('' as unknown as number)
          };
        });
        form.setFieldsValue({
          mailer_name: mailer.name,
          project: parseInt(mailer.project as unknown as string),
          settings:
            (mailer.settings && mailer.settings.length) > 0 ? mailer?.settings[0]?.setting : ('' as unknown as number),
          folder_name: mailer?.folder,
          status: mailer.status.toString(),
          enviroment: mailer.environment_name,
          actions: mailer.mailer_templates.map((item: any) => {
            return {
              action_name: item.action,
              template_name: parseInt(item.template as unknown as string),
              template_folder: parseInt(item.folder_info.folder as unknown as string),
              language: item.language
            };
          })
        });
      }
    }
    // eslint-disable-next-line
  }, [getMailerServiceStatus]);

  const formSubmit = async (values: any) => {
    if (values) {
      const mailerObject: any = {
        mailer_name: values.mailer_name,
        project: Number(project),
        folder: folderInfo ? folderInfo : Number(MailerFolderOptions[0]?.id),
        settings:
          selectedOptions?.settings && (selectedOptions?.settings as any)?.setting
            ? [(selectedOptions.settings as any)?.setting]
            : [form?.getFieldsValue()?.settings],
        status: selectedOptions.status.toString(),
        environment: selectedEnv,
        mailer_templates: values.actions?.map((item: any) => {
          return {
            action: item.action_name,
            template: item.template_name,
            status: 1,
            language: item.language
          };
        })
      };
      let response;
      switch (actionUrl) {
        case 'create':
          setIsLoading(true);
          response = await addMailerService({
            mailer: mailerObject
          })
            .unwrap()
            .catch((err: any) => err.data);

          if (response.responseCode === 0) {
            notification.success({ message: 'Mailer created' });
            navigate('/mailer');
          } else {
            if (response.responseCode === 1 && response.response.errors) {
              Object.entries(response.response.errors.mailer).forEach(([key, value]) => {
                if (key == 'folder') {
                  key = 'folder_name';
                }
                if (key == 'name') {
                  key = 'mailer_name';
                }
                if (['mailer_name', 'settings', 'project', 'folder_name', 'language'].includes(key)) {
                  value = value instanceof Array ? value : Object.values(value as any)[0];
                  form.setFields([{ name: key, errors: value } as any]);
                }
              });
              notification.error({
                message: response?.response?.Message
              });
            }
          }
          setIsLoading(false);
          break;
        case 'edit':
          setIsLoading(true);
          response = await updateMailerService({ id, project: project?.toString(), mailer: mailerObject })
            .unwrap()
            .catch((err: { data: any }) => err.data);
          if (response.responseCode === 0) {
            notification.success({ message: 'Configuration updated' });
            navigate('/mailer');
          } else {
            message.error(response?.response?.Message);

            if (response.responseCode === 1 && response.response.errors) {
              Object.entries(response.response.errors.mailer).forEach(([key, value]) => {
                if (key === 'folder') {
                  key = 'folder_name';
                }
                if (['settings', 'project', 'folder_name'].includes(key)) {
                  value = value instanceof Array ? value : Object.values(value as any)[0];
                  form.setFields([{ name: key, errors: value } as any]);
                } else {
                }
              });
            }
          }
          setIsLoading(false);

          break;
      }
    }
  };

  const autoCompleteSelect = (option: string, value: number, index: number) => {
    if (option === 'actions') {
      setSelectedOptions((prev) => {
        return { ...prev, [option]: [...prev.actions, value] };
      });
    } else if (option === 'template_folder' || option === 'language') {
      if (option === 'language') {
        setSelectedOptions((prev) => {
          let reCons: number[] = [];
          for (var i = 0; i < prev.language.length; i++) {
            if (i !== index) {
              reCons.push(prev.language[i]);
            } else {
              reCons.push(value);
            }
          }
          return { ...prev, language: reCons };
        });
      } else {
        setSelectedOptions((prev) => {
          let reconstructed_template_folder: any[] = [];
          for (var i = 0; i < prev.template_folder.length; i++) {
            if (i !== index) {
              reconstructed_template_folder.push(prev.template_folder[i]);
            } else {
              reconstructed_template_folder.push(value);
            }
          }
          return { ...prev, template_folder: reconstructed_template_folder };
        });
      }
      form.setFields([{ name: ['actions', index, 'template_name'], value: undefined }]);
    } else if (option === 'template') {
      setSelectedOptions((prev) => {
        let reCons = [];
        for (var i = 0; i < prev.template.length; i++) {
          if (i !== index) {
            reCons.push(prev.template[i]);
          } else {
            reCons.push(value);
          }
        }
        return { ...prev, template: reCons };
      });
    } else {
      setSelectedOptions((prev) => {
        return { ...prev, [option]: value === undefined && option === 'settings' ? [] : value };
      });
    }
  };

  const handleChange = (option: string) => {
    setSelectedOptions((prev) => {
      return { ...prev, [option]: undefined };
    });
  };

  const JobStatusOnChange = (checked: boolean) => {
    setSelectedOptions((prev: any) => {
      return { ...prev, status: checked ? 1 : 2 };
    });
  };

  const onSearchChange = (value: any, index: number) => {
    setSearchValue(value);
    setAutoCompleteIndex(index);
  };
  // const { actions } = useAppSelector((state) => state.AutoCompleteReducer);
  // const [actionAutoCompleteService] = useLazyGetActionAutoCompleteQuery();
  const title = actionUrl === 'create' ? 'Create configuration' : 'Edit configuration';
  const editData =
    actionUrl === 'edit' && getMailerServiceStatus?.isSuccess && getMailerServiceStatus?.data?.responseCode === 0
      ? getMailerServiceStatus.data.response.data
      : undefined;
  if (
    templateData.length === 0 &&
    actionUrl === 'edit' &&
    getMailerServiceStatus &&
    getMailerServiceStatus.isSuccess &&
    getMailerServiceStatus.data.responseCode === 0
  ) {
    for (let i = 0; i < getMailerServiceStatus.data.response.data.mailer_templates.length; i++) {
      templateData[i] = {};
      templateData[i]['label'] = editData?.mailer_templates[i].template_name;
      templateData[i]['id'] = editData?.mailer_templates[i].template;
    }
  }
    // Reset form
    const handleReset = () => {
      form.resetFields();
    }

  return (
    <div className="MailerForm">
      <FormLayout title={title}>
        <Spin
          spinning={actionUrl === 'edit' && actions.length === 0}
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 80, color: '#fd9646' }} />}
        >
          <Form layout="vertical" form={form} initialValues={{ actions: [''] }} onFinish={formSubmit}>
            <Col span={24} className="fields-container">
              <Row gutter={32}>
                <Col xs={23} sm={8} md={8} lg={6} xl={6} xxl={6}>
                  <Form.Item
                    name="mailer_name"
                    label="Configuration name"
                    rules={[
                      {
                        required: true,
                        message: 'Missing configuration name'
                      }
                    ]}
                  >
                    <Input placeholder="Configuration name" />
                  </Form.Item>
                </Col>
                {/* <Col span={6}>
                  <AutoComplete
                    formItemName={
                      actionUrl === 'create' || (isMasterSuccess && masterData && masterData.responseCode === 0)
                        ? 'project'
                        : undefined
                    }
                    formItemLabel="Project"
                    formItemRequired={true}
                    formItemMessage="Please select project"
                    onSelect={autoCompleteSelect}
                    name="project"
                    title="Select project"
                    option={
                      isMasterSuccess && masterData && masterData.responseCode === 0
                        ? masterData.response.data.project
                        : []
                    }
                  />
                </Col> */}
                <Col xs={23} sm={8} md={8} lg={6} xl={6} xxl={6}>
                  <AutoComplete
                    formItemName={
                      actionUrl === 'create' || (isMasterSuccess && masterData && masterData.responseCode === 0)
                        ? 'settings'
                        : undefined
                    }
                    formItemLabel="Settings"
                    formItemRequired={false}
                    formItemMessage="Select setting"
                    onSelect={autoCompleteSelect}
                    onChange={handleChange}
                    name="settings"
                    title="Select setting"
                    option={options?.options.length > 0 ? options?.options : []}
                  />
                </Col>
                {/* <Col span={6}>
                  <AutoComplete
                    formItemName={
                      actionUrl === 'create' || (isMasterSuccess && masterData && masterData.responseCode === 0)
                        ? 'folder_name'
                        : undefined
                    }
                    formItemLabel="Mailer folder"
                    formItemRequired={true}
                    formItemMessage="Missing folder"
                    onSelect={autoCompleteSelect}
                    // onChange={handleChange}
                    name="folder_name"
                    title="Select folder"
                    option={MailerFolderOptions.length > 0 ? MailerFolderOptions : []}
                  />
                </Col> */}
                <Col xs={23} sm={8} md={8} lg={6} xl={6} xxl={6}>
                  <Form.Item label="Environment" name="environment" fieldKey="environment">
                    <FolderFilter
                      folders={environmentOption}
                      pathname="mailer"
                      activeFolder={selectedEnv}
                      handler={(value: any) => {
                        setSelectedEnv(value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={23} sm={8} md={8} lg={6} xl={6} xxl={6}>
                  <Form.Item label="Status" name="status" fieldKey="status">
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="in-Active"
                      checked={actionUrl === 'edit' ? (selectedOptions.status == 1 ? true : false) : true}
                      onChange={JobStatusOnChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* dynamic form starts */}
              <Form.List name="actions">
                {(fields: any, { add, remove }: { add: any; remove: any }) => {
                  return (
                    <>
                      {fields.map(({ key, name, fieldKey, ...field }: any, index: number) => {
                        return (
                          <Row key={index} gutter={32} className="cls-dynamic-form">
                            <Col xs={23} sm={11} md={12} lg={6} xl={6} xxl={6} className="cls-mail-action">
                              <AutoComplete
                                formItemName={
                                  actionUrl === 'create' || actions.length > 0 ? [name, 'action_name'] : undefined
                                }
                                formItemLabel={index === 0 ? 'Action' : null}
                                formItemRequired={true}
                                formItemMessage="Missing Action Name"
                                formItemField={field}
                                formItemFieldKey={[fieldKey, 'action_name']}
                                onSelect={autoCompleteSelect}
                                name="actions"
                                title="Select Action"
                                option={actions}
                              />
                            </Col>
                            <Col xs={23} sm={11} md={12} lg={6} xl={6} xxl={6}>
                              <AutoComplete
                                formItemName={
                                  actionUrl === 'create' || TemplateFolderOptions.length > 0
                                    ? [name, 'template_folder']
                                    : undefined
                                }
                                formItemLabel={index === 0 ? 'Template Folder' : null}
                                formItemRequired={true}
                                formItemMessage="Missing folder"
                                formItemField={field}
                                formItemFieldKey={[fieldKey, 'template_folder']}
                                onSelect={autoCompleteSelect}
                                name="template_folder"
                                index={index}
                                title="Select folder"
                                option={TemplateFolderOptions}
                              />
                            </Col>
                            <Col xs={23} sm={11} md={12} lg={6} xl={6} xxl={6}>
                              <AutoComplete
                                formItemName={
                                  actionUrl === 'create' ||
                                  (isMasterSuccess &&
                                    masterData?.responseCode === 0 &&
                                    masterData.response.data.language)
                                    ? [name, 'language']
                                    : undefined
                                }
                                formItemLabel={index === 0 ? 'Language' : null}
                                formItemRequired={true}
                                formItemMessage="Missing language"
                                formItemField={field}
                                formItemFieldKey={[fieldKey, 'language']}
                                onSelect={autoCompleteSelect}
                                name="language"
                                title="Select language"
                                index={index}
                                option={languageOption}
                              />
                            </Col>
                            <Col xs={23} sm={11} md={12} lg={6} xl={6} xxl={6}>
                              <AutoComplete
                                formItemName={
                                  actionUrl === 'create' ||
                                  templateData.length > 0 ||
                                  autoCompleteTemplateOption.length > 0
                                    ? [name, 'template_name']
                                    : undefined
                                }
                                formItemLabel={index === 0 ? 'Templates' : null}
                                formItemRequired={true}
                                formItemMessage="Missing template"
                                formItemField={field}
                                formItemFieldKey={[fieldKey, 'template_name']}
                                onSelect={autoCompleteSelect}
                                type="dynamic"
                                index={index}
                                onSearch={onSearchChange}
                                name="template"
                                title="Select template"
                                option={
                                  autoCompleteTemplateOption.length === 0 && actionUrl && actionUrl === 'edit'
                                    ? templateData
                                    : autoCompleteTemplateOption
                                }
                              />
                              {index > 0 && (
                                <CloseCircleOutlined
                                  style={{ color: '#f00' }}
                                  onClick={() => {
                                    remove(name);
                                    setSelectedOptions((prev) => {
                                      let folder: any = [],
                                        language = [];
                                      for (let i = 0; i < prev.template_folder.length; i++) {
                                        if (i !== index) {
                                          folder.push(prev.template_folder[i]);
                                          language.push(prev.language[i]);
                                        }
                                      }
                                      return { ...prev, template_folder: folder, language: language };
                                    });
                                  }}
                                  className="remove-icon"
                                />
                              )}
                            </Col>
                          </Row>
                        );
                      })}
                      <Row align="middle" justify="end">
                        <Col>
                          <Button
                            size="small"
                            type="link"
                            icon={<PlusOutlined />}
                            onClick={() => {
                              add();
                              setSelectedOptions((prev: any) => {
                                return {
                                  ...prev,
                                  template_folder: [...prev.template_folder, ''],
                                  language: [...prev.language, '']
                                };
                              });
                            }}
                          >
                            Add actions
                          </Button>
                        </Col>
                      </Row>
                    </>
                  );
                }}
              </Form.List>
              {/* Dynamic form ends */}
            </Col>
            <Row className="form-btns" gutter={32} justify="end">
              <Col>
                <Button type="default" className="reset-btn" onClick={handleReset}>
                  <ReloadOutlined />
                  Reset
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  {isLoading ? <LoadingOutlined /> : 'Submit'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      </FormLayout>
    </div>
  );
};
export default MailerForm;
