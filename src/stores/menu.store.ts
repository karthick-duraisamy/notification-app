import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: { menuServiceData?: any } = {};

const reducer = createSlice({
  name: 'templateProject',
  initialState,
  reducers: {
    setMenuServiceData: (state, { payload }: PayloadAction<{ value: any }>) => {
      if (payload) {
        state.menuServiceData = payload.value;
      }
    },
    cleanUpSetting: () => {
      return {};
    }
  },
  extraReducers: () => {}
});

export const {
  reducer: MenuServiceReducer,
  actions: { setMenuServiceData, cleanUpSetting }
} = reducer;
