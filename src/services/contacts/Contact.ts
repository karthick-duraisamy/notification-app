import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import {
  AddContact,
  DeleteContact,
  GetContact,
  GetContactResponse,
  ListContactResponse,
  UpdateContact,
  GetMaster,
  GetContactsRequest
} from './ContactTypes';

const service = MailService.enhanceEndpoints({ addTagTypes: ['contacts'] }).injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query<MailApiResponse<ListContactResponse>, GetContactsRequest>({
      query: (param) => ({ url: '/contact/?', method: 'GET', params: param }),
      providesTags: ['contacts']
    }),
    addContacts: build.mutation<MailApiResponse<undefined>, AddContact>({
      query: ({ contact }) => ({
        url: '/contact/',
        method: 'POST',
        body: { contact }
      }),
      invalidatesTags: ['contacts']
    }),
    deleteContact: build.mutation<MailApiResponse<undefined>, DeleteContact>({
      query: ({ id, project }) => ({
        url: `/contact/${id}/?project=${project}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['contacts']
    }),
    getContact: build.mutation<MailApiResponse<GetContactResponse>, GetContact>({
      query: ({ id, project }) => `/contact/${id}/?project=${project}`
    }),
    updateContact: build.mutation<MailApiResponse<undefined>, UpdateContact>({
      query: ({ id, contact, project }) => ({
        url: `/contact/${id}/?project=${project}`,
        method: 'PUT',
        body: { contact }
      }),
      invalidatesTags: ['contacts']
    }),
    getMasterInfo: build.query<MailApiResponse<GetMaster>, {}>({
      query: () => '/contact/masterInfo/',
      providesTags: ['contacts']
    }),
    getAllContacts: build.query<MailApiResponse<GetContactResponse>, {param:any }>({
      query: ({ param }) => ({
        url: '/contact/?',
        method: 'GET',
        params: param 
      }),
      providesTags: ['contacts']
    }),
    bulkDelete: build.mutation<MailApiResponse<undefined>, { param: any }>({
      query: ({ param }) => ({
        url: '/contact/bulk-delete/',
        method: 'POST',
        body: param 
      }),
      invalidatesTags: ['contacts']
    }),
  }),
  overrideExisting: true
});

export const {
  useGetContactsQuery,
  useLazyGetContactsQuery,
  useAddContactsMutation,
  useDeleteContactMutation,
  useGetContactMutation,
  useUpdateContactMutation,
  useGetMasterInfoQuery,
  useLazyGetAllContactsQuery,
  useBulkDeleteMutation
} = service;
