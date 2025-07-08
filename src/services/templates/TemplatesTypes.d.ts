export interface ListTemplatesResponse {
  count: number;
  links: Links;
  results: Result[];
}

export interface Links {
  next: null;
  previous: null;
}

export interface Result {
  template_id: number;
  template_name: string;
  preview: string;
  request_format: string;
  folder: string;
  folder_name: string;
  language: string;
  language_name: string;
  status: string;
  type?: type;
  status_name: string;
  created_at: string;
  created_by: string;
  updated_by?: string | Date;
  updated_at?: string | Date;
  updated_info?: UpdatedInfo;
  subject?: string;
}
export interface UpdatedInfo {
  updated_by: string;
  updated_at: string;
}
export interface MasterInfo {
  status: Status[];
}

export interface Status {
  value: number;
  label: string;
}

export interface getTemplateRequest {
  template_id: string;
  folder: string | null;
}

// get template response
// type: reponse body
// method: get
// path: /template/<template_id>
export interface GetTemplateResponse {
  template_id: number;
  template_name: string;
  subject: string;
  template_content: string;
  template_data: string;
  request_format: string;
  folder: string;
  folder_name: string;
  language: string;
  language_name: string;
  status: string;
  status_name: string;
  created_at: Date;
  created_by: string;
  updated_info: UpdatedInfo;
  masterInfo: MasterInfo;
}

// add template request
// type: request body
// method: POST
// path: /template/
export interface AddTemplateRequest {
  template: AddTemplate;
}

export interface AddTemplate {
  template_name: string;
  template_content: string;
  template_data: string;
  request_format: string;
  folder: number;
  type?: string;
  language: string | number;
  status: string;
  subject: string;
  project?: string | number | undefined;
}

// add template response
// type: response body
// method: -
// path: /template/

export interface AddTemplateResponse {
  template_id: number;
  template_name: string;
  template_content: string;
  template_data: string;
  request_format: string;
  folder: string;
  folder_name: string;
  language: string;
  language_name: string;
  status: string;
  status_name: string;
  created_at: Date;
  created_by: string;
  updated_info: UpdatedInfo;
}

export interface UpdatedInfo {
  updated_by: string;
  updated_at: string;
}

// add template error response
// type: response body
// method: -
// path: /template/
export type AddTemplateErrorResponse = {
  template: {
    [K in keyof AddTemplate]?: string[];
  };
};

// update template request
// type: request body
// method: PUT
// path: /template/<template_id>
export interface UpdateTemplateRequest extends AddTemplateRequest {
  template_id: string;
  folder: string | null;
}
export interface ChangeStatus {
  template_id: number;
  status: number;
}
export interface TemplateMaster {
  status: Status[];
  language: Language[];
}

export interface Status {
  label: string;
  value: string;
}

export interface Language {
  label: string;
  value: string;
}
export interface MoveTemplate {
  target_folder_id: number;
  selected_template: number[];
  project: number | string | null;
}
export interface MoveAllTemplate {
  selected_folder_id: number | string;
  select_template_all: string;
  target_folder_id: number;
}

export interface ExportTemplate {
  template_id: number | string | undefined;
  project?: number | string | null;
}

export interface ListRequest {
  page?: string | number;
  folder?: string | null;
  status?: number;
  ordering?: string;
  search?: string;
}

export interface DeleteTemplate {
  template_id: number;
  params?: DeleteParams;
}
export interface DeleteParams {
  target?: string;
}

export interface DeleteBulk {
  body: DeleteBulkBody;
  params?: DeleteBulkParams;
}
export interface DeleteBulkBody {
  folder_id?: string;
  selected_template?: number[];
}
export interface DeleteBulkParams {
  target?: string;
}
