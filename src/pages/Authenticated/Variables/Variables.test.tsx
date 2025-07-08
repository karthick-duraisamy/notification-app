import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';
import Variables from './Variables';
import VariablesForm from './VariablesForm';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';
import { useVariableForm } from '../../../hooks/VariablesForm.hook';

describe('Test case for variable page', () => {
  it('initial rendering', () => {
    render(
      <CommonTestWrapper>
        <Variables />
      </CommonTestWrapper>
    );
    expect(screen.getByText('Variables details')).toBeInTheDocument();
  });
  it('changing the variable type using select dropdown', async () => {
    render(
      <CommonTestWrapper>
        <Variables />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('variable_type');
    if (selectBox) fireEvent.click(selectBox);
    fireEvent.change(screen.getByTestId('variable_type'), {
      target: { value: 'a' }
    });
  });
  it('clicking create variable button', async () => {
    render(
      <CommonTestWrapper>
        <Variables />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('create_variable_btn');
    if (selectBox) fireEvent.click(selectBox);
  });
  it('rendered variable form page', () => {
    render(
      <CommonTestWrapper>
        <VariablesForm />
      </CommonTestWrapper>
    );
  });
  it('rendered variable form', () => {
    const {
      form,
      projectOption: { selectedProject },
      onFinish,
      resetFields,
      status,
      sync,
      retrieved
    } = useVariableForm();
    render(
      <CommonTestWrapper>
        <Form
          resetFields={resetFields}
          form={form}
          formSubmit={onFinish}
          projectSelected={selectedProject !== undefined}
          sync={sync}
          retrieved={retrieved}
          status={status}
        />
      </CommonTestWrapper>
    );
  });
});
