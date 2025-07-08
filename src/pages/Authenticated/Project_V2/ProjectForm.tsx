import { notification, Modal, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';
import {
  useAddProjectMutation,
  useLazyGetProjectQuery,
  useUpdateProjectMutation
} from '../../../services/project/Project';
import { useAppDispatch, useAppSelector } from '../../../hooks/App.hook';
import { cleanUpProject } from '../../../stores/Project.store';
import { ProjectForm } from './Form';
import { FormLayout } from '../../../layouts/Form/Form';
import './Project.scss';
import { CloseCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import type { AddProjectRequest, AddProjectResponse } from '../../../services/project/ProjectTypes';
import { formErrorObjectFromResponse } from '../../../Utils/form';
import { CheckGuideModal } from '../../../Utils/commonFunction';
import { setGuideModalInfo } from '../../../stores/TemplateProject.store';
import { CertificateIcon } from '../../../components/Icons/Icons';

const CreateMailer = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { action } = useParams() as { action: string };
  const validateAction = (action: string) => ['create', 'edit'].includes(action);

  const { edit, project, modalGuide } = useAppSelector((state: any) => state.ProjectReducer);
  const [serviceSingleProjectGet, { isSuccess: isEditFetchSuccess }] = useLazyGetProjectQuery();
  const [serviceAdd] = useAddProjectMutation();
  const [serviceUpdate] = useUpdateProjectMutation();
  const [isSaving, setIsSaving] = useState(false);
  const [projectStatus, setProjectStatus] = useState<string>('');
  const [modalData, setModalData] = useState({
    visible: false,
    project_name: undefined,
    project_code: undefined,
    project_id: undefined
  });
  useEffect(() => {
    // validate and 'replace' the location, so user can go back to previous page
    if (!action || !validateAction(action)) {
      navigate('/404');
    }

    // edit page and provided project id
    if (edit) {
      serviceSingleProjectGet({ project_id: edit.toString() });
    }

    // cleanup state as soon as component is unmounted
    return () => {
      dispatch(cleanUpProject());
    };
    // eslint-disable-next-line
  }, []);

  const setFormData = (project: AddProjectResponse) => {
    setProjectStatus(project.status);
    form.setFieldsValue({
      project_name: project.project_name,
      project_code: project.project_code,
      status: project.status,
      actions: project.actions.map((projectAction) => {
        return {
          action_name: projectAction.action_name,
          unique_name: projectAction.unique_name,
          action_id: projectAction.action_id
        };
      })
    });
  };

  useEffect(() => {
    if (project && isEditFetchSuccess) {
      setFormData(project);
    }
    // eslint-disable-next-line
  }, [project, isEditFetchSuccess, edit, projectStatus]);

  const resetFields = () => {
    if (project && isEditFetchSuccess) {
      setFormData(project);
    } else {
      form.resetFields();
    }
  };

  const onFinish = async (values: any) => {
    values.status = (values.status === undefined || values.status) === true || values.status === 1 ? 1 : 2;
    if (!values && !validateAction(action)) {
      return;
    }

    // create status while updating values in form
    const withStatus = (values: any): AddProjectRequest => {
      const actions: AddProjectRequest['project']['actions'] =
        values.actions &&
        values.actions.map(({ action_name, action_id }: { action_name: string; action_id: number }) => {
          return {
            action_name,
            action_id,
            status: '1'
          };
        });

      return {
        project: {
          project_name: values.project_name,
          project_code: values.project_code,
          status: values.status,
          actions
        }
      };
    };

    switch (action) {
      case 'create':
        const requestFormat = withStatus(values);

        setIsSaving(true);
        const response = await serviceAdd(requestFormat)
          .unwrap()
          .catch((err: any) => err.data);

        setIsSaving(false);
        if (response.responseCode === 0) {
          localStorage.setItem('status', '');
          // success
          let data = response.response.data;
          setModalData({
            visible: true,
            project_name: data.project_name,
            project_code: data.project_code,
            project_id: data.project_id
          });
          // navigate(-1);
        } else if (response.responseCode === 1) {
          // error
          message.error(response?.response?.Message);
          const {
            response: {
              errors: { project }
            }
          } = response;
          form.setFields(formErrorObjectFromResponse(project));
        }
        break;

      case 'edit':
        if (values && project) {
          setIsSaving(true);
          const response = await serviceUpdate({
            project_id: project?.project_id?.toString(),
            project: withStatus(values).project
          })
            .unwrap()
            .catch((err: any) => err.data);

          setIsSaving(false);
          if (response?.responseCode === 0) {
            // success
            notification.success({ message: 'project updated' });
            localStorage.setItem('status', '');
            navigate(-1);
          } else if (response?.responseCode === 1) {
            // error
            message.error(response?.response?.Message);
            const {
              response: {
                errors: { project }
              }
            } = response;
            form.setFields(formErrorObjectFromResponse(project));
          }
        } else {
          message.error('Project not found');
        }

        break;
    }
  };
  const dispath = useDispatch();
  let valueSet: any;

  // After adding the project form to store the store value for Integration workflow modal.(Guide)
  useEffect(() => {
    if (modalData.visible == true) {
      let value = "project";
      valueSet = CheckGuideModal(modalGuide, value);
      dispath(setGuideModalInfo({ value: valueSet }));
      navigate('/project');
    }
  }, [modalData])

  return (
    <>
      <FormLayout title={`${action.charAt(0).toUpperCase() + action.slice(1) + ' project'}`}>
        <ProjectForm
          form={form}
          formSubmit={onFinish}
          resetFields={resetFields}
          isSaving={isSaving}
          action={action}
          projectStatusValue={projectStatus}
        />
        <Modal
          open={modalData.visible}
          onCancel={() => {
            setModalData({ visible: false, project_name: undefined, project_code: undefined, project_id: undefined });
          }}
          closeIcon={<CloseCircleOutlined style={{ fontSize: 22, color: '#FF4646' }} />}
          footer={
            <>
              <Button className="mr-3" onClick={() => navigate(-1)}>
                Go to list
              </Button>
              <Button type="primary" onClick={() => navigate(`/settings/create?project=${modalData.project_id}`)}>
                Create settings <ArrowRightOutlined />
              </Button>
            </>
          }
          width="50%"
          className="ProjectModal custom-modal text-center"
          destroyOnClose={true}
        >
          <CertificateIcon />
          <h2 className="f-sbold">
            {modalData.project_name} <span className="project-code">({modalData.project_code})</span> project created
            successfully
          </h2>
          <p>You have created a project successfully. Do you want to create settings for this project?</p>
        </Modal>
      </FormLayout>
    </>
  );
};

export default CreateMailer;
