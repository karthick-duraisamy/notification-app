import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TemplateProjectState {
  project?: number | string;
  isTimezoneConversion?: boolean;
  enviromentUpdate?: boolean;
  dashboardTrackingInfo?: string | undefined;
  modalGuide?: any[];
  groupid?: string;
  campaignid?: string;
  showCreatedAt: { [key: string]: boolean };
  isTrackingModule?: string | undefined;
  isPushNotification?: any;
  isUnwantedTrigger?: any;
  dataViews: { [key: string]: string };
}

const initialState: TemplateProjectState = {
  project: undefined,
  isTimezoneConversion: false,
  enviromentUpdate: false,
  dashboardTrackingInfo: undefined,
  modalGuide: [],
  groupid: undefined,
  campaignid: undefined,
  showCreatedAt: {} as Record<string, boolean>,
  dataViews: {}
};

const reducer = createSlice({
  name: 'templateProject',
  initialState,
  reducers: {
    setTemplateProjectId: (state, { payload }: PayloadAction<{ value: number }>) => {
      if (payload) {
        state.project = payload.value;
      }
    },
    setDashboarTrackingInfo: (state, { payload }: PayloadAction<{ value: string | undefined }>) => {
      if (payload) state.dashboardTrackingInfo = payload.value;
    },
    setIsEnvironmentUpdate: (state, { payload }: PayloadAction<any>) => {
      if (payload) {
        state.enviromentUpdate = payload.value ? false : true;
      }
    },
    setTimeFormat: (state, { payload }: PayloadAction<{ value: string }>) => {
      if (payload) state.isTimezoneConversion = payload?.value?.toLocaleUpperCase() === 'LOCAL';
    },
    setGuideModalInfo: (state, { payload }: PayloadAction<{ value: string[] }>) => {
      if (payload) state.modalGuide = payload?.value;
    },
    cleanUpSetting: () => {
      return initialState;
    },
    clearGuideModalInfo: (state, { payload }: PayloadAction<{ value: string }>) => {
      if (
        ['project', 'settings', 'variables', 'template'].includes(payload?.value) &&
        Array.isArray(state.modalGuide)
      ) {
        state.modalGuide = state.modalGuide.filter(
          (item) => !['project', 'settings', 'variables', 'template'].includes(item)
        );
      }
    },
    setActionId: (state, { payload }: PayloadAction<{ value: any }>) => {
      if (payload) {
        state.groupid = payload.value;
      }
    },
    setCampaignId: (state, { payload }: PayloadAction<{ value: string }>) => {
      if (payload) {
        state.campaignid = payload.value;
      }
    },
    setShowCreatedAt: (state, action: PayloadAction<{ pathname: string; value: boolean }>) => {
      state.showCreatedAt = {
        ...state.showCreatedAt,
        [action.payload.pathname]: action.payload.value
      };
    },
    setTrackingModuleInfo: (state, { payload }: PayloadAction<{ trackingModule: string | undefined }>) => {
      if (payload) state.isTrackingModule = payload?.trackingModule;
    },
    // To set the Push Notification request data from the user
    setPushNotification: (state, { payload }: PayloadAction<{ value: any }>) => {
      if (payload) {
        state.isPushNotification = payload.value;
      }
    },
    // To set the unwanted trigger data from back or form sumbmission time
    setUnwantedTrigger: (state, { payload }: PayloadAction<{ value: any }>) => {
      if (payload) {
        state.isUnwantedTrigger = payload.value;
      }
    },
    // To the view type to the Campaign ,group and view contact page
    setDataView: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.dataViews = {
        ...state.dataViews,
        [action.payload.key]: action.payload.value
      };
    }
  },
  extraReducers: () => {}
});

export const {
  reducer: TemplateProjectReducer,
  actions: {
    setTemplateProjectId,
    setTimeFormat,
    setIsEnvironmentUpdate,
    setDashboarTrackingInfo,
    cleanUpSetting,
    setGuideModalInfo,
    clearGuideModalInfo,
    setActionId,
    setCampaignId,
    setShowCreatedAt,
    setTrackingModuleInfo,
    setPushNotification,
    setUnwantedTrigger,
    setDataView
  }
} = reducer;
