// list variable request
// type: request
// method: get
// path: /variable/?project_name=<project_name>
export interface ListVariablesRequest {
  project?: string | number;
  page?: number;
}

// list contact response
// type: response
// method: get
// path: /variable/
export interface ListVariableResponse {
  links: links;
  count: number;
  results: result[];
  project_id: number;
}

export interface Links {
  next: null;
  previous: null;
}

export interface Result {
  variable_id: number;
  variable_name: string;
  value: string;
  created_at: Date;
  project: number;
  project_name: string;
  status: number;
  status_name: string;
  variable_type: string;
  variable_type_name: string;
  created_by: string;
  updated_info: UpdatedInfo;
  description: string;
}

export interface UpdatedInfo {
  updated_by: string;
  updated_at: Date;
}

// add variable request
// type: request
// method: post
// path: /variable/
export interface AddVariable {
  variables: Variable[];
}

export interface GetVariable {
  id: number | string;
  project: null | string;
}

// add variable Error response
// type: response body
// method: response
// path: /variable/
export interface AddVariableErrorResponse {
  variable: {
    [K in keyof Variable]: string[];
  };
}

export interface Variable {
  variable_name: string;
  value: string;
  description: string;
  project: string | number | undefined;
  status: string;
  variable_type: string;
}

// update variable request
// type: request
// method: PUT
// path: /variable/{id}/

export interface UpdateVariable {
  id: string;
  variable: Variable;
}

export interface LabelValue {
  label: string;
  value: number;
}

export interface MasterInfo {
  project: LabelValue[];
  status: LabelValue[];
  variable_type: LabelValue[];
}

export interface UpdateStatus {
  variable_id: number;
  status: number;
}
