export interface TemplateMasterInfo {
  folder: Folder[];
  status: Language[];
  language: Language[];
}

export interface Folder {
  count: number;
  label: string;
  value: string;
}

export interface Language {
  label: string;
  value: string;
}
