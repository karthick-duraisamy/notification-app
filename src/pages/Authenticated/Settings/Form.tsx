import { Button, Col, Row, Form, Input, Select, Switch, Checkbox, Tabs, Radio, Dropdown, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './Settings.scss';
import { useDispatch } from 'react-redux';
import { CaretDownOutlined } from '@ant-design/icons';
import { useSettingProjectSelection } from '../../../hooks/Selection.hook';
import { setSettingFieldsInfo, setSettingTypeId } from '@/stores/Setting.store';
import { useGetSettingMasterInfoQuery } from '../../../services/setting/Setting';
import { MailIcon, NotificationIcon, SMSIcon, WhatsappIcon } from '@/components/Icons/Icons';

const { Option } = Select;

interface SettingFormProps {
  formSubmit: (values: any) => void;
  form: any;
  resetFields: () => void;
  menuAction: (values: any) => void;
  testMail: () => void;
  isSaving: boolean;
}

interface dynamicFormProps {
  notificationType?: string;
  notificationId?: string;
  settingType?: any[];
  fieldList: any;
}

const SettingForm = ({ formSubmit, menuAction, form, testMail }: SettingFormProps) => {
  const { t } = useTranslation();
  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = useState();
  const [settingType, setSettingType] = useState(1);
  const { isSuccess: masterSuccess, data: masterData } = useGetSettingMasterInfoQuery({});
  const [notificationType, setNotificationType] = useState<dynamicFormProps>();
  const dispath = useDispatch();
  const { action } = useParams() as { action: string };
  const [connectionType] = useState<string>(
    form.getFieldValue()?.setting_type ? form.getFieldValue()?.setting_type : ''
  );
  if (connectionType !== '') dispath(setSettingTypeId({ id: connectionType }));

  const { selectProject } = useSettingProjectSelection();
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [settingStatusValue, setSettingStatusValue] = useState<boolean>(
    form.getFieldValue()?.status == 1 ? true : false
  );

  useEffect(() => {}, [connectionType, isChangePassword, settingStatusValue]);

  useEffect(() => {
    setSettingStatusValue(form.getFieldValue()?.status == 1 ? true : false);
  }, [form.getFieldValue()]);

  // The method is triggered return whether the field is present for the selected setting type
  const checkFieldPresence = (fieldName: string, type: string) => {
    if (type === 'field')
      return (
        notificationType?.fieldList?.mandatoryField?.includes(fieldName) ||
        notificationType?.fieldList?.optFields?.includes(fieldName)
      );
    else if (type === 'req') return notificationType?.fieldList?.mandatoryField?.includes(fieldName);
  };

  // The following method is triggered when user select the tab
  const handleTabChange = (key: any) => {
    setActiveKey(key);
    form.setFieldsValue({ setting_type: undefined });
    let selectedData: any = (masterData?.response as any)?.data?.notification_type?.filter(
      (item: any) => item.value === Number(key)
    )[0];
    let selectedMailType: any = [];
    selectedData?.type?.map((type: any) => {
      (masterData?.response as any)?.data?.setting_type?.map((typeInfo: any) => {
        if (type === typeInfo.label) {
          selectedMailType.push(typeInfo);
        }
      });
    });
    if (selectedMailType.length > 0) {
      setSettingType(selectedMailType[0]?.value);
      handleSettingType(selectedMailType[0]?.value, key);
    }
    setNotificationType((prevState: any) => ({
      ...prevState,
      notificationId: selectedData.value,
      notificationType: selectedData.label,
      settingType: selectedMailType
    }));
  };

  // The following useEffect is triggered on the setting edit flow
  useEffect(() => {
    (masterData?.response as any)?.data?.setting_type?.map((settingTypeValue: any) => {
      if (Number(settingTypeValue.value) === Number(sessionStorage.getItem('settingType'))) {
        (masterData?.response as any)?.data?.notification_type?.map((notificationInfo: any) => {
          if (notificationInfo?.type?.includes(settingTypeValue.label)) {
            setActiveKey(notificationInfo?.value.toString());
            handleTabChange(notificationInfo?.value.toString());
            handleSettingType(settingTypeValue?.value, notificationInfo?.value);
          }
        });
      }
    });
  }, [sessionStorage.getItem('settingType')]);

  // The following useEffect is triggered when master info api is getting success
  useEffect(() => {
    if (masterSuccess) {
      if (sessionStorage.getItem('settingType') === null) {
        handleTabChange((masterData?.response as any)?.data?.notification_type[0]?.value?.toString());
        let settingValue;
        (masterData?.response as any)?.data?.setting_type.map((settingTypeList: any) => {
          if ((masterData?.response as any)?.data?.notification_type[0]?.type[0] === settingTypeList?.label)
            settingValue = settingTypeList?.value;
        });
        handleSettingType(settingValue, (masterData?.response as any)?.data?.notification_type[0].value);
      }
    }
  }, [masterSuccess]);

  // The following method is triggered when setting type is change
  const handleSettingType = (key: any, notificationInfo?: any) => {
    let fieldlist: any = {};
    if (notificationInfo !== undefined) {
      (masterData?.response as any)?.data?.setting_type?.map((settingInfo: any) => {
        if (settingInfo?.value === key) {
          fieldlist.mandatoryField = settingInfo?.fields?.mandatory;
          fieldlist.optFields = settingInfo?.fields?.optional;
        }
      });
    } else {
      notificationType?.settingType?.map((type) => {
        if (key === type.value) {
          fieldlist.mandatoryField = type?.fields?.mandatory;
          fieldlist.optFields = type?.fields?.optional;
        }
      });
    }
    setNotificationType((prevState) => ({
      ...prevState,
      fieldList: fieldlist
    }));
    form.setFieldsValue({ setting_type: key });
    let fieldInfo = JSON.parse(JSON.stringify(fieldlist?.mandatoryField));
    fieldInfo.push('setting_name');
    setSettingType(key);
    dispath(setSettingFieldsInfo({ fieldInfo: fieldInfo }));
    dispath(setSettingTypeId({ id: key }));
  };

  // The following method is used to get the icon
  const getIconByType = (value: any) => {
    const iconsMap: any = {
      1: <MailIcon />,
      2: <WhatsappIcon />,
      3: <SMSIcon />,
      4: <NotificationIcon />,
      5: <NotificationIcon />
    };

    return iconsMap[value] || null;
  };

  return (
    <>
      <Row>
        <Col span={24} className="cls-setting-form">
          <Tabs
            activeKey={activeKey}
            onChange={(key) => handleTabChange(key)}
            tabBarStyle={{
              borderRadius: '8px'
            }}
            className="cls-manage-tabs mb-10"
          >
            {(masterData?.response as any)?.data?.notification_type?.map((type: any) => (
              <TabPane
                tab={
                  <span className="cls-label f-reg fs-13">
                    <span className="cls-svg-icon"> {getIconByType(type.value)}</span>

                    {type.label}
                  </span>
                }
                key={type.value.toString()}
              >
                <></>
              </TabPane>
            ))}
          </Tabs>
          <Row className="cls-setting_type">
            <Col span={3}>Setting Type:</Col>
            <Col span={20}>
              <Radio.Group
                value={settingType}
                onChange={(key) => {
                  handleSettingType(key?.target?.value);
                }}
              >
                {notificationType?.settingType?.map((type: any) => (
                  <Radio key={type.value} value={type.value}>
                    {type.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Col>
          </Row>
          <Form
            onReset={() => alert('reset')}
            className=""
            layout="vertical"
            form={form}
            onFinish={formSubmit}
            initialValues={{ status: true }}
            name="dynamic form"
          >
            <Col span={24} className="fields-container">
              <Row gutter={32}>
                <Col span={6}>
                  <Form.Item
                    name="setting_name"
                    label={t('settings_name')}
                    rules={[
                      {
                        required: true,
                        // whitespace: true,
                        message: 'Missing settings name'
                      }
                    ]}
                  >
                    <Input placeholder="Product environment (Ex: GRM - UAT) " />
                  </Form.Item>
                </Col>

                {checkFieldPresence('sender_name', 'field') ? (
                  <Col span={6}>
                    <Form.Item
                      name="sender_name"
                      label={t('sender_name')}
                      rules={[
                        {
                          required: checkFieldPresence('sender_name', 'req'),
                          whitespace: true,
                          message: 'Missing sender name'
                        }
                      ]}
                    >
                      <Input placeholder="Enter sender name" />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

                {checkFieldPresence('exclude_domains', 'field') ? (
                  <Col span={6}>
                    <Form.Item
                      name="exclude_domains"
                      label={t('exclude_domains')}
                      rules={[
                        {
                          required: checkFieldPresence('exclude_domains', 'req'),
                          message: 'Missing from exclude domains'
                        }
                      ]}
                    >
                      <Input placeholder="Enter exclude domains" />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

                {checkFieldPresence('from_email_id', 'field') ? (
                  <Col span={6}>
                    <Form.Item
                      name="from_email_id"
                      label={t('from_email_id')}
                      rules={[
                        {
                          required: checkFieldPresence('from_email_id', 'req'),
                          whitespace: true,
                          message: 'Missing from email ID'
                        }
                      ]}
                    >
                      <Input type="email" placeholder="Sender email ID" />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

                {checkFieldPresence('connection_type', 'field') ? (
                  <Col span={6}>
                    <Form.Item
                      name="connection_type"
                      label={t('connection_type')}
                      rules={[
                        {
                          required: checkFieldPresence('connection_type', 'req'),
                          whitespace: true,
                          message: 'Missing connection type'
                        }
                      ]}
                    >
                      <Select placeholder="Select connection type">
                        {(selectProject as any)?.connection_type &&
                          (selectProject as any).connection_type.map((option: any) => (
                            <Option key={option.label} value={option.value} data-testid="optionBox">
                              {option.label}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

                {checkFieldPresence('end_point', 'field') ? (
                  <Col span={6}>
                    <Form.Item
                      name="end_point"
                      label={
                        settingType?.toString() === '1'
                          ? 'SMTP URL'
                          : settingType?.toString() === '2'
                            ? 'Relay host'
                            : 'URL'
                      }
                      rules={[
                        {
                          required: checkFieldPresence('end_point', 'req'),
                          whitespace: true,
                          message: 'Missing end point'
                        }
                      ]}
                    >
                      <Input
                        placeholder={settingType?.toString() === '1' ? 'Email agent end point' : 'Email relay host'}
                      />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

                {checkFieldPresence('port', 'field') ? (
                  <Col span={6}>
                    <Form.Item
                      name="port"
                      label={t('port')}
                      rules={[
                        {
                          required: checkFieldPresence('port', 'req'),
                          message: 'Missing port no'
                        }
                      ]}
                    >
                      <Input placeholder="Port no" />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

                {checkFieldPresence('user_name', 'field') ? (
                  <Col span={6}>
                    <Form.Item
                      name="user_name"
                      label={t('user_name')}
                      rules={[
                        {
                          required: checkFieldPresence('user_name', 'req'),
                          whitespace: true,
                          message: 'Missing user name'
                        }
                      ]}
                    >
                      <Input placeholder="Enter the SMTP username" />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

                {checkFieldPresence('password', 'field') ? (
                  <Col span={6}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          name="password"
                          label={form.getFieldValue('setting_type') == '1' ? 'Password' : 'API key'}
                          rules={[
                            {
                              required: checkFieldPresence('password', 'req'),
                              whitespace: true,
                              message: 'Incorrect password'
                            }
                          ]}
                        >
                          {action === 'create' || isChangePassword ? (
                            <Input
                              type="password"
                              placeholder={
                                form.getFieldValue('setting_type') == '1'
                                  ? 'Enter the SMTP Password'
                                  : 'Enter the API key'
                              }
                            />
                          ) : (
                            <label>********</label>
                          )}
                          {/* <Input type="password" disabled={isChangePassword} placeholder="Enter the SMTP Password" /> */}
                        </Form.Item>
                      </Col>
                    </Row>
                    {action === 'create' ? (
                      <></>
                    ) : (
                      <Row className="cls-form-hide-psw" style={{ marginTop: '-25px' }}>
                        <Col span={24}>
                          <Checkbox
                            onChange={(value) => {
                              setIsChangePassword(value.target.checked);
                            }}
                          >
                            {form.getFieldValue('setting_type') == '1' ? 'Change password' : 'Change API key'}
                          </Checkbox>
                        </Col>
                      </Row>
                    )}
                  </Col>
                ) : (
                  <></>
                )}

                <Col span={3}>
                  <Form.Item label="Status" name="status" fieldKey="status">
                    <Switch
                      onChange={(value) => {
                        setSettingStatusValue(value);
                        form.setFieldsValue({ status: value === true ? '1' : '2' });
                      }}
                      checked={settingStatusValue}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="form-btns" gutter={32} justify="end">
                <Col>
                  <Button
                    data-testid="reset"
                    type="default"
                    style={{ borderColor: 'var(--ant-primary-color)', color: 'var(--ant-primary-color)' }}
                    onClick={() => form.resetFields()}
                  >
                    {t('reset')}
                  </Button>
                </Col>
                <Col className="cls-dropdown-btn">
                  <Dropdown.Button
                    type="primary"
                    onClick={() => {
                      // dispatch(setSaveActive());
                    }}
                    style={{
                      borderTopLeftRadius: 'unset',
                      borderBottomLeftRadius: 'unset'
                    }}
                    icon={<CaretDownOutlined />}
                    overlay={() => {
                      return (
                        <Menu>
                          <Menu.Item className="cls-dp-menulist" key="send_test_notification" onClick={testMail}>
                            {t('send_test_notification')}
                          </Menu.Item>
                          <Menu.Item className="cls-dp-menulist" key="save_exit" onClick={() => menuAction('N')}>
                            Save and exit
                          </Menu.Item>
                        </Menu>
                      );
                    }}
                  >
                    Test email and Submit
                  </Dropdown.Button>
                </Col>
              </Row>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export { SettingForm };
