import { message, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectGetMasterInfoQuery } from '../services/project/Project';
import {
  useAddVariablesMutation,
  useLazyGetVariableMasterInfoQuery,
  useLazyGetVariableQuery,
  useLazyGetVariablesQuery,
  useUpdateVariableMutation
} from '../services/variables/Variable';
// import { AddVariable } from '../services/variables/VariableTypes';
import { useAppSelector } from './App.hook';
import { CheckGuideModal } from '../Utils/commonFunction';
import { setGuideModalInfo } from '../stores/TemplateProject.store';
import { useDispatch } from 'react-redux';
import { formErrorObjectFromResponse } from '../Utils/form';
import type { AddVariable } from '../services/variables/VariableTypes';

const validateAction = (action: string) => ['add', 'edit'].includes(action);

const useVariableForm = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { project, modalGuide } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const { action, id } = useParams() as { action: string; id: string };
  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);
  const [serviceGetVariables] = useLazyGetVariablesQuery();
  const [addVariableService, addVariableServiceStatus] = useAddVariablesMutation({});
  const [updateVariableService, updateVariableServiceStatus] = useUpdateVariableMutation({});
  const [retrieved, setRetrieved] = useState<boolean>(false);
  const [serviceGetVaraible, serviceGetVariableStatus] = useLazyGetVariableQuery();

  // for syncing the variable onBlur
  const syncVariable = (
    // id: string, variable: any, callback: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    // selectedProject &&
    //   updateVariableService({
    //     ...
    //   }).then((resp: any) => {
    //     if (resp && resp.data && resp.data.responseCode === 0) {
    //       callback((prevState) => prevState.filter((item) => item !== variable.fieldKey));
    //     }
    //   });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // validate and 'replace' the location, so user can go back to previous page
    if (!action || !validateAction(action)) {
      navigate('/404');
    }
  }, [action, navigate]);

  // The following useEffect is used for showing or notify the error response
  useEffect(() => {
    if (
      addVariableServiceStatus?.error &&
      typeof addVariableServiceStatus.error === 'object' &&
      'data' in addVariableServiceStatus.error
    ) {
      const errorData = addVariableServiceStatus.error.data as {
        response?: { Message?: string; errors?: { variables?: any } };
      };

      if (errorData.response) {
        const errorMessage = errorData.response.Message || 'An unexpected error occurred';
        notification.error({
          message: errorMessage
        });

        if (errorData.response.errors?.variables) {
          const getData = formErrorObjectFromResponse(errorData.response.errors.variables[0]);
          const formattedErrors: any = getData.map((error) => ({
            name: ['variables', 0, error.name], // Adding index 0 for the first variable because its stored like this.
            errors: error.errors
          }));
          //Show the response error on form.
          form.setFields(formattedErrors);
        }
      }
    }
  }, [addVariableServiceStatus]);

  // The following useEffect is used to triggered the error message
  useEffect(() => {
    if (
      updateVariableServiceStatus?.error &&
      typeof updateVariableServiceStatus.error === 'object' &&
      'data' in updateVariableServiceStatus.error
    ) {
      const errorData = updateVariableServiceStatus.error.data as {
        response?: { Message?: string; errors?: { variable?: any } };
      };

      if (errorData.response) {
        // const errorMessage = errorData.response.Message || 'An unexpected error occurred';
        if (errorData.response.errors?.variable) {
          const getData = formErrorObjectFromResponse(errorData.response.errors.variable);
          const formattedErrors: any = getData.map((error) => ({
            name: ['variables', 0, error.name], // Adding index 0 for the first variable because its stored like this.
            errors: error.errors
          }));
          //Show the response error on form.
          form.setFields(formattedErrors);
        }
      }
    }
  }, [updateVariableServiceStatus]);

  useEffect(() => {
    const { isSuccess, data, error } = serviceGetVariableStatus;
    if (isSuccess && data && data.responseCode === 0) {
      setRetrieved(true);
      let variable = data.response.data;
      setSelectedProject(variable.project.toString());
      localStorage.setItem('status', variable.status.toString());
      form.setFieldsValue({
        variables: [
          {
            variable_name: variable.variable_name,
            type: parseInt(variable.variable_type),
            value: variable.value,
            status: variable.status === 1 ? 1 : 2,
            variable_id: variable.variable_id,
            description: variable.description
          }
        ]
      });
    } else if (data?.responseCode === 1) {
      const errorData = (error as any)?.data;
      if (errorData) {
        const errorResponse = errorData?.response?.errors ? errorData?.response?.errors : errorData.detail;
        errorResponse[Object.keys(errorResponse)[0]][0].message
          ? message.error(errorResponse[Object.keys(errorResponse)[0]][0].message)
          : message.error(errorResponse);
      }
    }
  }, [form, serviceGetVariableStatus]);

  const resetFields = () => {
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    if (!values && !validateAction(action)) {
      return;
    }

    const formatFormValues = (values: any) => {
      if (values.variables && values.variables.length > 0) {
        const eachVariable: AddVariable['variables'] = values.variables.map((item: any) => {
          return {
            variable_name: item.variable_name,
            variable_type: item.type,
            value: item.value.toString(),
            project: project,
            description: item.description,
            status:
              item.status === undefined
                ? localStorage.status === '' || localStorage.status === null
                  ? 1
                  : Number(localStorage.status)
                : item.status === true
                  ? 1
                  : 2
          };
        });
        localStorage.setItem('status', '');
        return { variables: eachVariable };
      }
    };

    switch (action) {
      case 'add':
        const variables = formatFormValues(values);

        if (variables && retrieved === false) {
          const addVariablesData: AddVariable = {
            variables: variables as any
          };

          const result = await addVariableService(addVariablesData)
            .unwrap()
            .catch((err: any) => {
              message.error(err?.data?.response?.Message || 'Unexpected error');
              return false;
            });

          if (result && typeof result !== 'boolean') {
            const { response, responseCode } = result;
            if (responseCode === 0) {
              notification.success({ message: 'added variables' });
              // After adding the variable, to set the variables on store for opening integration workflow modal (Guide).
              let value = 'variables';
              const valueSet = CheckGuideModal(modalGuide, value);
              dispatch(setGuideModalInfo({ value: valueSet }));
              navigate('/variables');
              // navigate(-1);
            } else if (responseCode === 1) {
              message.error((response as any)?.response?.Message);
            } else {
              //error
              const { errors } = response as unknown as any;
              if (errors) {
                if (errors?.variables) {
                  let idx = 0;
                  const tmp = errors?.variables.map((obj: Object) => {
                    let rtn: any = [];
                    Object.entries(obj).forEach(([key, value]) => {
                      if (key && value instanceof Array) {
                        rtn = { name: ['variables', idx, key], errors: value };
                      }
                    });

                    idx++;
                    return rtn;
                  });
                  form.setFields(tmp);
                }
              }
            }
          }
        }
        break;
      case 'edit':
        if (selectedProject) {
          const variable = {
            variable_name: values.variables[0].variable_name,
            variable_type: values.variables[0].type,
            value: values.variables[0].value,
            project: project?.toString(),
            description: values.variables[0].description,
            status: values.variables[0].status === true || values.variables[0].status == 1 ? '1' : '2'
          };
          const result = await updateVariableService({ id, variable: variable })
            .unwrap()
            .catch((err: any) =>
              message.error(
                err.data?.response['errors']
                  ? err.data?.response['Message']
                  : err.data?.response['errors']['variable'][0]
              )
            );
          if (result && typeof result !== 'boolean') {
            const { responseCode } = result;
            if (responseCode === 0) {
              localStorage.setItem('status', '');
              notification.success({ message: 'updated variables' });
              navigate(-1);
            }
            // } else {
            //   //error
            //   console.log("i am here");
            //   console.log(response);

            //   const { errors } = response;

            //   if (errors) {
            //     if (errors.variable && errors.variable[0]?.includes('already mapped')) {
            //       notification.error({
            //         message: errors.variable[0]
            //       });
            //     } else {
            //       if (errors.variable) {
            //         Object.entries(errors.variable).forEach(([key, value]) => {
            //           form.setFields([{ name: ['variables', 0, key], errors: value as string[] }]);
            //         });
            //       }
            //     }
            //   }
            // }
          }
        }

        break;
    }
  };

  return {
    form,
    projectOption: {
      selectedProject,
      setSelectedProject
    },
    retrieved,
    services: {
      serviceGetVariables,
      addVariableService,
      serviceGetVaraible
    },
    status: {
      addVariableServiceStatus,
      updateVariableServiceStatus
    },
    onFinish,
    resetFields,
    route: {
      action
    },
    sync: {
      api: syncVariable
    }
  };
};

export interface Options {
  label: string;
  id: number;
}
const useProjectSelect = () => {
  const [project, setProjects] = useState<Options[]>([]);

  ProjectGetMasterInfoQuery({});
  const projectMasterInfo = useAppSelector((state) => state.MasterInfoReducer.project);

  useEffect(() => {
    if (projectMasterInfo && projectMasterInfo.project && projectMasterInfo.project.length > 0) {
      const tmp = projectMasterInfo.project.map((item: any) => {
        return {
          label: item.label,
          id: item.value
        };
      });

      setProjects(tmp);
    }
  }, [projectMasterInfo]);

  return {
    project
  };
};

const useVariableProjectSelection = () => {
  const [actions, setActions] = useState<Options[]>([]);
  const [service, serviceStatus] = useLazyGetVariableMasterInfoQuery();

  useEffect(() => {
    service({});
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (serviceStatus.isSuccess && serviceStatus && serviceStatus.data && serviceStatus.data.responseCode === 0) {
      if (serviceStatus.data.response.data && serviceStatus.data.response.data.project) {
        const tmp = serviceStatus.data.response.data.project.map((action: any) => {
          return {
            label: action.label,
            id: action.value
          };
        });
        setActions(tmp);
      }
    } else if (
      serviceStatus.isSuccess &&
      serviceStatus &&
      serviceStatus.data &&
      serviceStatus.data.responseCode === 1
    ) {
      const error = (serviceStatus?.error as any)?.data;
      if (error) {
        const errorResponse = error?.response?.errors ? error?.response?.errors : error.detail;
        error[Object.keys(error)[0]][0].message
          ? message.error(error[Object.keys(error)[0]][0].message)
          : message.error(errorResponse);
      }
    }
  }, [serviceStatus]);

  return { project: actions };
};

export { useVariableForm, useProjectSelect, useVariableProjectSelection };

// crte new end pnt in pj for mstr, stor in mstr by full fill, trigger call here, useappselector ins cust hook
