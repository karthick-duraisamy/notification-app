import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import { TemplateMasterInfo } from './templateMasterInfo';

const masterInfo = MailService.enhanceEndpoints({ addTagTypes: ['templates', 'folders'] }).injectEndpoints({
  endpoints: (build) => ({
    getTemplateMasterInfo: build.query<MailApiResponse<TemplateMasterInfo>, null>({
      query: () => ({
        url: '/template/masterInfo/',
      }),
    }),
  }),
});

export const {
  useLazyGetTemplateMasterInfoQuery,
  endpoints: { getTemplateMasterInfo },
} = masterInfo;
