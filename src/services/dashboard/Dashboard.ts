import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import { ListRequest } from './DashboardTypes';
const dashboard = MailService.enhanceEndpoints({ addTagTypes: ['dashboard'] }).injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query<MailApiResponse<any>, ListRequest>({
      query: (param) => ({ url: '/dashboard/', params: param }),
      providesTags: ['dashboard']
    })
  }),
  overrideExisting: true
});

export const { useLazyGetDashboardQuery } = dashboard;
