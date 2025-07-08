import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import {
  AddSettingErrorResponse,
  AddSettingRequest,
  AddSettingResponse,
  GetOneSettingRequest,
  GetOneSettingResponse,
  ListSettingResponse,
  UpdateSettingErrorResponse,
  UpdateSettingRequest,
  UpdateSettingResponse,
  GetSettingsRequest,
  GetMaster,
  Result
} from './SettingTypes';

const service = MailService.enhanceEndpoints({ addTagTypes: ['setting'] }).injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query<MailApiResponse<ListSettingResponse | Result[]>, GetSettingsRequest>({
      query: (param) => ({ method: 'GET', url: `/setting/?ordering=-setting&nolimit=Y`, params: param }),
      providesTags: ['setting']
    }),
    getSetting: build.query<MailApiResponse<GetOneSettingResponse>, GetOneSettingRequest>({
      query: ({ setting_id, project_id }) => `/setting/${setting_id}/?project=${project_id}`
    }),
    addSetting: build.mutation<MailApiResponse<AddSettingResponse, AddSettingErrorResponse>, AddSettingRequest>({
      query: (data) => {
        return {
          method: 'POST',
          url: `/setting/?project=${localStorage.getItem('project')}`,
          body: data
        };
      },
      invalidatesTags: ['setting']
    }),
    sendTestSetting: build.mutation<MailApiResponse<AddSettingResponse, AddSettingErrorResponse>, AddSettingRequest>({
      query: (data) => {
        return {
          method: 'POST',
          url: `/setting/send_test_mail/`,
          body: data
        };
      },
      invalidatesTags: ['setting']
    }),
    updateSetting: build.mutation<
      MailApiResponse<UpdateSettingResponse, UpdateSettingErrorResponse>,
      UpdateSettingRequest
    >({
      query: ({ setting_id, setting, project_id }) => {
        return {
          method: 'PUT',
          url: `/setting/${setting_id}/?project=${project_id}`,
          body: { setting }
        };
      },
      invalidatesTags: ['setting']
    }),
    deleteSetting: build.mutation<null, { setting_id: string }>({
      query: ({ setting_id }) => {
        return {
          method: 'DELETE',
          url: `/setting/${setting_id}/`
        };
      },
      invalidatesTags: ['setting']
    }),
    getSettingMasterInfo: build.query<MailApiResponse<GetMaster>, {}>({
      query: () => '/setting/masterInfo/',
      providesTags: ['setting']
    }),
    changeStatus: build.mutation<MailApiResponse<any>, { setting_id: number; status: number }>({
      query: (body) => ({ url: 'setting/status/', method: 'PUT', body: body }),
      invalidatesTags: ['setting']
    })
  }),
  overrideExisting: true
});

export const {
  useLazyGetSettingsQuery,
  useGetSettingsQuery,
  useAddSettingMutation,
  useLazyGetSettingQuery,
  useUpdateSettingMutation,
  useDeleteSettingMutation,
  useGetSettingMasterInfoQuery,
  useSendTestSettingMutation,
  useLazyGetSettingMasterInfoQuery,
  useChangeStatusMutation,
  endpoints: SettingEndpoints
} = service;
