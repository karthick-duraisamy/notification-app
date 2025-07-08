import { createSlice, Reducer } from '@reduxjs/toolkit';
import { ProjectEndpoints } from '../services/project/Project';

interface AutoCompleteState {
  actions: any[]; // Replace `any` with the actual type if known
}

const initialState: AutoCompleteState = {
  actions: []
};

const slice = createSlice({
  name: 'autocomplete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ProjectEndpoints.getActionAutoComplete.matchFulfilled, (
        // state, { payload, meta }
        ) => {
        // handle payload if needed
      }
    );
  }
});

// Explicit type annotation here to avoid TS2742
export const AutoCompleteReducer: Reducer<AutoCompleteState> = slice.reducer;
