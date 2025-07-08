import { Form, Input, Row, Col, Checkbox, Button, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { LockTwoTone, MailTwoTone } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Login.scss';
import { useEffect } from 'react';
import { useAuthenticateService } from '../../../services/user/Users';
import { useAuth } from '../../../hooks/Auth.hook';
import { FormTitle } from '@/components/Title/Title';
import { ModForm } from '@/components/ModForm/ModForm';
// import { requestPermissionAndGetToken } from '@/firebase/firebase-messaging';
// import { getBrowserInfo } from '@/Utils/commonFunction';
// import { setPushNotification } from '@/stores/TemplateProject.store';
// import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loginService, apiStatus] = useAuthenticateService();
  // const [notification, setNotification] = useState<boolean>(true);
  // const getBrowser = getBrowserInfo();
  // const [fcmToken, setFcmToken] = useState<string | null>(null);
  // const dispatch = useDispatch();

  // To check the API status and display an error message
  useEffect(() => {
    const setMessage = (message: string) => {
      form.setFields([
        { name: 'email_id', errors: [] },
        { name: 'user_password', errors: [message] }
      ]);
    };
    if (apiStatus.isError) {
      const { error } = apiStatus as unknown as { error: { status: string } };
      if (error && error.status === 'FETCH_ERROR') {
        message.error(error.status + ' check CORS');
        setMessage('unable to contact server');
      }
    } else if (apiStatus.isSuccess) {
      const data: any = apiStatus.data;
      if (data?.responseCode === 1) {
        setMessage(data.response.Message);
      }
    }
  }, [apiStatus.isSuccess, apiStatus.isError, apiStatus, form]);

  //To redirect on auth is success
  const auth = useAuth();
  useEffect(() => {
    if (auth === true) {
      // window.location.href = '/';
    }
  }, [auth]);

  const forgotClick = () => {
    navigate('/forgot-password');
  };

  // let apiToken: Promise<string | undefined> | undefined = undefined;

  const onFinish = async (values: any) => {
    if (values.remember_me === true) localStorage.setItem('email_id', btoa(values.email_id));
    // let token = null;
    //   if (notification === true) {
    //     const tokenResult = await requestPermissionAndGetToken();
    //     token = tokenResult;
    //     setFcmToken(token ?? null);
    //   }
    loginService({ email_id: values.email_id, password: values.user_password });
  };

  const emailID = localStorage.getItem('email_id');

  // To set the API token to the Backend
  // useEffect(() => {
  //   if (apiStatus?.isSuccess) {
  //     console.log((apiStatus.data as any)?.response?.data?.first_name);
  //     console.log((apiStatus.data as any)?.response?.data?.email_id);
  //     let valueSet = {
  //       fcm_token: fcmToken,
  //       user_agent: getBrowser?.browserName,
  //       email_id: (apiStatus.data as any)?.response?.data?.email_id,
  //       username: (apiStatus.data as any)?.response?.data?.first_name,
  //       allow_notification: notification
  //     };
  //     dispatch(setPushNotification({ value: valueSet }));
  //   }
  // },[apiStatus.isSuccess,apiToken]);

  return (
    <>
      <FormTitle title="login_title" subTitle="login_subtitle" />
      <ModForm
        layout="vertical"
        form={form}
        name="login"
        onFinish={onFinish}
        className="Login"
        initialValues={{
          email_id: atob(emailID || ''),
          remember_me: emailID
          // allow_notification: notification
        }}
        scrollToFirstError
      >
        <Form.Item
          className="cls-login-label"
          label={t('email_id')}
          name="email_id"
          rules={[
            { type: 'email', message: t('msg_invalid_email') + '!' },
            { required: true, message: t('msg_empty_email') + '!' }
          ]}
        >
          <Input
            data-testid="log_in_textarea"
            type="email"
            prefix={<MailTwoTone style={{ fontSize: '16px' }} twoToneColor="#A4A9C2" />}
            placeholder={t('email_id_help')}
          />
        </Form.Item>
        <Form.Item
          className="cls-login-pwd"
          label={t('password')}
          name="user_password"
          rules={[{ required: true, message: t('msg_empty_password') + '!' }, { min: 8 }]}
        >
          <Input.Password
            data-testid="log_in_pwdarea"
            className="cls-login-psw-section"
            prefix={<LockTwoTone style={{ fontSize: '16px' }} twoToneColor="#A4A9C2" />}
            placeholder={t('password_help')}
          />
        </Form.Item>
        {/* <Form.Item label={t('base_url')} className="cls-login-label" name="base_url">
          <Select
            showSearch
            placeholder={t('base_url')}
            onChange={changeUrlMethod}
            allowClear
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            defaultValue={
              localStorage.getItem('baseUrl') && localStorage.getItem('baseUrl') !== 'undefined'
                ? localStorage.getItem('baseUrl')
                : undefined
            }
            options={[
              {
                value: 'https://grmapi-v2.infinitisoftware.net/emailapi',
                label: 'Development server (grmapi-v2)'
              },
              {
                value: 'https://emailapi-ak-uat.infinitisoftware.net/emailapi',
                label: 'UAT server (mailer)'
              }
            ]}
          />
        </Form.Item> */}
        {/* <Row style={{height:"35px"}}>
          <Col span={7}> */}
        <Row>
          <Col span={7} className="remember">
            <Form.Item name="remember_me" className="cls-remember-ele" valuePropName="checked">
              <Checkbox className="link">{t('remember_me')}</Checkbox>
            </Form.Item>
          </Col>
          <Col span={6} offset={11}>
            <Form.Item className="forgot">
              <Button onClick={forgotClick} className="link" type="link">
                {' '}
                {/*If we use notification then decalre height as 0px */}
                {t('forgot_title')}?
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {/* <Row>
          <Col span={24} className="remember">
            <Form.Item name="allow_notification" className="cls-remember-ele" valuePropName="checked">
              <Checkbox onChange={(e) => setNotification(e.target.checked)} className="link">{t('allow_notification')}</Checkbox>
            </Form.Item>
          </Col>
        </Row> */}
        <Form.Item className="cls-login-btn">
          <Button data-testid="log_in_btn" type="primary" htmlType="submit">
            {apiStatus.isLoading ? <LoadingOutlined spin style={{ fontSize: '24px' }} /> : t('login_button')}
          </Button>
        </Form.Item>
      </ModForm>
    </>
  );
};

export { Login };
