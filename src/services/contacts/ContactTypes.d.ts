// List Contact response
// type: response
// method: get

// path: /contact/
export interface ListContactResponse {
  links: Links;
  count: number;
  results: Result[];
}

export interface Links {
  next: null;
  previous: null;
}

export interface Result {
  contact_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email_id: string;
  status: string;
  status_name: string;
  updated_by?: string;
  updated_at?: Date | undefined;
  updated_info?: UpdatedInfo;
  created_by: string;
  created_at: string;
}

export interface UpdatedInfo {
  updated_by: string;
  updated_at: Date;
}

// Add contact request
// type: request
// method: post
// path: /contact/
export interface AddContact {
  contact: Contact;
}

export interface Contact {
  first_name: string;
  last_name: string;
  phone_number: string;
  email_id: string;
  status: number;
}

// Update contact request
// type: request
// method: PUT
// path: /contact/

export interface UpdateContact extends AddContact {
  id: string;
  project: string | number | undefined;
}

// Delete contact request
// type: request
// method: DELETE
// path: /contact/{contact_id}
export interface DeleteContact {
  id: number | string;
  project?: string | number | undefined;
}

// get contact request
// type: request
// method: GET
// path: /contact/{contact_id}
export type GetContact = DeleteContact;

// get contact response
// type: response
// method: GET
// path: /contact/{contact_id}

export interface GetContactResponse {
  contact_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email_id: string;
  status: string;
  status_name: string;
  updated_info: UpdatedInfo;
  created_by: string;
  masterInfo: MasterInfo;
}

export interface MasterInfo {
  status: Status[];
}

export interface Status {
  label: string;
  value: string;
}

export interface UpdatedInfo {
  updated_by: string;
  updated_at: Date;
}
export interface LabelValue {
  label: string;
  value: number;
}

export interface GetMaster {
  project: LabelValue[];
  status: LabelValue[];
  variable_type: LabelValue[];
}
export interface GetContactsRequest {
  status?: number;
}
