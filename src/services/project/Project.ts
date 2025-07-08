import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import {
  AddProjectErrorResponse,
  AddProjectRequest,
  AddProjectResponse,
  GetOneProjectRequest,
  GetOneProjectResponse,
  ListProjectResponse,
  UpdateProjectErrorRespose,
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateStatus,
  GetMaster,
  GetProjectsRequest,
  DeleteProject
} from './ProjectTypes';

const service = MailService.enhanceEndpoints({ addTagTypes: ['project'] }).injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<MailApiResponse<ListProjectResponse>, GetProjectsRequest>({
      query: (param) => ({ url: '/project/?ordering=-project&', method: 'GET', params: param }),
      providesTags: ['project'] // register it as a tag type, later used to invalidate cache
    }),
    getProject: build.query<MailApiResponse<GetOneProjectResponse>, GetOneProjectRequest>({
      query: ({ project_id }) => `/project/${project_id}/`
    }),
    getProjectAction: build.query<MailApiResponse<any>, GetOneProjectRequest>({
      query: ({ project_id }) => `/project_action/?project=${project_id}&nolimit=Y`
    }),
    addProject: build.mutation<MailApiResponse<AddProjectResponse, AddProjectErrorResponse>, AddProjectRequest>({
      query: (data) => {
        return {
          method: 'POST',
          url: '/project/',
          body: data
        };
      },
      invalidatesTags: ['project'] // automatically invalidate the tag cache, refetches the list page
    }),
    updateProject: build.mutation<
      MailApiResponse<UpdateProjectResponse, UpdateProjectErrorRespose>,
      UpdateProjectRequest
    >({
      query: ({ project_id, project }) => {
        return {
          method: 'PUT',
          url: `/project/${project_id}/`,
          body: { project }
        };
      },
      invalidatesTags: ['project']
    }),

    deleteProject: build.mutation<MailApiResponse<undefined>, DeleteProject>({
      query: ({ id }) => ({
        url: `/project/${id}/?target=all`,
        method: 'DELETE'
      }),
      invalidatesTags: ['project']
    }),
    getActionAutoComplete: build.query<MailApiResponse<undefined>, { searchString: string; project_id: string }>({
      query: ({ searchString, project_id }) => ({
        url: `autocomplete/project/${project_id}/action?search=${searchString}&search_fields=action_name`
      })
    }),
    changeProjectStatus: build.mutation<MailApiResponse<UpdateStatus>, UpdateStatus>({
      query: (body) => ({
        method: 'PUT',
        url: '/project/status/',
        body: body
      }),
      invalidatesTags: ['project']
    }),
    getProjectMasterInfo: build.query<MailApiResponse<GetMaster>, {}>({
      query: () => '/project/masterInfo/',
      providesTags: ['project']
    }),
    getProjectData: build.query<MailApiResponse<any>, {}>({
      query: () => '/project/?nolimit=Y',
      providesTags: ['project']
    })
  }),
  overrideExisting: true
});

export const {
  useLazyGetProjectsQuery,
  useGetProjectsQuery,
  useAddProjectMutation,
  useLazyGetProjectActionQuery,
  useLazyGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useLazyGetActionAutoCompleteQuery,
  useChangeProjectStatusMutation,
  useGetProjectMasterInfoQuery,
  useLazyGetProjectDataQuery,
  useGetProjectMasterInfoQuery: ProjectGetMasterInfoQuery,
  endpoints: ProjectEndpoints
} = service;
