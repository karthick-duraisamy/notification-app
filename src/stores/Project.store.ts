import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProjectEndpoints } from '../services/project/Project';
import type { GetOneProjectResponse } from '../services/project/ProjectTypes';

const initialState: { edit?: number | string; project?: GetOneProjectResponse } = {};

const reducer = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setTemplateEditId: (state, { payload }: PayloadAction<{ project_id: string }>) => {
      if (payload) {
        state.edit = payload.project_id;
      }
    },
    cleanUpProject: () => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(ProjectEndpoints.getProject.matchFulfilled, (state, { payload }) => {
      if (payload && payload.responseCode === 0 && payload.response) {
        state.project = payload.response.data;
      }
    });
  },
});

export const {
  reducer: ProjectReducer,
  actions: { setTemplateEditId, cleanUpProject },
} = reducer;
