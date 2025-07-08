import { MailService } from '../Services';
import { MailApiResponse } from '../Service';
import {
  AddTemplateErrorResponse,
  AddTemplateRequest,
  AddTemplateResponse,
  getTemplateRequest,
  GetTemplateResponse,
  ListTemplatesResponse,
  UpdateTemplateRequest,
  ChangeStatus,
  TemplateMaster,
  MoveTemplate,
  MoveAllTemplate,
  ListRequest,
  DeleteTemplate,
  DeleteBulk,
  ExportTemplate
} from './TemplatesTypes';
import { Folder } from '../folder/FolderTypes';
const templates = MailService.enhanceEndpoints({ addTagTypes: ['templates', 'folders'] }).injectEndpoints({
  endpoints: (build) => ({
    getTemplateList: build.query<MailApiResponse<ListTemplatesResponse>, ListRequest>({
      query: (param) => {
        return {
          url: '/template/?ordering=-template',
          params: param
        };
      },
      providesTags: ['templates']
    }),

    getTemplateFolderList: build.query<MailApiResponse<ListTemplatesResponse>, ListRequest>({
      query: (param) => {
        return {
          url: '/template/folder/?',
          params: param
        };
      },
      providesTags: ['templates']
    }),

    getTemplateListForMapping: build.query<
      MailApiResponse<any>,
      { folder_id: number | string; language_id: number | string }
    >({
      query: ({ folder_id, language_id }) => {
        return {
          url: `/template_for_mapping/?nolimit=Y&folder=${folder_id}&language=${language_id}`
        };
      },
      providesTags: ['templates']
    }),
    getAutoCompleteData: build.query<
      MailApiResponse<any>,
      { search_string: string; folder_id?: number | string; language_id: number | string }
    >({
      query: ({ search_string, folder_id, language_id }) => {
        let requiredUrl: string = `/autocomplete/template/?search=${search_string}`;
        if (language_id !== '' && language_id !== undefined) {
          requiredUrl += `&language=${language_id}`;
        }
        if (folder_id !== '' && folder_id !== undefined) {
          requiredUrl += `&folder=${folder_id}`;
        }
        return {
          url: requiredUrl
        };
      },
      providesTags: ['templates']
    }),
    getTemplate: build.query<MailApiResponse<GetTemplateResponse>, getTemplateRequest>({
      query: ({ template_id, folder }) => `/template/${template_id}/?folder=${folder}`
    }),
    addTemplate: build.mutation<MailApiResponse<AddTemplateResponse, AddTemplateErrorResponse>, AddTemplateRequest>({
      query: (body) => ({
        url: '/template/',
        method: 'POST',
        body: body
      })
    }),
    updateTemplate: build.mutation<MailApiResponse<undefined>, UpdateTemplateRequest>({
      query: ({ template, template_id, folder }) => ({
        url: `/template/${template_id}/?folder=${folder}`,
        method: 'PUT',
        body: { template }
      }),
      invalidatesTags: ['templates']
    }),
    changeTemplateStatus: build.mutation<MailApiResponse<any>, ChangeStatus>({
      query: (changeStatus) => {
        return { method: 'PUT', url: 'template/status/', body: changeStatus };
      },
      invalidatesTags: ['templates']
    }),
    deleteTemplate: build.mutation<MailApiResponse<any>, DeleteTemplate>({
      query: ({ template_id, params }) => {
        return { method: 'DELETE', url: `template/${template_id}/`, params: params };
      },
      invalidatesTags: ['templates']
    }),
    getTemplateMaster: build.query<MailApiResponse<TemplateMaster>, {}>({
      query: () => `/template/masterInfo/`,
      providesTags: ['templates']
    }),
    moveTemplate: build.mutation<MailApiResponse<Folder>, MoveTemplate>({
      query: (file) => ({
        url: `/template/move/`,
        method: 'POST',
        body: { folder_info: file }
      }),
      invalidatesTags: ['templates', 'folders']
    }),
    moveAllTemplate: build.mutation<any, MoveAllTemplate>({
      query: (body) => ({
        url: `/template/move/`,
        method: 'POST',
        body: { folder_info: body }
      })
    }),
    exportTemplate: build.query<MailApiResponse<{ template_content_value: string }>, ExportTemplate>({
      query: (id) => ({ method: 'POST', url: '/template/export/', body: id })
    }),
    deleteBulk: build.mutation<null, DeleteBulk>({
      query: ({ body, params }) => ({ url: '/template/delete_bulk/', method: 'POST', body: body, params: params }),
      invalidatesTags: ['templates']
    })
  }),
  overrideExisting: true
});

export const {
  useGetTemplateListQuery,
  useGetTemplateFolderListQuery,
  useLazyGetTemplateFolderListQuery,
  useLazyGetTemplateListQuery,
  useAddTemplateMutation,
  useUpdateTemplateMutation,
  useLazyGetTemplateQuery,
  useChangeTemplateStatusMutation,
  useDeleteTemplateMutation,
  useGetTemplateMasterQuery,
  useLazyGetAutoCompleteDataQuery,
  useMoveTemplateMutation,
  useLazyExportTemplateQuery,
  useLazyGetTemplateListForMappingQuery,
  useDeleteBulkMutation,
  useMoveAllTemplateMutation,
  endpoints: { getTemplate, getTemplateList, getTemplateMaster }
} = templates;
