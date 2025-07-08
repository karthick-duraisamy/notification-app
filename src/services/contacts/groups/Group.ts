import { MailApiResponse } from '../../Service';
import { MailService } from '../../Services';
import {
  CreateGroupBasicInfo,
  DeleteContactGroup,
  GetContactGroup,
  updateContactGroup,
  UpdateContactStatus,
  UpdateGroupContact,
  UpdateTopic
} from './GroupTypes';

const service = MailService.enhanceEndpoints({ addTagTypes: ['contactgroup'] }).injectEndpoints({
  endpoints: (build) => ({
    getContactGroupMaster: build.query<MailApiResponse<any>, { project: any }>({
      query: ({ project }) => {
        return {
          url: `/contactGroup/masterInfo/?project=${project}`
        };
      }
    }),
    getDetailFields: build.query<MailApiResponse<any>, { project: any }>({
      query: ({ project }) => {
        return {
          url: `/contactFields/?project=${project}`
        };
      }
    }),
    getGroupsList: build.query<MailApiResponse<any>, any>({
      query: (param) => ({ url: '/contactGroup/?', method: 'GET', params: param }),
      providesTags: ['contactgroup']
    }),
    addContactsGroup: build.mutation<MailApiResponse<any>, FormData | CreateGroupBasicInfo>({
      query: (groupInfo) => ({
        url: '/contactGroup/',
        method: 'POST',
        body: groupInfo
      }),
      invalidatesTags: ['contactgroup']
    }),
    getContactGroup: build.mutation<MailApiResponse<any>, GetContactGroup>({
      query: ({ id, project }) => `/contactGroup/${id}/?project=${project}`
    }),
    updateContactsGroup: build.mutation<MailApiResponse<undefined>, UpdateGroupContact>({
      query: ({ groupId, contactGroup, project_id }) => ({
        url: `/contactGroup/${groupId}/?project=${project_id}`,
        method: 'PUT',
        body: { contactGroup }
      }),
      invalidatesTags: ['contactgroup']
    }),
    deleteContactGroup: build.mutation<MailApiResponse<undefined>, DeleteContactGroup>({
      query: ({ id, project }) => ({
        url: `/contactGroup/${id}/?&project=${project}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['contactgroup']
    }),
    deleteContactGroupConcern: build.mutation<MailApiResponse<undefined>, DeleteContactGroup>({
      query: ({ id, project }) => ({
        url: `/contactGroup/${id}/?all_delete=yes&project=${project}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['contactgroup']
    }),
    updateContactGroup: build.mutation<MailApiResponse<undefined>, updateContactGroup>({
      query: ({ id, contactGroup }) => ({
        url: `/contactGroup/${id}/`,
        method: 'PUT',
        body: contactGroup
      }),
      invalidatesTags: ['contactgroup']
    }),
    getContactList: build.query<MailApiResponse<any>, any>({
      query: (param) => ({ url: '/contact/?', method: 'GET', params: param }),
      providesTags: ['contactgroup']
    }),
    deleteContact: build.mutation<MailApiResponse<undefined>, DeleteContactGroup>({
      query: ({ id }) => ({
        url: `/contact/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['contactgroup']
    }),
    updateContactDetailGroup: build.mutation<MailApiResponse<undefined>, updateContactGroup>({
      query: ({ id, contactGroup }) => ({
        url: `/contact/${id}/`,
        method: 'PUT',
        body: contactGroup
      }),
      invalidatesTags: ['contactgroup']
    }),
    updateGroupStatus: build.mutation<MailApiResponse<undefined>, UpdateContactStatus>({
      query: ({ id, contactGroup }) => ({
        url: `/contactGroup/status/${id}/`,
        method: 'PUT',
        body: contactGroup
      }),
      invalidatesTags: ['contactgroup']
    }),
    updateGroupIdContacts: build.mutation<MailApiResponse<any>, FormData | CreateGroupBasicInfo>({
      query: (groupInfo) => ({
        url: '/contact/',
        method: 'POST',
        body: groupInfo
      }),
      invalidatesTags: ['contactgroup']
    }),
    addTopic: build.mutation<MailApiResponse<undefined>, any>({
      query: (body) => ({
        url: `/topic/`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['contactgroup']
    }),
    updateTopic: build.mutation<MailApiResponse<undefined>, UpdateTopic>({
      query: ({ id, contactGroup }) => ({
        url: `/topic/${id}/`,
        method: 'PUT',
        body: contactGroup
      }),
      invalidatesTags: ['contactgroup']
    }),
    getcontactUploadHistory: build.query<MailApiResponse<any>, any>({
      query: (param) => ({ url: 'contactUploadHistory/?', method: 'Get', params: param }),
      providesTags: ['contactgroup']
    }),
    addField: build.mutation<MailApiResponse<undefined>, any>({
      query: (body) => ({
        url: `/contactFields/`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['contactgroup']
    }),
    updateField: build.mutation<MailApiResponse<undefined>, any>({
      query: ({ id, contactGroup }) => ({
        url: `/contactFields/${id}/`,
        method: 'PUT',
        body: contactGroup
      }),
      invalidatesTags: ['contactgroup']
    }),
    getSummary: build.query<MailApiResponse<any>, any>({
      query: ({ project, date }) => ({
        url: `/contact/summery/?project=${project}&filter_type=${date}`,
        method: 'GET'
      }),
      providesTags: ['contactgroup']
    })
  }),

  overrideExisting: true
});

export const {
  useLazyGetContactGroupMasterQuery,
  useLazyGetDetailFieldsQuery,
  useLazyGetGroupsListQuery,
  useLazyGetContactListQuery,
  useAddContactsGroupMutation,
  useUpdateContactsGroupMutation,
  useGetContactGroupMutation,
  useDeleteContactGroupMutation,
  useDeleteContactGroupConcernMutation,
  useUpdateContactGroupMutation,
  useDeleteContactMutation,
  useUpdateContactDetailGroupMutation,
  useUpdateGroupStatusMutation,
  useUpdateGroupIdContactsMutation,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useLazyGetcontactUploadHistoryQuery,
  useAddFieldMutation,
  useUpdateFieldMutation,
  useLazyGetSummaryQuery
} = service;
