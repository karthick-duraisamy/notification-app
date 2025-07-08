import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useVariableForm } from '../../../hooks/VariablesForm.hook';
import { FormLayout } from '../../../layouts/Form/Form';
import { Form } from './Form';

const VariablesForm = () => {
  const { id } = useParams() as { id: string };
  const project = localStorage.getItem('project');
  const {
    form,
    projectOption: { 
      selectedProject, 
      // setSelectedProject 
    },
    onFinish,
    resetFields,
    services: { serviceGetVaraible },
    status,
    route: { action },
    sync,
    retrieved
  } = useVariableForm();
  useEffect(() => {
    serviceGetVaraible({ id: id, project: project });
    // eslint-disable-next-line
  }, []);

  const ProjectSelect = () => {
    // const { project } = useVariableProjectSelection();

    return (
      <Row justify="end">
        <Col>
          {/* <Space size="middle">
            <Select
              placeholder="Select Project"
              value={selectedProject}
              disabled={project.length === 0}
              onChange={(value: string) => setSelectedProject(value)}
              style={{ minWidth: '200px' }}
            >
              {project &&
                project.map(({ label, id }) => {
                  return <Option value={id}>{label}</Option>;
                })}
            </Select>
          </Space> */}
        </Col>
      </Row>
    );
  };
  return (
    <FormLayout
      title={`${action.charAt(0).toUpperCase() + action?.slice(1) + ' variables'}`}
      additionalHead={action === 'add' ? <ProjectSelect /> : <></>}
    >
      <Form
        resetFields={resetFields}
        form={form}
        formSubmit={onFinish}
        projectSelected={selectedProject !== undefined}
        sync={sync}
        retrieved={retrieved}
        status={status}
      />
    </FormLayout>
  );
};

export default VariablesForm;
