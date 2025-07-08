import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import {
  ListTrackingResponse,
  MasterInfo,
  Result,
  ResendResponse,
  PreviewRequest,
  EditResendRequest,
  EditResendResponse,
  ListTrackingRequest,
  SendTestMail,
  PreviewDataRequest
} from './TrackingTypes';

const service = MailService.enhanceEndpoints({ addTagTypes: ['tracking'] }).injectEndpoints({
  endpoints: (build) => ({
    getTrackingList: build.query<MailApiResponse<ListTrackingResponse>, ListTrackingRequest>({
      query: (param) => {
        let requiredUrl: string = `/tracking${param?.trackingModule ? `-` + param?.trackingModule : ``}/?${sessionStorage.getItem('iframe_token') ? '' : `project=${param.project}&`}ordering=-tracking&`;
        if (param?.api_request) requiredUrl += `api_request=${param.api_request}&`;
        if (param?.setting_id) requiredUrl += `setting_id=${param.setting_id}&`;
        if (param?.template_name) requiredUrl += `template_name=${param.template_name}&`;
        if (param?.language) requiredUrl += `language_code=${param.language}&`;
        if (param?.action_name) requiredUrl += `action_name=${param.action_name}&`;
        if (param?.trackingModule && param?.search_fields?.includes('to')) requiredUrl += `to=${param.searchMailId}&`;
        if (param?.trackingModule && param?.search_fields?.includes('cc')) requiredUrl += `cc=${param.searchMailId}&`;
        if (param?.trackingModule && param?.search_fields?.includes('bcc')) requiredUrl += `bcc=${param.searchMailId}&`;
        if (param.page) requiredUrl += `page=${param.page}&`;
        if (param.environment) requiredUrl += `environment=${param.environment}&`;
        if (param.apiResponseId) requiredUrl += `api_response_id=${param.apiResponseId}&`;
        if (param.settingType) requiredUrl += `setting_type=${param.settingType}&`;
        if (param.type) requiredUrl += `type=${param.type}&`;
        if (param.status) requiredUrl += `status=${param.status}&`;
        if (param.searchSubject && param.searchSubject !== '') requiredUrl += `subject=${param.searchSubject}`;
        if (param.searchMailId && param.searchMailId !== '') requiredUrl += `&search=${param.searchMailId}`;
        if (param.searchMailId && param.searchMailId !== '' && (param as any)?.search_fields?.length === 0)
          requiredUrl += `&search_fields=to`;
        if (param.searchMailId && param.searchMailId !== '' && param.search_fields) {
          for (let i: number = 0; i < (param as any).search_fields?.length; i++) {
            requiredUrl += `&search_fields=${(param as any).search_fields[i]}`;
          }
        }
        if (requiredUrl[requiredUrl.length - 1] !== '&') requiredUrl += `&`;
        if (param?.filter_fields === 1) requiredUrl += `attachments=yes&`;
        if (param?.filter_fields === 2) requiredUrl += `attachments=no&`;
        if (param?.created_at) requiredUrl += `created_at=${param.created_at}&`;
        if (param?.created_start_date && param?.created_end_date)
          requiredUrl += `created_start_date=${param.created_start_date}&created_end_date=${param.created_end_date}`;
        return {
          url: requiredUrl
        };
      },
      providesTags: ['tracking']
    }),
    getTrackingInfo: build.query<MailApiResponse<Result>, PreviewDataRequest>({
      query: (param) => {
        const iframeToken = sessionStorage.getItem('iframe_token');
        const projectParam = iframeToken
          ? `setting_id=${sessionStorage.getItem('setting_id')}&`
          : `project=${param.project}&`;
        return `/tracking${param?.trackingModule ? `-` + param?.trackingModule : ``}/${param.tracking_id}/?${projectParam}`;
      }
    }),
    // getTrackingInfoo: build.query<MailApiResponse<Result>, PreviewDataRequest>({
    //   query: (param) => `/tracking/${param.tracking_id}/?project=${param.project}`
    // }),
    getMasterInfo: build.query<MailApiResponse<MasterInfo>, {}>({
      query: () => '/tracking/masterInfo/',
      providesTags: ['tracking']
    }),
    resendMail: build.mutation<MailApiResponse<ResendResponse>, { tracking_id: number }>({
      query: (id) => ({
        method: 'POST',
        url: `/tracking/resend_email/`,
        body: id
      }),
      invalidatesTags: ['tracking']
    }),
    resendAllMail: build.mutation<MailApiResponse<ResendResponse>, { tracking_ids: any }>({
      query: (id) => ({
        method: 'POST',
        url: `/tracking/resend_email/`,
        body: id
      }),
      invalidatesTags: ['tracking']
    }),
    preview: build.query<
      MailApiResponse<{ template_content_value: string; subject?: string | undefined }>,
      PreviewRequest
    >({
      query: (body) => ({
        method: 'POST',
        url: '/template/preview/',
        body: body
      })
    }),
    editResend: build.mutation<MailApiResponse<EditResendResponse>, EditResendRequest>({
      query: (body) => ({
        method: 'POST',
        url: '/tracking/edit_and_resend/',
        body: body
      }),
      invalidatesTags: ['tracking']
    }),
    sendTestMail: build.mutation<MailApiResponse<EditResendResponse>, SendTestMail>({
      query: (body) => ({
        method: 'POST',
        url: '/template/send_test_mail/',
        body: body
      }),
      invalidatesTags: ['tracking']
    }),
    requestFormat: build.query<
      MailApiResponse<any>,
      { template_content: string; subject?: string | undefined; project?: string | undefined | number }
    >({
      query: (body) => ({
        method: 'POST',
        url: '/template/request_format/',
        body
      })
    })
  }),
  overrideExisting: true
});

export const {
  useGetTrackingListQuery,
  useLazyGetTrackingListQuery,
  useGetTrackingInfoQuery,
  useLazyGetTrackingInfoQuery,
  useLazyGetMasterInfoQuery,
  useResendMailMutation,
  useResendAllMailMutation,
  useLazyPreviewQuery,
  useEditResendMutation,
  useLazyRequestFormatQuery,
  useSendTestMailMutation
} = service;
