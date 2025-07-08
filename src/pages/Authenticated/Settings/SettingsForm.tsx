import { notification, Col, Modal, Button, Form, Input, Row, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { SettingForm } from './Form';
import { FormLayout } from '../../../layouts/Form/Form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/App.hook';
import { useAppSelector } from '../../../hooks/App.hook';
import { cleanUpSetting } from '@/stores/Setting.store';
import {
  useLazyGetSettingQuery,
  useAddSettingMutation,
  useUpdateSettingMutation,
  useSendTestSettingMutation
} from '../../../services/setting/Setting';
import './Settings.scss';
import { t } from 'i18next';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import type { AddSettingRequest, AddSettingResponse } from '../../../services/setting/SettingTypes';
import { formErrorObjectFromResponse } from '../../../Utils/form';
import { CheckGuideModal } from '../../../Utils/commonFunction';
import { setGuideModalInfo } from '@/stores/TemplateProject.store';
import { CertificateIcon } from '@/components/Icons/Icons';

const SettingsForm = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { project, modalGuide } = useAppSelector(
    (state: { TemplateProjectReducer: any }) => state.TemplateProjectReducer
  );
  const { action } = useParams() as { action: string };
  const validateAction = (action: string) => ['create', 'edit'].includes(action);
  const { edit, setting, settingTypeId, settingFieldsInfo } = useAppSelector((state) => state.SettingReducer);
  const [serviceSingleSettingGet, { isSuccess: isEditFetchSuccess }] = useLazyGetSettingQuery();
  const [serviceAdd] = useAddSettingMutation();
  const [sendTestSetting, sendTestSettingStatus] = useSendTestSettingMutation();
  const [serviceUpdate] = useUpdateSettingMutation();
  const [isSaving, setIsSaving] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<number | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState<string | undefined>(undefined);
  let projectId = searchParams.get('project');

  if (projectId && !selectedProject) {
    setSelectedProject(parseInt(projectId));
  }

  useEffect(() => {
    if (sendTestSettingStatus?.isSuccess && (sendTestSettingStatus as any)?.data.responseCode === 0) {
      if ((sendTestSettingStatus as any)?.data.response.data.status === 1) {
        let errMsg = (sendTestSettingStatus as any)?.data.response.data.message;
        notification.error({ message: errMsg });
      } else if ((sendTestSettingStatus as any)?.data.response.data.status === 0) setIsModalVisible('mailSuccess');
    } else if (sendTestSettingStatus?.isError) {
      let fieldName = Object.keys((sendTestSettingStatus as any)?.error?.data?.response?.errors)[0];
      let errMsg = (sendTestSettingStatus as any)?.error?.data?.response?.errors[fieldName][0];
      if (errMsg.length > 0) notification.error({ message: errMsg });
    }
  }, [sendTestSettingStatus]);

  useEffect(() => {
    // validate and 'replace' the location, so user can go back to previous page
    if (!action || !validateAction(action)) {
      navigate('/404');
    }
    // edit page and provided setting id
    if (action === 'edit') {
      if (edit) serviceSingleSettingGet({ setting_id: edit.toString(), project_id: Number(project) });
      else navigate(-1);
    }

    // cleanup state as soon as component is unmounted
    return () => {
      dispatch(cleanUpSetting());
    };
    // eslint-disable-next-line
  }, []);

  const setFormData = (setting: AddSettingResponse) => {
    sessionStorage.setItem('settingType', setting.setting_type);
    localStorage.setItem('status', setting.status);
    form.setFieldsValue({
      setting_id: setting.setting_id,
      setting_name: setting.setting_name,
      setting_type: setting.setting_type,
      from_email_id: setting.from_email_id,
      user_name: setting.user_name,
      end_point: setting.end_point,
      // sender_name: setting.sender_name,
      // connection_type: setting.connection_type,
      port: setting.port,
      project_name: setting.project_name,
      status: setting.status,
      exclude_domains: setting.exclude_domains
    });
    setSelectedProject(setting.project);
  };

  useEffect(() => {
    if (setting && isEditFetchSuccess) {
      setFormData(setting);
    }
    // eslint-disable-next-line
  }, [setting, isEditFetchSuccess, edit]);

  const resetFields = () => {
    if (setting && isEditFetchSuccess) {
      setFormData(setting);
    } else {
      form.resetFields();
    }
  };

  const validateForm = (formInfo: any): boolean => {
    const filteredFormData = settingFieldsInfo?.filter(
      (item: any) => formInfo[item] === undefined || formInfo[item] === null
    );
    let result: boolean = false;
    if (settingTypeId !== '' && settingTypeId !== undefined) {
      if (action === 'edit' && filteredFormData.length === 1 && filteredFormData[0] === 'password') result = true;
      else result = filteredFormData.length === 0 ? true : false;
    }
    if (!result) notification.error({ message: 'Please fill in the required fields.' });
    return result;
  };

  const onFinish = async (values: any) => {
    if (!values && !validateAction(action)) {
      return;
    }
    let formValues: any = {
      setting_name: values.setting_name,
      connection_type: values?.connection_type,
      sender_name: values?.sender_name ? values.sender_name : '',
      end_point: values.end_point || '',
      port: values.port || '',
      user_name: values.user_name || '',
      password: values?.password || '',
      from_email_id: values.from_email_id,
      project: project,
      setting_type: settingTypeId || values.setting_type,
      status: values.status === '2' || values.status === false || localStorage.getItem('status') == '2' ? '2' : '1',
      test_and_save: values.key ? values.key : 'N',
      // test_email_recipients: values.test_email_recipients ? [values.test_email_recipients] : [],
      exclude_domains:
        values?.exclude_domains === undefined || values?.exclude_domains === ''
          ? []
          : values?.exclude_domains?.split(',')
    };
    if (settingTypeId == '4' || settingTypeId == '5' || values.setting_type === '4' || values.setting_type === '5')
      formValues['test_phone_numbers'] = values.test_email_recipients;
    else formValues['test_email_recipients'] = values.test_email_recipients ? [values.test_email_recipients] : [];
    let response;
    if (validateForm(formValues)) {
      const requestFormat: AddSettingRequest = {
        setting: formValues
      };
      if (formValues?.test_and_save === 'Y') {
        sendTestSetting(requestFormat);
      } else {
        switch (action) {
          case 'create':
            setIsSaving(true);
            response = await serviceAdd(requestFormat)
              .unwrap()
              // change backend response to 200 but status as 1. which will resolve types here
              .catch((err) => {
                // Error handling for create setting url
                const errorKey: any =
                  err?.data?.response && err?.data?.response['errors']
                    ? Object.keys(err.data.response['errors'])[0]
                    : undefined;
                message.error(
                  errorKey
                    ? errorKey + ' ' + err.data.response['errors'][errorKey][0]
                    : err?.data?.['detail']
                      ? err.data['detail']
                      : err.data.response['Message']
                );
                return err.data;
              });
            if ((response as any)?.responseCode === 0) {
              notification.success({ message: 'Setting created successfully' });
            } else if ((response as any)?.responseCode === 1) {
              const {
                response: {
                  errors: { setting }
                }
              } = response;
              form.setFields(formErrorObjectFromResponse(setting));
              let msg = 'Please check an error message';
              if ('test_and_save' in setting) msg = setting.test_and_save[0];
              message.error(msg);
            }
            break;
          case 'edit':
            if (values && setting) {
              setIsSaving(true);
              response = await serviceUpdate({
                setting_id: setting.setting_id.toString(),
                setting: formValues,
                project_id: Number(project)
              })
                .unwrap()
                .catch((err) => {
                  // Error handling for edit setting data url
                  const errorKey: any = err?.data?.response['errors']
                    ? Object.keys(err.data.response['errors'])[0]
                    : undefined;
                  message.error(
                    errorKey ? errorKey + ' ' + err.data.response['errors'][errorKey][0] : err.data.response['Message']
                  );
                });
              if ((response as any)?.responseCode === 0) {
                notification.success({ message: 'Setting updated successfully' });
                localStorage.setItem('status', '');
              }
            }
            break;
        }
      }
    }
    setIsSaving(false);

    if (response?.responseCode === 0) {
      // success
      // if (formValues.test_and_save === 'N') navigate(-1);
      if (formValues.test_and_save === 'N') {
        setIsModalVisible('mailSuccess');
        // navigate("settings");
      }
    } else if (response?.responseCode === 1) {
      // error
      const {
        response: {
          errors: { setting }
        }
      } = response;
      form.setFields(formErrorObjectFromResponse(setting));
      let msg = 'Please check an error message';
      if ('test_and_save' in setting) msg = setting.test_and_save[0];
      notification.error({ message: msg });
    }
  };

  const menuAction = async (values: any) => {
    let formValues = form.getFieldsValue();
    formValues.key = values.key;
    onFinish(formValues);
  };

  const testMail = () => {
    if (validateForm(form.getFieldsValue())) setIsModalVisible('testMail');
  };

  const sendTestMail = async (value: any) => {
    let formValues = { ...form.getFieldsValue(), ...value, key: 'Y' };
    const updatedObj = Object.fromEntries(
      Object.entries(formValues).map(([key, value]) => [key, value === undefined ? '' : value])
    );
    onFinish(updatedObj);
    setIsModalVisible(undefined);
  };

  const ProjectHead = () => (
    <Col span={12}>
      {/* <Select
        placeholder="Select project"
        value={selectedProject}
        onChange={(id) => {
          setSelectedProject(id);
        }}
        disabled={projectId ? true : undefined}
      >
        {selectProject.map(({ id, label }) => {
          return (
            <Option value={id} key={id}>
              {label}
            </Option>
          );
        })}
      </Select> */}
    </Col>
  );
  const dispath = useDispatch();
  let valueSet: any;

  // After adding the Setting to set the Store value for Integration Workflow Modal(Guide)
  useEffect(() => {
    let value = 'settings';
    if (isModalVisible == 'mailSuccess') {
      valueSet = CheckGuideModal(modalGuide, value);
      dispath(setGuideModalInfo({ value: valueSet }));
      navigate('/settings');
    }
  }, [isModalVisible]);

  return (
    <>
      <Row>
        <Col span={24} className="cls-setting-main-form">
          <FormLayout title={t(`${action + '_settings'}`)} additionalHead={<ProjectHead />}>
            <SettingForm
              form={form}
              formSubmit={onFinish}
              resetFields={resetFields}
              menuAction={menuAction}
              testMail={testMail}
              isSaving={isSaving}
            />
          </FormLayout>
        </Col>
      </Row>
      <Modal
        open={isModalVisible ? true : false}
        onCancel={() => setIsModalVisible(undefined)}
        footer={null}
        className="custom-modal"
        closeIcon={<CloseCircleOutlined style={{ fontSize: 22, color: '#FF4646' }} />}
      >
        {isModalVisible === 'testMail' && (
          <Form onFinish={sendTestMail} layout="vertical">
            <Form.Item
              label={Number(settingTypeId) > 3 ? 'Enter Number' : 'Enter email id'}
              name="test_email_recipients"
            >
              <Input placeholder={Number(settingTypeId) > 3 ? 'Enter number' : 'Enter address'} />
            </Form.Item>
            <Row justify="end">
              <Col>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Col>
            </Row>
          </Form>
        )}
        {isModalVisible === 'mailSuccess' && (
          <div className="mail-success text-center">
            <CertificateIcon />
            <h2 className="f-sbold">Save and sent test notification successfully</h2>
            <p>You have save and sent the notification to the client successfully.</p>
            <div className="text-right mt-4">
              <Button type="primary" onClick={() => setIsModalVisible(undefined)}>
                Ok
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default SettingsForm;
