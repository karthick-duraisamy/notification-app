export interface Folder {
  folder_id: string;
  folder_name: string;
  count: number;
}
export interface UpdateFolder {
  update_folder: FolderName;
  folder_id: string;
  pathname: string;
}
export interface GetFolder {
  pathname: string;
  project: string | null;
}
export interface FolderName {
  folder_name: string;
}
export interface Addfolder {
  add_folder: FolderName;
  pathname: string;
}
export interface CloneFolder {
  selected_folder_id: number | string;
  select_template_all: string;
  new_folder_name: string;
}
export interface CloneRequest {
  cloneData: CloneFolder;
  pathname: string;
}
