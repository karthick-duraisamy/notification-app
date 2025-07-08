// List Setting response
// type: response
// method: get
// path: /settings/
export interface ListSettingResponse {
  count: number;
  links: Links;
  results: Result[];
}

export interface Links {
  next: null;
  previous: null;
}

export interface Result {
  setting_id: number;
  setting_name: string;
  end_point: string;
  port: number;
  user_name: string;
  from_email_id: string;
  project_name: string;
  project: number;
  setting_type_name: string;
  setting_type: string;
  status_name: string;
  status: string;
  created_at: Date;
  created_by: string;
  updated_info: UpdatedInfo;
}

export interface UpdatedInfo {
  updated_by: string;
  updated_at: Date;
}

// get one setting request
// type: request
// method: -
// path: /settings/{setting_id}
// note:same as 'list setting response' but the result is a single object
export type GetOneSettingRequest = { setting_id: string; project_id: number | string };

// get one setting response
// type: response
// method: get
// path: /settings/{setting_id}
// note:same as 'list setting response' but the result is a single object
export type GetOneSettingResponse = AddSettingResponse;

// add setting request
// type: request body
// method: -
// path: /settings
export interface AddSettingRequest {
  setting: AddSetting;
}

export interface AddSetting {
  setting_name: string;
  end_point: string;
  port: string;
  user_name: string;
  password: string;
  from_email_id: string;
  project: number | undefined;
  setting_type: string;
  status: string;
  test_and_save: string;
  test_email_recipients: string[];
}

// add setting response
// type: response
// method: post
// path: /setting
export interface AddSettingResponse {
  masterInfo: MasterInfo;
  setting_id: number;
  setting_name: string;
  setting_type: string;
  status: string;
  user_name: string;
  created_at: Date;
  end_point: string;
  from_email_id: string;
  port: string;
  project: number;
  project_name: string;
  exclude_domains: string;
}

// add setting Error Response
// type: response
// method: post
// path: /setting/

export type AddSettingErrorResponse = {
  setting: { [K in keyof AddSetting]?: string[] };
};

// update setting request
// type: request body
// method: -
// path: /settings/{setting_id}
// note: same as 'add setting request'
export interface UpdateSettingRequest {
  setting: AddSetting;
  setting_id: string;
  project_id: string | number;
}

// update setting response
// type: response
// method: put
// path: /setting/{setting_id}
// note: same as 'add setting' but request path is /setting/{setting_id}
export type UpdateSettingResponse = AddSettingResponse;

// update setting error response
// type: response body
// method: -
// path: /setting/{setting_id}
// note: same as 'AddSettingErrorResponse'
export type UpdateSettingErrorResponse = AddSettingErrorResponse;

export interface GetSettingsRequest {
  status?: string | number;
  project?: string | number | undefined;
  setting_type?: string | number;
  page?: number;
}

export interface GetMaster {
  project: LabelValue[];
  status: LabelValue[];
}
interface LabelValue {
  label: string;
  value: number;
}
