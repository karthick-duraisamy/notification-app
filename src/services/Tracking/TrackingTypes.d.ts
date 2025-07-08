export interface ListTrackingResponse {
  links: Links;
  count: number;
  results: Result[];
}

export interface Links {
  next: null;
  previous: null;
}

export interface Result {
  api_request_id: number;
  setting_id: number;
  setting_name?: string;
  setting?: string;
  created_by: string;
  tracking_id: number;
  template_info: TemplateInfo;
  subject: string;
  to: string;
  bcc: string;
  cc: string;
  status_name: string;
  status: number;
  created_at: string;
  last_attempt: string;
  resend_request_id: number;
  masterInfo?: MasterInfo;
  attachments?: any;
  notification_type?: string | undefined;
  api_response_id?: string | undefined | null;
  remarks?: string | undefined | null;
}

export interface MasterInfo {
  status: Status[];
  notification_type?: Status[];
  setting_type?: Status[];
}

export interface Status {
  value: number;
  label: string;
}

export interface TemplateInfo {
  template_id: number;
  template_name: string;
  template_data?: string;
  template_content?: string;
  request_format?: any;
  request_format_value?: any;
  template_content_value?: string;
}

export interface ResendResponse {
  message: string;
  status: number;
}

export interface PreviewRequest {
  template_content: string;
  request_format_value: any;
  subject: string;
  project: string | number | null;
  setting_id?: number | undefined;
}

export interface EditResendRequest {
  tracking_id: number;
  subject: string;
  to: string[];
  cc: string[];
  bcc: string[];
  request_format_value: any;
  setting_id: number;
  phone_number?: number | string;
}

export interface SendTestMail extends Omit<EditResendRequest, 'tracking_id'> {
  setting_id: number;
  subject: string;
  to: string[];
  cc: string[];
  bcc: string[];
  request_format_value: any;
  template_content: string;
  project: string | number | null;
  phone_number: string | number | undefined;
}
export interface EditResendResponse {
  message: string;
  status: number;
}
export interface ListTrackingRequest {
  project?: number;
  page?: number;
  status?: number | string;
  search_fields?: string[];
  searchSubject?: string;
  searchMailId?: string;
  filter_fields?: number | undefined;
  created_at?: string | undefined;
  created_start_date?: string | undefined;
  created_end_date?: string | undefined;
  api_request?: number | undefined;
  setting_id?: number | undefined;
  template_name?: string | undefined;
  action_name?: string | undefined;
  language?: string | undefined;
  type?: string | undefined;
  environment?: string | undefined;
  settingType?: string | undefined;
  apiResponseId?: string | undefined;
  trackingModule?: string | undefined;
}
export interface PreviewDataRequest {
  project?: number;
  tracking_id?: number;
  trackingModule?: string | undefined;
}
