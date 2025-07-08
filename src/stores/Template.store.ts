import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getTemplate, getTemplateList, getTemplateMaster } from '../services/templates/Templates';
import type { Folder } from '../services/folder/FolderTypes';
import { getFolder } from '../services/folder/Folder';
import type { ListTemplatesResponse, TemplateMaster } from '../services/templates/TemplatesTypes';

interface InitialState {
  savedTemplate: { list: ListTemplatesResponse['results']; count: number; totalCount: number };
  templateFolder: { folders: Folder[] };
  save: boolean;
  active: {
    folder: string;
    template_name: string;
    folder_id: number;
    subject: string;
    language_id: number;
    templateType: string | undefined;
  };
  loadTemplate: { json: string };
  templateView: { view: string };
  templateMaster: TemplateMaster;
  selectedTemplates: { templates: number[]; all: boolean };
  undoredo: {
    undo: boolean;
    redo: boolean;
  };
  folderId: { id: string };
  pageNumber?: number | string | undefined;
  isBack?: boolean;
  templateSearchValue?: string | undefined;
  currentBackPage: string | undefined;
  getHtml: string;
  Json: string;
  saveHtmlTrigger: boolean;
  templateDetails: any;
}

const initialState: InitialState = {
  save: false,
  active: {
    folder: '',
    template_name: '',
    folder_id: -1,
    subject: '',
    language_id: null as unknown as number,
    templateType: undefined
  },
  savedTemplate: {
    list: [],
    count: -1,
    totalCount: -1
  },
  templateFolder: {
    folders: []
  },
  loadTemplate: { json: '' },
  templateView: { view: 'thumbnail' },
  templateMaster: {
    language: [],
    status: []
  },
  selectedTemplates: {
    templates: [],
    all: false
  },
  undoredo: {
    undo: false,
    redo: false
  },
  folderId: { id: '' },
  isBack: false,
  currentBackPage: undefined,
  pageNumber: undefined,
  getHtml: '',
  Json: '',
  templateSearchValue: undefined,
  saveHtmlTrigger: false,
  templateDetails: {
    template_id: '',
    folder_id: '',
    template_name: '',
    folder_name: '',
    file_content: '',
    template_content: '',
    url: '',
    file_type: ''
  }
};

const reducer = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setSaveActive: (state) => {
      state.save = true;
    },
    setSaveDeActive: (state) => {
      state.save = false;
    },
    clearSavedTemplate: ({ savedTemplate }) => {
      savedTemplate.list = [];
      savedTemplate.count = -1;
    },
    setTemplateView: ({ templateView }, { payload }: PayloadAction<string>) => {
      templateView.view = payload;
    },
    setSelectedTemplates: ({ selectedTemplates }, { payload }: PayloadAction<number>) => {
      selectedTemplates.templates.push(payload);
    },
    removeSelectedTemplates: ({ selectedTemplates }, { payload }) => {
      selectedTemplates.templates = selectedTemplates.templates.filter((temp) => temp !== payload);
    },
    clearSelectedTemplates: ({ selectedTemplates }) => {
      selectedTemplates.templates = [];
    },
    selectAllTemplates: ({ selectedTemplates }) => {
      selectedTemplates.all = !selectedTemplates.all;
    },
    clearSelectAllTemplates: ({ selectedTemplates }) => {
      selectedTemplates.all = false;
    },
    triggerUndo: (state) => {
      state.undoredo.undo = true;
    },
    triggerRedo: (state) => {
      state.undoredo.redo = true;
    },
    resetUndo: (state) => {
      state.undoredo.undo = false;
    },
    resetRedo: (state) => {
      state.undoredo.redo = false;
    },
    setFolderId: ({ folderId }, { payload }: PayloadAction<string>) => {
      folderId.id = payload;
    },
    setback: (state, { payload }: PayloadAction<boolean>) => {
      state.isBack = payload;
    },
    setCurrentBackPage: (state, { payload }: PayloadAction<string | undefined>) => {
      state.currentBackPage = payload;
    },
    setTemplatePage: (state, { payload }: PayloadAction<number | string | undefined>) => {
      state.pageNumber = payload;
    },
    clearTemplateFolder: ({ templateFolder }) => {
      templateFolder.folders = [];
    },
    setLoadTemplate: (state, { payload }: PayloadAction<string>) => {
      state.loadTemplate.json = payload;
    },
    clearLoadTemplate: (state) => {
      state.loadTemplate.json = '';
    },
    setActiveFolderID: (state, { payload }: PayloadAction<number>) => {
      state.active.folder_id = payload;
    },
    setTemplateTypeID: (state, { payload }: PayloadAction<string>) => {
      state.active.templateType = payload;
    },
    setActiveTemplateName: (state, { payload }: PayloadAction<string>) => {
      state.active.template_name = payload;
    },
    setActiveSubject: (state, { payload }: PayloadAction<string>) => {
      state.active.subject = payload;
    },
    setActiveLanguage: (state, { payload }: PayloadAction<number>) => {
      state.active.language_id = payload;
    },
    setHtml: (state, { payload }: PayloadAction<string>) => {
      state.getHtml = payload;
    },
    setJson: (state, { payload }: PayloadAction<any>) => {
      state.Json = payload;
    },
    setTemplateSearchValue: (state, { payload }: PayloadAction<string | undefined>) => {
      state.templateSearchValue = payload;
    },
    setHtmlTrigger: (state, { payload }: PayloadAction<boolean>) => {
      state.saveHtmlTrigger = payload;
    },
    setCustomTemplate: (state, { payload }: PayloadAction<any>) => {
      state.templateDetails = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(getTemplate.matchFulfilled, (state, { payload }) => {
      if (payload.responseCode === 0) {
        const {
          response: {
            data: { template_name, folder_name, folder, subject, language }
          }
        } = payload;
        state.active.folder = folder_name;
        state.active.template_name = template_name;
        state.active.folder_id = parseInt(folder);
        state.active.subject = subject;
        state.active.language_id = parseInt(language);
      }
    });
    builder.addMatcher(getTemplateList.matchFulfilled, ({ savedTemplate }, { payload }) => {
      if (payload.responseCode === 0) {
        const {
          response: { data }
        } = payload;
        savedTemplate.list = data.results;
        savedTemplate.count = data.count;
      } else if (payload.responseCode === 1) {
        savedTemplate.count = -2;
      }
    });
    builder.addMatcher(getFolder.matchFulfilled, ({ templateFolder, savedTemplate }, { payload }) => {
      if (payload.responseCode === 0) {
        const {
          response: { data }
        } = payload;
        templateFolder.folders = data;
        savedTemplate.totalCount = data.reduce((total: any, folder: any) => folder.count + total, 0);
      }
    });
    builder.addMatcher(getTemplateMaster.matchFulfilled, ({ templateMaster }, { payload }) => {
      if (payload.responseCode === 0) {
        const {
          response: { data }
        } = payload;
        templateMaster.status = data.status;
        templateMaster.language = data.language;
      }
    });
  }
});

export const {
  actions: {
    setSaveActive,
    setSaveDeActive,
    clearSavedTemplate,
    setTemplateView,
    setSelectedTemplates,
    removeSelectedTemplates,
    clearSelectedTemplates,
    triggerRedo,
    triggerUndo,
    resetRedo,
    resetUndo,
    setFolderId,
    clearTemplateFolder,
    selectAllTemplates,
    setLoadTemplate,
    clearLoadTemplate,
    setActiveFolderID,
    setActiveTemplateName,
    clearSelectAllTemplates,
    setHtml,
    setJson,
    setTemplateSearchValue,
    setback,
    setCurrentBackPage,
    setTemplatePage,
    setHtmlTrigger,
    setActiveSubject,
    setActiveLanguage,
    setTemplateTypeID,
    setCustomTemplate
  },
  reducer: TemplateReducer
} = reducer;
