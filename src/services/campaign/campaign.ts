import type { MailApiResponse } from '../Service';
import { MailService } from '../Services';

const service = MailService.enhanceEndpoints({ addTagTypes: ['campaign'] }).injectEndpoints({
  endpoints: (build) => ({
    getCampaignMasterInfo: build.query<MailApiResponse<any>, { project: any }>({
      query: ({ project }) => {
        return {
          url: `/campaign/masterInfo/?project=${project}`
        };
      }
    }),
    getTemplateForCampaign: build.query<MailApiResponse<any>, { folderId: any }>({
      query: ({ folderId }) => {
        return {
          url: `/template/?nolimit=Y&ordering=-template&folder=${folderId}`
        };
      }
    }),
    addCampaign: build.mutation<MailApiResponse<any>, any>({
      query: (groupInfo) => ({
        url: '/campaign/',
        method: 'POST',
        body: groupInfo
      }),
      invalidatesTags: ['campaign']
    }),
    getCampaignList: build.query<MailApiResponse<any>, any>({
      query: (param) => ({ url: '/campaign/?', method: 'GET', params: param }),
      providesTags: ['campaign']
    }),
    getCampaignView: build.query<MailApiResponse<any>, any>({
      query: ({ id, project }) => ({ url: `/campaign/${id}/?&project=${project}`, method: 'GET' }),
      providesTags: ['campaign']
    }),
    getUniqueOpens:build.query<MailApiResponse<any>, any>({
      query: ({id,project,page,page_size}) => ({ url: `/campaign/${id}/opens/?&project=${project}&open_details=unique&page=${page}&page_size=${page_size}`, method: 'GET' }),
      providesTags: ['campaign']
    }),
    getUniqueClicks:build.query<MailApiResponse<any>, any>({
      query: ({id,project,page,page_size}) => ({ url: `/campaign/${id}/clicks/?&project=${project}&click_details=unique&page=${page}&page_size=${page_size}`, method: 'GET' }),
      providesTags: ['campaign']
    }),
    deleteCampaign: build.mutation<MailApiResponse<undefined>, any>({
      query: ({ id, project }) => ({
        url: `/campaign/${id}/?&project=${project}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['campaign']
    }),
  }),
  overrideExisting: true
});

export const {
  useLazyGetCampaignMasterInfoQuery,
  useLazyGetTemplateForCampaignQuery,
  useAddCampaignMutation,
  useLazyGetCampaignListQuery,
  useLazyGetCampaignViewQuery,
  useLazyGetUniqueOpensQuery,
  useLazyGetUniqueClicksQuery,
  useDeleteCampaignMutation
} = service;
