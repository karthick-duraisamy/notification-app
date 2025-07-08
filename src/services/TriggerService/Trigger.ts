import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import { TriggerRequest } from './TriggerTypes';

const service = MailService.enhanceEndpoints({ addTagTypes: ['triggerService'] }).injectEndpoints({
  endpoints: (build) => ({
    triggerMail: build.mutation<MailApiResponse<undefined>, TriggerRequest>({
      query: (body) => ({
        url: '/trigger_service_v1/',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useTriggerMailMutation } = service;
