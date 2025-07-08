// List Project response
// type: response
// method: get
// path: /projects/
export interface ListProjectResponse {
  links: Links;
  count: number;
  results: Result[];
}

export interface Links {
  next: null;
  previous: null;
}
export interface DeleteProject {
  id: number | string;
  project?: string | number | undefined;
}
export interface Result {
  project_id: number;
  project_name: string;
  project_title: string;
  actions: string[];
  status: number;
  status_name: string;
  action_count: number;
  created_at: Date;
  updated_info?: UpdatedInfo;
  updated_at?: string | any;
  updated_by?: string;
  created_by: string;
}
export interface UpdatedInfo {
  updated_at: string;
  updated_by: string;
}
export interface UpdateStatus {
  project_id: number;
  status: number | string;
}
// get one project request
// type: request
// method: -
// path: /projects/{project_id}
// note:same as 'list project response' but the result is a single object
export type GetOneProjectRequest = { project_id: string };

// get one project response
// type: response
// method: get
// path: /projects/{project_id}
// note:same as 'list project response' but the result is a single object
export type GetOneProjectResponse = AddProjectResponse;

// add project request
// type: request body
// method: -
// path: /projects/
export interface AddProjectRequest {
  project: AddProject;
}

export interface AddProject {
  project_name: string;
  project_code: string;
  status: string;
  actions: ActionRequest[];
}

export interface ActionRequest {
  action_name: string;
  status: string;
}

// add project error response
// type: response body
// method: -
// path: /projects
export interface AddProjectErrorResponse {
  project: { [K in keyof AddProject]?: string[] };
}

// add project response
// type: response
// method: post
// path: /project
export interface AddProjectResponse {
  masterInfo: MasterInfo;
  project_id: number;
  project_name: string;
  project_code: string;
  status: string;
  action_count: number;
  created_at: Date;
  actions: ActionResponse[];
}

export interface ActionResponse {
  action_id: number;
  action_name: string; // update project response
  // type: response
  // method: put
  // path: /project/{project_id}
  // note: same as 'add project' but request path is /project/{project_id};
  unique_name: string;
  status: string;
  created_date: Date;
}

// update project request
// type: request body
// method: -
// path: /projects/{project_id}
// note: same as 'add project request'
export interface UpdateProjectRequest {
  project: AddProject;
  project_id: string;
}

// update project response
// type: response
// method: put
// path: /project/{project_id}
// note: same as 'add project' but request path is /project/{project_id}
export type UpdateProjectResponse = AddProjectResponse;

// update project Error response
// type: response body
// method: put
// path: /project/{project_id}
// note: same as 'addProjectErrorResponse' but request path is /project/{project_id}
export type UpdateProjectErrorRespose = AddProjectErrorResponse;

export interface LabelValue {
  label: string;
  value: number;
}
export interface GetMaster {
  status: LabelValue[];
  project: LabelValue[];
}
export interface GetProjectsRequest {
  project?: number | undefined | string;
  status?: number;
  page?: number;
  created_at?: any;
}
