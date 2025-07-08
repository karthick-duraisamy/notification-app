import { createSlice } from '@reduxjs/toolkit';
import { getTemplateMasterInfo } from '../services/masterInfo/masterInfo';
import { ProjectEndpoints } from '../services/project/Project';
import type { TemplateMasterInfo } from '../services/masterInfo/templateMasterInfo';

const reducer = createSlice({
  name: 'masterInfo',
  initialState: {
    template: null as unknown as TemplateMasterInfo,
    project: null as any,
  },

  reducers: {
    clearTemaplateMasterInfo: (state) => {
      state.template = null as unknown as TemplateMasterInfo;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getTemplateMasterInfo.matchFulfilled, (state, { payload }) => {
      if (payload.responseCode === 0) {
        state.template = payload.response.data;
      }
    });
    builder.addMatcher(ProjectEndpoints.getProjectMasterInfo.matchFulfilled, (state, { payload }) => {
      if (payload.responseCode === 0) {
        state.project = payload.response.data;
      }
    });
  },
});

export const {
  reducer: MasterInfoReducer,
  actions: { clearTemaplateMasterInfo },
} = reducer;
