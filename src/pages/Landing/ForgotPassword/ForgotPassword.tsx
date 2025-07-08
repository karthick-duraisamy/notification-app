import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MailTwoTone, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import { resetPasswordService } from '../../../services/user/Users';
import { useForm } from 'antd/lib/form/Form';
import { LoadingOutlined } from '@ant-design/icons';
import './ForgotPassword.scss';
import { useEffect } from 'react';
import { FormTitle } from '@/components/Title/Title';
import { ModForm } from '@/components/ModForm/ModForm';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = useForm();
  const [service, serviceStatus] = resetPasswordService();

  const onFinish = (values: any) => {
    service({ email_id: values.email_id });
  };

  useEffect(() => {
    if ((serviceStatus as any)?.isSuccess && (serviceStatus as any).data.responseCode === 0)
      localStorage.setItem('isResetLink', '1');
  }, [serviceStatus]);

  const goBackToLogin = () => {
    navigate(-1);
  };

  const Feedback = () => {
    if (!serviceStatus.isSuccess) {
      return null;
    }
    return (
      <div
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          display: 'flex',
          gap: '6px'
        }}
      >
        {(serviceStatus as any).data?.responseCode === 0 ? (
          <>
            <CheckCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="#52c41a" />
            <label>{t('msg_password_reset_success')}</label>
          </>
        ) : (
          <>
            <CloseCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="#f51e1e" />
            <label>{t('msg_password_reset_fail')}</label>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <FormTitle testId="ForgotPassword" title="forgot_title" subTitle="forgot_subtitle" />
      <ModForm onFinish={onFinish} form={form} layout="vertical" className="ForgotPassword" scrollToFirstError>
        <Form.Item
          label={t('email_id')}
          name="email_id"
          rules={[
            { type: 'email', message: t('msg_invalid_email') + '!' },
            { required: true, message: t('msg_empty_email') + '!' }
          ]}
        >
          <Input
            prefix={<MailTwoTone style={{ fontSize: '16px' }} twoToneColor="#A4A9C2" />}
            placeholder={t('email_id_help')}
          />
        </Form.Item>
        <Feedback />
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            disabled={serviceStatus.isSuccess && (serviceStatus as any).data.responseCode === 0}
          >
            {serviceStatus.isLoading ? <LoadingOutlined spin style={{ fontSize: '24px' }} /> : t('get_password')}
          </Button>
        </Form.Item>
        <Form.Item className="cls-forgot-btn">
          <Button onClick={goBackToLogin} type="primary" className="link">
            {t('back_to_login')}
          </Button>
        </Form.Item>
      </ModForm>
    </>
  );
};

export { ForgotPassword };
