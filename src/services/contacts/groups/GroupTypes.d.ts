export interface IFilterData {
  status?: number | string;
  project: string | number | undefined;
  search?: string | undefined;
}

export interface CreateGroupBasicInfo {
  group_name: string | undefined;
  description: string | undefined;
  project_id: string | number | undefined;
  topic: string | undefined;
  status: string | undefined;
  attachment?: any[];
  contacts?: any[];
  contact_group_id?: string | undefined;
}

export interface UpdateGroupContact {
  groupId: string;
  project_id: number | undefined;
  contactGroup: {
    group_name: string;
    description: string;
    topic: string;
    status: string;
  };
}

export interface GetContactGroup {
  id: string;
  project: string | number | undefined;
}

export interface DeleteContactGroup {
  id: number | string;
  project?: string | number | undefined;
}

export interface updateContactGroup {
  id: string;
  project: string | number | undefined;
  contactGroup: {
    name: string;
    description: string;
    topic: string;
    project_id: string | number | undefined;
    status: string;
  };
}

export interface UpdateContactStatus {
  id: number | string;
  contactGroup: {
    status: string | number;
  };
}

export type ManageGroupFormProps = {
  pathName: string;
  groupData: any;
  closeModal: () => void;
  isBack?: boolean;
};

export interface UpdateTopic {
  id: number | string;
  contactGroup: {
    name: string | number;
  };
}
