import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import {
  ListMailerResponse,
  DeleteMailer,
  AddMailerRequest,
  GetMailerResponse,
  MasterInfo,
  UpdateMailerRequest,
  GetMailerRequest
} from './MailerTypes';

const service = MailService.enhanceEndpoints({ addTagTypes: ['mailer'] }).injectEndpoints({
  endpoints: (build) => ({
    getMailerMaster: build.query<MailApiResponse<MasterInfo>, { project: any }>({
      query: ({ project }) => {
        return {
          url: `/mailer/masterInfo/?project=${project}`
        };
      }
    }),
    getMailerList: build.query<MailApiResponse<ListMailerResponse>, GetMailerRequest>({
      query: (param) => ({ url: '/mailer/?ordering=-mailer', params: param }),
      providesTags: ['mailer']
    }),
    // Remove the following code when mailer folder filter working fine.
    // getMailerLists: build.query<
    //   MailApiResponse<ListMailerResponse>,
    //   { param: GetMailerRequest; additionalParam?: string }
    // >({
    //   query: ({ param, additionalParam }) => ({
    //     url: additionalParam ? `/mailer/folder/${additionalParam}/` : '/mailer/',
    //     params: param
    //   }),
    //   providesTags: ['mailer']
    // }),
    addMailer: build.mutation<MailApiResponse<undefined>, AddMailerRequest>({
      query: (body) => ({
        url: `/mailer/?project=${localStorage.getItem('project')}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['mailer']
    }),
    addEnvironment: build.mutation<MailApiResponse<undefined>, any>({
      query: (body) => ({
        url: `/environment/?project=${localStorage.getItem('project')}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['mailer']
    }),
    deleteEnvironment: build.mutation<MailApiResponse<undefined>, any>({
      query: ({ id, project }) => ({
        method: 'DELETE',
        url: `/environment/${id}/?project=${project}`
      }),
      invalidatesTags: ['mailer']
    }),
    updateEnvironment: build.mutation<MailApiResponse<undefined>, any>({
      query: ({ enviroinmentId, environment }) => ({
        url: `/environment/${enviroinmentId}/?project=${localStorage.getItem('project')}`,
        method: 'PUT',
        body: { environment }
      }),
      invalidatesTags: ['mailer']
    }),
    updateMailer: build.mutation<MailApiResponse<undefined>, UpdateMailerRequest>({
      query: ({ id, project, mailer }) => ({
        url: `/mailer/${id}/?project=${project}`,
        method: 'PUT',
        body: { mailer }
      }),
      invalidatesTags: ['mailer']
    }),
    getMailer: build.query<
      MailApiResponse<GetMailerResponse>,
      { id: string | number; project: string | number | undefined }
    >({
      query: ({ id, project }) => `/mailer/${id}/?project=${project}`
    }),
    deleteMailer: build.mutation<MailApiResponse<undefined>, DeleteMailer>({
      query: ({ id, force_delete, project }) => ({
        method: 'DELETE',
        url: `/mailer/${id}/?project=${project}&${force_delete ? 'target=all' : ''}`
      }),
      invalidatesTags: ['mailer']
    }),
    updateStatus: build.mutation<any, any>({
      query: (body) => ({ method: 'PUT', url: '/mailer/status/', body: body }),
      invalidatesTags: ['mailer']
    })
  }),
  overrideExisting: true
});

export const {
  useGetMailerMasterQuery,
  useGetMailerListQuery,
  useLazyGetMailerListQuery,
  useDeleteMailerMutation,
  useUpdateStatusMutation,
  useAddMailerMutation,
  useAddEnvironmentMutation,
  useDeleteEnvironmentMutation,
  useLazyGetMailerQuery,
  useUpdateMailerMutation,
  useUpdateEnvironmentMutation,
  useLazyGetMailerMasterQuery
} = service;
