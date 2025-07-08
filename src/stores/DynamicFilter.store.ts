import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  filterOption?: any;
  isCustomDate?: boolean;
  isNotificationType?: undefined | string;
  isSettingType?: undefined | string;
  environment?: undefined | string;
  apiResponseId?: undefined | string;
  searchValueOption?: string;
  filterSearchFields?: any[];
  filterFieldsOption?: any;
  statusValue?: string | number | undefined;
  created_at?: string | undefined;
  created_start_date?: string | undefined;
  created_end_date?: string | undefined;
  api_request?: number | undefined;
  setting_id?: number | undefined;
  template_name?: string | undefined;
  language?: string | undefined;
  action_name?: string | undefined;
  variableSearchValue?: string | undefined;
  variableTypeValue?: number | undefined;
  variableStatusValue?: number | undefined;
  variablePageValue?: number | undefined;
}
const initialState: InitialState = {
  filterOption: ['Date range'],
  isCustomDate: false,
  isNotificationType: undefined,
  isSettingType: undefined,
  environment: undefined,
  apiResponseId: undefined,
  searchValueOption: undefined,
  filterSearchFields: [],
  filterFieldsOption: undefined,
  statusValue: undefined,
  created_at: undefined,
  created_start_date: undefined,
  created_end_date: undefined,
  api_request: undefined,
  setting_id: undefined,
  template_name: undefined,
  language: undefined,
  action_name: undefined,
  variableSearchValue: undefined,
  variableTypeValue: undefined,
  variableStatusValue: undefined,
  variablePageValue: undefined
};

const reducer = createSlice({
  name: 'dynamicFilter',
  initialState,
  reducers: {
    setDynamicFilterInfo: (state, { payload }: PayloadAction<any>) => {
      if (payload) {
        state.filterOption = [...payload];
      }
    },
    setIsCustomDateInfo: (state, { payload }: PayloadAction<boolean>) => {
      if (payload) state.isCustomDate = payload;
    },
    setSearchValueFilter: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.searchValueOption = payload;
    },
    setFilterSearchFields: (state, { payload }: PayloadAction<any>) => {
      if (payload) state.filterSearchFields = payload;
    },
    setFilterFieldsOptions: (state, { payload }: PayloadAction<any>) => {
      if (payload) state.filterFieldsOption = payload;
    },
    setStatusOptions: (state, { payload }: PayloadAction<number | string | undefined>) => {
      if (payload) state.statusValue = payload;
    },
    setCreatedAtDate: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.created_at = payload;
    },
    setSettingId: (state, { payload }: PayloadAction<number | undefined>) => {
      if (payload) state.setting_id = payload;
    },
    setCreatedStartDate: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.created_start_date = payload;
    },
    setCreatedEndDate: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.created_end_date = payload;
    },
    setNotificationType: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.isNotificationType = payload;
    },
    setSettingType: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.isNotificationType = payload;
    },
    setEnvironment: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.environment = payload;
    },
    setApiResponseId: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.apiResponseId = payload;
    },
    setApiRequestID: (state, { payload }: PayloadAction<number | undefined>) => {
      if (payload) state.api_request = payload;
    },
    setActionName: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.action_name = payload;
    },
    setTemplateName: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.template_name = payload;
    },
    setLanguage: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.language = payload;
    },
    setVariableSearchValue: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.variableSearchValue = payload;
    },
    setVariableTypeValue: (state, { payload }: PayloadAction<number | undefined>) => {
      if (payload) state.variableTypeValue = payload;
    },
    setVariableStatusValue: (state, { payload }: PayloadAction<number | undefined>) => {
      if (payload) state.variableStatusValue = payload;
    },
    setVariablePageValue: (state, { payload }: PayloadAction<number | undefined>) => {
      if (payload) state.variablePageValue = payload;
    },
    cleanUpSetting: () => {
      return {};
    }
  },
  extraReducers: () => {}
});

export const {
  reducer: DynamicFilterReducer,
  actions: {
    setDynamicFilterInfo,
    setIsCustomDateInfo,
    setSearchValueFilter,
    setFilterSearchFields,
    setFilterFieldsOptions,
    setStatusOptions,
    setCreatedAtDate,
    setCreatedStartDate,
    setApiRequestID,
    setSettingId,
    setActionName,
    setTemplateName,
    setLanguage,
    setCreatedEndDate,
    setNotificationType,
    setSettingType,
    setEnvironment,
    setApiResponseId,
    setVariableSearchValue,
    setVariableTypeValue,
    setVariableStatusValue,
    setVariablePageValue
  }
} = reducer;
