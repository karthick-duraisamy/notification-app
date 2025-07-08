import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayoutMode = 'horizontal' | 'vertical';

interface LayoutState {
  mode: LayoutMode;
  menuBackgroundColor: string;
  menuTextColor: string;
  activeMenuBackgroundColor: string;
  activeMenuTextColor: string;
  primaryMenuIconColor: string;
  secondaryMenuIconColor: string;
}

const initialState: LayoutState = {
  mode: 'vertical',
  menuBackgroundColor: '#ffffff', // default menu background
  menuTextColor: '#000000',
  activeMenuBackgroundColor: '#0c28a8', // example default
  activeMenuTextColor: '#ffffff',
  primaryMenuIconColor: '#0e2071',
  secondaryMenuIconColor: '#FD9646'
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<LayoutMode>) => {
      state.mode = action.payload;
    },
    setLayoutOption: <K extends keyof Omit<LayoutState, 'mode'>>(
      state: LayoutState,
      action: PayloadAction<{ key: K; value: LayoutState[K] }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    }
  }
});

export const { setLayout, setLayoutOption } = layoutSlice.actions;
export default layoutSlice.reducer;
