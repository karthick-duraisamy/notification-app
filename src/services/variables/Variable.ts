import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import {
  AddVariable,
  AddVariableErrorResponse,
  ListVariableResponse,
  ListVariablesRequest,
  UpdateVariable,
  MasterInfo,
  UpdateStatus,
  Result,
  GetVariable
} from './VariableTypes';

const service = MailService.enhanceEndpoints({ addTagTypes: ['variables'] }).injectEndpoints({
  endpoints: (build) => ({
    getVariables: build.query<MailApiResponse<ListVariableResponse>, ListVariablesRequest>({
      // query: (param) => ({
      //   url: '/variable/',
      //   params: param
      // }),
      query: (param) => {
        return {
          url: `/variable/?ordering=-variable`,
          params: param
        };
      },
      providesTags: ['variables']
    }),
    addVariables: build.mutation<MailApiResponse<undefined, AddVariableErrorResponse>, AddVariable>({
      query: (param) => {
        return {
          url: `/variable/`,
          method: 'POST',
          body: param.variables
        };
      },
      invalidatesTags: ['variables']
    }),
    getVariablesForEditor: build.query<MailApiResponse<ListVariableResponse>, { project: number | undefined | string }>(
      {
        query: () => ({
          url: `variable_for_mapping/?nolimit=Y&ordering=variable_name&project=${localStorage.getItem('project')}`
        })
      }
    ),
    getVariable: build.query<MailApiResponse<Result>, GetVariable>({
      query: (param) => `/variable/${param.id}/?project=${param.project}`
    }),
    updateVariable: build.mutation<MailApiResponse<undefined>, UpdateVariable>({
      query: ({ id, variable }) => {
        return {
          url: `/variable/${id}/?project=${localStorage.getItem('project')}`,
          method: 'PUT',
          body: { variable }
        };
      },
      invalidatesTags: ['variables']
    }),
    getVariableMasterInfo: build.query<MailApiResponse<MasterInfo>, {}>({
      query: () => '/variable/masterInfo/',
      providesTags: ['variables']
    }),
    updateVariableStatus: build.mutation<MailApiResponse<UpdateStatus>, UpdateStatus>({
      query: (body) => ({ url: '/variable/status/', method: 'PUT', body: body }),
      invalidatesTags: ['variables']
    }),
    deleteVariable: build.mutation<MailApiResponse<null>, number | string>({
      query: (id) => ({
        url: `variable/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['variables']
    })
  }),
  overrideExisting: true
});

export const {
  useGetVariablesQuery,
  useLazyGetVariablesQuery,
  useAddVariablesMutation,
  useUpdateVariableMutation,
  useLazyGetVariableMasterInfoQuery,
  useGetVariableMasterInfoQuery,
  useUpdateVariableStatusMutation,
  useDeleteVariableMutation,
  useLazyGetVariableQuery,
  useLazyGetVariablesForEditorQuery
} = service;
