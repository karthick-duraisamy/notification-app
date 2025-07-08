import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import { Folder, UpdateFolder, Addfolder, CloneRequest, GetFolder } from './FolderTypes';

const folder = MailService.enhanceEndpoints({ addTagTypes: ['folders', 'templates'] }).injectEndpoints({
  endpoints: (build) => ({
    // getEnvironment: build.query<any, any>({
    //   query: () => ({
    //     url: `/environment/?project=${localStorage.getItem('project')}`,
    //     method: 'GET'
    //   }),
    //   providesTags: ['folders']
    // }),
    getEnvironment: build.query<MailApiResponse<any>, any>({
      query: () => ({
        url: `/environment/?project=${localStorage.getItem('project')}`,
        method: 'GET'
      }),
      providesTags: ['folders']
    }),
    getFolder: build.query<MailApiResponse<any>, GetFolder>({
      query: (param) => ({
        url: `/${param.pathname}/folder/?nolimit=Y&project=${param.project}`,
        method: 'GET'
      }),
      providesTags: ['folders']
    }),
    deleteFolder: build.mutation<null, { folder_id: string; pathname: string }>({
      query: ({ folder_id, pathname }) => {
        return { method: 'DELETE', url: `${pathname}/folder/${folder_id}/` };
      },
      invalidatesTags: ['folders']
    }),
    deleteFolderForcefully: build.mutation<null, any>({
      query: ({ folder_id, pathname }) => {
        return {
          method: 'DELETE',
          url: `${pathname}/folder/${folder_id}/?target=all&project=${localStorage.getItem('project')}`
        };
      },
      invalidatesTags: ['folders']
    }),
    updateFolder: build.mutation<MailApiResponse<Folder>, UpdateFolder>({
      query: ({ folder_id, update_folder, pathname }) => {
        return {
          method: 'PUT',
          url: `${pathname}/folder/${folder_id}/?project=${localStorage.getItem('project')}`,
          body: { update_folder: update_folder }
        };
      },
      invalidatesTags: ['folders']
    }),
    createFolder: build.mutation<MailApiResponse<Folder>, Addfolder>({
      query: ({ add_folder, pathname }) => {
        return {
          method: 'POST',
          url: `${pathname}/folder/?project=${localStorage.getItem('project')}`,
          body: { add_folder: add_folder }
        };
      },
      invalidatesTags: ['folders']
    }),
    cloneFolder: build.mutation<MailApiResponse<Folder>, CloneRequest>({
      query: ({ cloneData, pathname }) => {
        return {
          method: 'POST',
          url: `${pathname}/clone/`,
          body: { folder_info: cloneData }
        };
      },
      invalidatesTags: ['folders', 'templates']
    })
  }),
  overrideExisting: true
});

export const {
  useGetFolderQuery,
  useLazyGetFolderQuery,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useCreateFolderMutation,
  useDeleteFolderForcefullyMutation,
  useCloneFolderMutation,
  useLazyGetEnvironmentQuery,
  endpoints: { getFolder }
} = folder;
