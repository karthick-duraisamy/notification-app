import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Tooltip, notification } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, LockTwoTone, MailTwoTone } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './ResetPassword.scss';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordServiceMutation } from '../../../services/user/Users';
import { FormTitle } from '@/components/Title/Title';
import { ModForm } from '@/components/ModForm/ModForm';

const ResetPassword = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();

  /* state */
  const [pwdLength, setPwdLength] = useState(false);
  const [pwdCase, setPwdCase] = useState(false);
  const [pwdChar, setpwdChar] = useState(false);
  const [pwdScore, setPwdScore] = useState('poor');
  const [userPassword, setuserPassword] = useState('');
  const resetPasswordData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('resetPasswordData'))));
  const [resetPasswordSerive, resetPasswordSeriveStatus] = useForgotPasswordServiceMutation();

  useEffect(() => {
    let count = 0;
    [pwdLength, pwdCase, pwdChar].map((value) => {
      if (value) {
        count += 1;
      } 
      
      return true;
    });
    switch (count) {
      case 3:
        setPwdScore('great');
        break;
      case 2:
        setPwdScore('medium');
        break;
      default:
        setPwdScore('poor');
        break;
    }
  }, [pwdLength, pwdCase, pwdChar]);
  /* password input change handler */
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserPassword(e.target.value);
    e.target.value.length > 7 ? setPwdLength(true) : setPwdLength(false);
    e.target.value.match(/(?=(.*[a-z]))(?=(.*[A-Z]))/) ? setPwdCase(true) : setPwdCase(false);
    e.target.value.match(/(?=.*[!@#$&*])/) ? setpwdChar(true) : setpwdChar(false);
  };

  const resetPassword = async (values: any) => {
    if (values.confirm_password === userPassword) {
      localStorage.removeItem('resetPasswordData');
      await resetPasswordSerive({
        reset_link: resetPasswordData?.reset_link,
        confirm_password: values.confirm_password,
        password: userPassword,
        email_id: resetPasswordData?.email_id
      })
        .unwrap()
        .catch((err: any) => console.log(err));
    } else {
      notification.error({ message: 'Password and confirm password is mismatched' });
    }
  };

  useEffect(() => {
    if (resetPasswordSeriveStatus?.isSuccess && (resetPasswordSeriveStatus as any)?.responseCode === 0) {
      notification.success({ message: (resetPasswordSeriveStatus as any).response.Message });
      navigate('/');
    }
  });

  /* password tooltip starts */
  const PasswordToolTip = () => (
    <div className="cls-pwd-tooltip">
      <span className="tip-title">{t('password_hints')} :</span>
      <ul>
        <li>
          {pwdLength ? <CheckCircleFilled /> : <CloseCircleFilled />}
          <span data-testid="PasswordLength" className="fs-12">{t('password_length')}</span>
        </li>
        <li>
          {pwdCase ? <CheckCircleFilled /> : <CloseCircleFilled />}
          <span className="fs-12">{t('password_case')}</span>
        </li>
        <li>
          {pwdChar ? <CheckCircleFilled /> : <CloseCircleFilled />}
          <span className="fs-12">{t('password_special_char')}</span>
        </li>
      </ul>
      <div className={`pwd-strength ${pwdScore}`}>
        <div className="pwd-title">
          <span className="tip-title">{t('password_strength')}</span>
          <span className="pwd-comment">{t(pwdScore)}</span>
        </div>

        <div className="pwd-meter">
          <span className="p1"></span>
          <span className="p2"></span>
          <span className="p3"></span>
          <span className="p4"></span>
        </div>
      </div>
    </div>
  );
  /* password tooltip ends */

  // const onFinish = (values: any) => {
  // };

  return (
    <div className="ResetPassword" data-testid="ResetPassword">
      <FormTitle title="reset_title" subTitle="reset_subtitle" />
      <ModForm
        layout="vertical"
        form={form}
        onFinish={resetPassword}
        name="resetPassword"
        initialValues={{ email_id: (resetPasswordData as any)?.email_id }}
        scrollToFirstError
      >
        <Form.Item label={t('email_id')} name="email_id">
          <Input
            type="email"
            required
            prefix={<MailTwoTone style={{ fontSize: '16px' }} twoToneColor="#A4A9C2" />}
            placeholder={t('email_id_help')}
            disabled={true}
          />
        </Form.Item>
        <Form.Item label={t('password')} name="user_password">
          <Tooltip title={PasswordToolTip} placement="bottom" color="#ffffff" trigger="focus">
            <Input.Password
              min={8}
              required
              data-testid="PasswordInput"
              prefix={<LockTwoTone style={{ fontSize: '16px' }} twoToneColor="#A4A9C2" />}
              placeholder={t('password_help')}
              onChange={handlePasswordInput}
            />
          </Tooltip>
        </Form.Item>
        <Form.Item label={t('confirm_password')} name="confirm_password">
          <Input.Password
            min={8}
            required
            prefix={<LockTwoTone style={{ fontSize: '16px' }} twoToneColor="#A4A9C2" />}
            placeholder={t('password_help')}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" data-testid="reset_title">
            {t('reset_title')}
          </Button>
        </Form.Item>
      </ModForm>
    </div>
  );
};

export default ResetPassword;
