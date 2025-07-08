import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'antd/lib/form/Form';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';
import { SettingForm } from './Form';
import Settings from './Settings';
import LazySettings from './Settings.lazy';
import SettingsForm from './SettingsForm';

// describe('<Settings />', () => {
//   test('it should mount', () => {
//     render(
//       <CommonTestWrapper>
//         <Settings />
//       </CommonTestWrapper>
//     );
//     const settings = screen.getByTestId('Settings');
//     expect(settings).toBeInTheDocument();
//   });
// });
describe('settings page testing', () => {
  it('lazy Settings page', () => {
    render(
      <CommonTestWrapper>
        <LazySettings />
      </CommonTestWrapper>
    );
  });
  it('rendered settings page', () => {
    render(
      <CommonTestWrapper>
        <Settings />
      </CommonTestWrapper>
    );
    const settings = screen.getByTestId('Settings');
    expect(settings).toBeInTheDocument();
    const new_setting_create_btn = screen.getByTestId('new_setting_create_btn');
    if (new_setting_create_btn) fireEvent.click(new_setting_create_btn);
  });
  it('rendered settings form page', () => {
    render(
      <CommonTestWrapper>
        <SettingsForm />
      </CommonTestWrapper>
    );
  });
  it('rendered settings form', () => {
    const resetFields = () => {};
    const onFinish = () => {};
    const menuAction = () => {};
    const testMail = () => {};
    const [form] = useForm();
    render(
      <CommonTestWrapper>
        <SettingForm
          form={form}
          formSubmit={onFinish}
          resetFields={resetFields}
          menuAction={menuAction}
          testMail={testMail}
          isSaving={false}
        />
      </CommonTestWrapper>
    );
    const send_test_mail = screen.getByTestId('send_test_mail');
    if (send_test_mail) fireEvent.click(send_test_mail);
    const create_setting_submit_btn = screen.getByTestId('create_setting_submit_btn');
    if (create_setting_submit_btn) fireEvent.click(create_setting_submit_btn);
  });
});
