import { useEffect, useState } from 'react';
import { useLazyGetEnvironmentQuery, useLazyGetFolderQuery } from '../services/folder/Folder';
import {
  useLazyGetProjectDataQuery,
  useLazyGetProjectActionQuery,
  useLazyGetProjectQuery
} from '../services/project/Project';
import { useLazyGetVariableMasterInfoQuery } from '../services/variables/Variable';
import {
  useLazyGetTemplateListForMappingQuery,
  useLazyGetAutoCompleteDataQuery
} from '../services/templates/Templates';
import { useLazyGetSettingMasterInfoQuery } from '../services/setting/Setting';
import { setTemplateProjectId, setTimeFormat, setTrackingModuleInfo } from '../stores/TemplateProject.store';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './App.hook';
import { message } from 'antd';
import { useTheming } from './Theme.hook';
import { handleCustomFont } from '../Utils/user';
import { FONTS_CONFIG } from '../pages/Authenticated/Templates/FontConfig';
import type { Options } from './VariablesForm.hook';
import type { GetFolder } from '../services/folder/FolderTypes';

const useFolderSelection = ({ mode }: { mode: 'mailer' | 'template' }) => {
  const [options, setOptions] = useState<Options[]>([]);
  const [service, serviceStatus] = useLazyGetFolderQuery();

  useEffect(() => {
    let serviceData: GetFolder = {
      pathname: mode === 'mailer' ? 'mailer' : 'template',
      project: localStorage.getItem('project')
    };
    if (mode === 'mailer') {
      service(serviceData);
    } else if (mode === 'template') {
      service(serviceData);
    }
  }, [service, mode]);

  useEffect(() => {
    if (serviceStatus.isSuccess && serviceStatus.data.responseCode === 0) {
      let tmp: Options[] = [];
      serviceStatus.data.response.data.map((item: any) => {
        tmp.push({ label: item.folder_name, id: parseInt(item.folder_id) });
        return true;
      });
      setOptions(tmp);
    }
  }, [serviceStatus]);

  return {
    folderOptions: options
  };
};

const useTemplateFolderSelection: any = () => {
  const [actions, setActions] = useState<any[]>([]);
  const [service, serviceStatus] = useLazyGetFolderQuery();

  const serviceData: GetFolder = {
    pathname: 'template',
    project: localStorage.getItem('project')
  };
  useEffect(() => {
    service(serviceData);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (serviceStatus.isSuccess && serviceStatus && serviceStatus.data && serviceStatus.data.responseCode === 0) {
      setActions(serviceStatus.data.response.data);
    }
  }, [serviceStatus]);

  return { templateFolder: actions };
};

// To check whether the local storage project value is valid or not.
const isValidProjectKey = (projectList: any[], projectId: any): boolean => {
  return projectList.some((project) => Number(project.id) === Number(projectId));
};

const useGetProjectSelection: any = () => {
  const [actions, setActions] = useState<any[]>([]);
  const [service, serviceStatus] = useLazyGetProjectDataQuery();
  const dispath = useDispatch();
  const { project } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const { changeTheme } = useTheming();
  const [getProjects, getProjectsData] = useLazyGetProjectQuery();

  useEffect(() => {
    service({});
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (serviceStatus.isSuccess && serviceStatus && serviceStatus.data && serviceStatus.data.responseCode === 0) {
      if (serviceStatus.data.response.data) {
        const projectList = serviceStatus.data.response.data
          .filter((data: any) => data.status === 1)
          .map((action: any) => {
            return {
              label: action.project_name,
              id: action.project_id,
              code: action.project_code
            };
          });
        let value: number = Number(projectList[0]?.id);
        if (
          localStorage.getItem('project') === null ||
          !isValidProjectKey(projectList, localStorage.getItem('project'))
        ) {
          localStorage.setItem('project_code', projectList[0]?.code);
          dispath(setTemplateProjectId({ value }));
          localStorage.setItem('project', value.toString());
          localStorage.setItem('fontInfo', JSON.stringify(FONTS_CONFIG));
          // if (isNullorUndefined(value)) getProjects({ project_id: value.toString() });
          const projectCode = projectList[0]?.code?.toLocaleLowerCase() || '';
          if (
            ['xy', '6e', 'qr'].some((code) => projectCode.includes(code)) &&
            sessionStorage.getItem('iframe_token') !== null
          ) {
            changeTheme(
              projectCode?.includes('xy')
                ? 'XY'
                : projectCode?.includes('6e')
                  ? 'Indigo'
                  : projectCode.includes('qr')
                    ? 'QR'
                    : 'light'
            );
          } else changeTheme('light');
        } else {
          value = Number(localStorage.getItem('project'));
          dispath(setTemplateProjectId({ value }));
          localStorage.setItem('fontInfo', JSON.stringify(FONTS_CONFIG));
          // if (isNullorUndefined(value)) getProjects({ project_id: value.toString() });
          const selectedProject = projectList.find((lang: any) => lang.id === value);
          if (selectedProject !== undefined) localStorage.setItem('project_code', selectedProject?.code);
        }
        setActions(projectList);
      }
    }
  }, [serviceStatus]);

  useEffect(() => {
    if (project !== undefined) getProjects({ project_id: (project as string)?.toString() });
  }, [project]);

  useEffect(() => {
    if (getProjectsData?.isSuccess && getProjectsData?.data?.responseCode === 0) {
      if ((getProjectsData as any)?.data?.response?.data?.customizations?.font?.length > 0) {
        let dynamicFont = handleCustomFont((getProjectsData as any)?.data?.response?.data?.customizations?.font);
        localStorage.setItem('fontInfo', JSON.stringify(dynamicFont));
      }
      let trackingModule = (getProjectsData as any)?.data?.response?.data?.customizations?.tracking;
      dispath(setTrackingModuleInfo({ trackingModule }));
      let value = (getProjectsData as any)?.data?.response?.data?.customizations?.timezone_conversion;
      dispath(setTimeFormat({ value }));
      localStorage.setItem('isTimeZone', value?.toLocaleLowerCase()?.includes('local') ? '1' : '0');
    }
  }, [getProjectsData]);

  return { selectProject: actions };
};

const useTemplateSelection = ({ folder_id, language_id }: { folder_id: number[]; language_id: number[] }) => {
  const [options, setOptions] = useState<Options[][]>([]);
  const [service] = useLazyGetTemplateListForMappingQuery();

  useEffect(() => {
    setOptions([]);
    if (folder_id.length > 0 && language_id.length > 0) {
      new Promise((resolve) => {
        let res: any = [];
        folder_id.forEach(async (item, index) => {
          let tmp: any = [];
          const response = await service({ folder_id: item, language_id: language_id[index] })
            .unwrap()
            .catch((err: any) => {
              const errorKey: any = err?.data?.response['errors']
                ? Object.keys(err.data.response['errors'])[0]
                : undefined;
              message.error(
                errorKey ? errorKey + ' ' + err.data.response['errors'][errorKey][0] : err.data.response['Message']
              );
            });
          if (response && response.responseCode === 0 && response.response.data) {
            // eslint-disable-next-line
            response.response.data.map((item: any) => {
              tmp.push({ label: item.template_name, id: item.template_id });
            });
          }

          res.push({ value: tmp, originalIndex: index });
          if (res.length === folder_id.length) {
            // sort based on originalIndex
            res.sort((a: any, b: any) => a.originalIndex - b.originalIndex);
            let sorted: any = [];
            // extract the values after sorting
            // eslint-disable-next-line
            res.map((item: any) => {
              sorted.push(item.value);
            });
            resolve(sorted);
          }
        });
      }).then((res) => {
        setOptions(res as any);
      });
    }
    // eslint-disable-next-line
  }, [folder_id, language_id]);

  return {
    templateOptions: options
  };
};

const useActionSelection = ({ project_id }: { project_id: number | string | undefined }) => {
  const [actions, setActions] = useState<Options[]>([]);
  const [service, serviceStatus] = useLazyGetProjectActionQuery();
  const [prev, setPrev] = useState<number | string>(0);

  useEffect(() => {
    // types may differ check it
    // eslint-disable-next-line
    if (project_id && project_id !== '' && project_id != prev) {
      setPrev(project_id);
      setActions([]);
      service({ project_id: project_id.toString() });
    }
    // eslint-disable-next-line
  }, [project_id]);

  useEffect(() => {
    if (serviceStatus?.isSuccess && serviceStatus?.data?.responseCode === 0) {
      if (serviceStatus?.data?.response?.data) {
        const tmp = serviceStatus?.data?.response?.data?.map((action: any) => {
          return {
            label: action.action_name,
            id: action.action_id
          };
        });
        setActions(tmp);
      }
    }
    // eslint-disable-next-line
  }, [serviceStatus]);

  return { actions };
};

const useAutoCompleteSelection = ({
  search_string,
  folder_id,
  language_id
}: {
  search_string: string;
  folder_id: number | string | undefined;
  language_id: number | string;
}) => {
  const [actions, setActions] = useState<Options[]>([]);
  const [service, serviceStatus] = useLazyGetAutoCompleteDataQuery();

  useEffect(() => {
    if (search_string && search_string !== '') {
      setActions([]);
      service({ search_string: search_string, folder_id: folder_id, language_id: language_id });
    }
  }, [search_string, folder_id, language_id, service]);

  useEffect(() => {
    if (serviceStatus.isSuccess && serviceStatus && serviceStatus.data && serviceStatus.data.responseCode === 0) {
      if (serviceStatus.data.response.data) {
        const tmp = serviceStatus.data.response.data.map((action: any) => {
          return {
            label: action.label,
            id: action.value
          };
        });
        setActions(tmp);
      }
    } else if (serviceStatus.isSuccess && serviceStatus.data && serviceStatus.data.responseCode === 1) {
      const error = (serviceStatus?.error as any)?.data;
      if (error) {
        const errorResponse = error?.response?.errors ? error?.response?.errors : error.detail;
        error[Object.keys(error)[0]][0].message
          ? message.error(error[Object.keys(error)[0]][0].message)
          : message.error(errorResponse);
      }
    }
  }, [serviceStatus]);

  return { autoCompleteTemplateOption: actions };
};

const useSettingProjectSelection = () => {
  const [actions, setActions] = useState<any[]>([]);
  const [service, serviceStatus] = useLazyGetSettingMasterInfoQuery();

  useEffect(() => {
    service({});
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (serviceStatus.isSuccess && serviceStatus && serviceStatus.data && serviceStatus.data.responseCode === 0) {
      setActions((serviceStatus as any)?.data?.response?.data);
    } else if (serviceStatus.isSuccess && serviceStatus.data && serviceStatus.data.responseCode === 1) {
      const error = (serviceStatus?.error as any)?.data;
      if (error) {
        const errorResponse = error?.response?.errors ? error?.response?.errors : error.detail;
        error[Object.keys(error)[0]][0].message
          ? message.error(error[Object.keys(error)[0]][0].message)
          : message.error(errorResponse);
      }
    }
  }, [serviceStatus]);

  return { selectProject: actions };
};

const useVariableTypeSelection = () => {
  const [options, setOptions] = useState<Options[]>([]);
  const [service, serviceStatus] = useLazyGetVariableMasterInfoQuery();

  useEffect(() => {
    service({});
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (serviceStatus.isSuccess && serviceStatus.data && serviceStatus.data.responseCode === 0) {
      const { variable_type } = serviceStatus.data.response.data;
      if (variable_type) {
        const tmp = variable_type.map((item: any) => {
          return {
            label: item.label,
            id: Number(item.value)
          };
        });
        setOptions(tmp);
      }
    } else if (serviceStatus.isSuccess && serviceStatus.data && serviceStatus.data.responseCode === 1) {
      const error = (serviceStatus?.error as any)?.data;
      if (error) {
        const errorResponse = error?.response?.errors ? error?.response?.errors : error.detail;
        error[Object.keys(error)[0]][0].message
          ? message.error(error[Object.keys(error)[0]][0].message)
          : message.error(errorResponse);
      }
    }
  }, [serviceStatus]);

  return {
    variableTypeOptions: options
  };
};

const useLanguageTypeSelection = (data: any[]) => {
  let languageData: any[] = data?.map((item) => {
    return {
      label: item.label,
      value: Number(item.value)
    };
  });
  return languageData;
};

const useEnvironmentSelection = () => {
  const [service, serviceStatus] = useLazyGetEnvironmentQuery();
  const [options, setOptions] = useState([]);

  const fetchOptions = () => {
    const serviceData = {
      project: localStorage.getItem('project')
    };
    service(serviceData);
  };

  useEffect(() => {
    fetchOptions();
  }, [service]);

  useEffect(() => {
    if (serviceStatus.isSuccess && serviceStatus?.data?.responseCode === 0) {
      const tempOptions = (serviceStatus.data.response.data.results || []).map((envItem: any) => ({
        environment_id: envItem.environment_id,
        environment_name: envItem.name,
        environment_status: envItem.status
      }));
      setOptions(tempOptions);
    }
  }, [serviceStatus]);

  return { options, reloadOptions: fetchOptions };
};

export {
  useFolderSelection,
  useTemplateSelection,
  useAutoCompleteSelection,
  useActionSelection,
  useGetProjectSelection,
  useSettingProjectSelection,
  useVariableTypeSelection,
  useLanguageTypeSelection,
  useTemplateFolderSelection,
  useEnvironmentSelection
};
