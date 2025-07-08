import { message } from 'antd';
import type { CascaderProps, DefaultOptionType } from 'antd/lib/cascader';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/App.hook';
import { useLazyGetVariablesForEditorQuery } from '../services/variables/Variable';

const useVariables = () => {
  const [variable, setVariable] = useState<string[]>([]);
  const [cascader, setCascader] = useState<CascaderProps<DefaultOptionType>['options']>([]);
  const [serviceGetVariables, serviceGetVariableStatus] = useLazyGetVariablesForEditorQuery();
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  useEffect(() => {
    serviceGetVariables({
      project: project
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      serviceGetVariableStatus &&
      serviceGetVariableStatus.isSuccess &&
      serviceGetVariableStatus.data.responseCode === 0
    ) {
      //TODO: inform backend to send the exact same response as ListVariable and remove <any> from here
      const results: any = serviceGetVariableStatus.data.response.data;
      const variables = results.map((variable: any) => {
        return variable.variable_name;
      });
      setVariable(variables);
      const cascader = results.map((variable: any) => {
        return {
          value: `\${{${variable.variable_name}}}`,
          label: variable.variable_name,
          children: []
        };
      });
      setCascader(cascader);
    } else {
      const error = (serviceGetVariableStatus?.error as any)?.data;
      if (error) {
        const errorResponse = error?.response?.errors ? error?.response?.errors : error.detail;
        const errorMessage = error[Object.keys(error)[0]][0].message
          ? error[Object.keys(error)[0]][0].message
          : errorResponse;
        message.error('Variable editor url response : ' + errorMessage);
      }
    }
  }, [serviceGetVariableStatus]);

  return {
    variable,
    cascader
  };
};

export { useVariables };
