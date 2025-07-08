import { CommonService } from '../Services';
import { RouterResponse, MenuInterface, MenuServiceInterface } from './initializerTypes';
export interface menuRequest {
  url: string;
}
const service = CommonService.enhanceEndpoints({}).injectEndpoints({
  endpoints: (build) => ({
    getRoutes: build.mutation<RouterResponse[], {}>({
      query: () => 'locales/dummy_data/routes.json'
    }),
    getLandingRoutes: build.mutation<RouterResponse[], {}>({
      query: () => 'locales/dummy_data/landing_routes.json'
    }),
    getMenus: build.mutation<MenuInterface[], {}>({
      query: () => 'locales/dummy_data/menu.json'
    }),
    getMenuService: build.mutation<MenuServiceInterface[], menuRequest>({
      query: (param) => {
        return {
          url: param.url
        };
      }
    }),
    getDownloadInfo: build.mutation<MenuServiceInterface[], menuRequest>({
      query: (param) => {
        return {
          url: param.url
        };
      }
    }),
    AIService: build.mutation<any[], any>({
      query: (body) => ({
        url: 'https://primary-production-b7b9.up.railway.app/webhook/ai/',
        method: 'POST',
        body
      })
    })
  }),
  overrideExisting: true
});

export const {
  useGetRoutesMutation,
  useGetLandingRoutesMutation,
  useGetMenusMutation,
  useGetMenuServiceMutation,
  useGetDownloadInfoMutation,
  useAIServiceMutation
} = service;
