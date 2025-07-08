import { render } from '@testing-library/react';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';
import Project from './Project';
import CreateMailer from './ProjectForm';
import { useForm } from 'antd/lib/form/Form';
import { ProjectForm } from './Form';

// test('Project renderd', () => {
//   render(
//     <CommonTestWrapper>
//       <Project />
//     </CommonTestWrapper>
//   );
//   const header = screen.getByText('Project');
//   expect(header).toBeInTheDocument();
// });

describe('Contacts page testing', () => {
  it('rendered contacts page', () => {
    render(
      <CommonTestWrapper>
        <Project />
      </CommonTestWrapper>
    );
  });
  it('rendered contacts form page', () => {
    render(
      <CommonTestWrapper>
        <CreateMailer />
      </CommonTestWrapper>
    );
  });
  it('rendered contacts form', () => {
    const onFinish = () => {};
    const resetFields = () => {};
    const [form] = useForm();
    render(
      <CommonTestWrapper>
        <ProjectForm form={form} formSubmit={onFinish} resetFields={resetFields} isSaving={false} action={'create'} />
      </CommonTestWrapper>
    );
  });
});
