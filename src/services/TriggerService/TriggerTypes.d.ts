// trigger service request
// type: request
// method: POST
// path: /trigger_service_v1/
export interface TriggerRequest {
  setting_id: string;
  globalData?: {
    [key: string]: string;
  };
  recipientList: RecipientList[];
  attachments?: any[];
}
export interface RecipientList {
  action_name: string;
  to: string[];
  cc?: any[];
  bcc?: any[];
  data: Data;
}
