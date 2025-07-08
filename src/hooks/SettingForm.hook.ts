import { useEffect, useState } from 'react';
import { useLazyGetSettingsQuery } from '../services/setting/Setting';
import { useAppSelector } from '../hooks/App.hook';
import type { ListSettingResponse, Result } from '../services/setting/SettingTypes';
import type { Options } from './VariablesForm.hook';

const useSettingSelect = () => {
  const { project } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const [options, setOptions] = useState<any>({
    options:[],
    optionDetails:[]
  });
  const [service, serviceStatus] = useLazyGetSettingsQuery();
  useEffect(() => {
    service({
      project: sessionStorage.getItem('project_id')
        ? sessionStorage.getItem('project_id')
        : project
        ? project
        : localStorage.getItem('project')
    });
  }, [service]);

  useEffect(() => {
    if (serviceStatus.isSuccess && serviceStatus.data.responseCode === 0) {
      let tmp: Options[] = [];
      let settingData: ListSettingResponse | Result[] = (serviceStatus?.data?.response?.data as ListSettingResponse)
        .results
        ? (serviceStatus?.data?.response?.data as ListSettingResponse).results
        : serviceStatus?.data?.response?.data;
      (settingData as any).map((setting: any) => {
        tmp.push({ label: setting.setting_name, id: setting.setting_id });
        return true;
      });
      setOptions((prev:any) => ({
        ...prev,
        options: tmp,
        optionDetails: settingData

      }));
    } else if (serviceStatus?.data?.responseCode === 1) {
    }
  }, [serviceStatus]);

  return {
    options
  };
};

export { useSettingSelect };
