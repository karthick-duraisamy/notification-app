import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SettingEndpoints } from '../services/setting/Setting';
import type { GetOneSettingResponse } from '../services/setting/SettingTypes';

const initialState: {
  edit?: number | string;
  settingTypeId?: number | string;
  setting?: GetOneSettingResponse;
  settingFieldsInfo?: any;
} = {};

const reducer = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setTemplateEditId: (state, { payload }: PayloadAction<{ setting_id: string }>) => {
      if (payload) {
        state.edit = payload.setting_id;
      }
    },
    setSettingTypeId: (state, { payload }: PayloadAction<{ id: string | number }>) => {
      if (payload) {
        state.settingTypeId = payload.id;
      }
    },
    setSettingFieldsInfo: (state, { payload }: PayloadAction<{ fieldInfo: any }>) => {
      if (payload) {
        state.settingFieldsInfo = payload.fieldInfo;
      }
    },
    cleanUpSetting: () => {
      return {};
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(SettingEndpoints.getSetting.matchFulfilled, (state, { payload }) => {
      if (payload && payload.responseCode === 0 && payload.response) {
        state.setting = payload.response.data;
      }
    });
  }
});

export const {
  reducer: SettingReducer,
  actions: { setTemplateEditId, setSettingTypeId, setSettingFieldsInfo, cleanUpSetting }
} = reducer;
