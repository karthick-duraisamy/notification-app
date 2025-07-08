import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Reducer } from '@reduxjs/toolkit';

export enum PreviewMode {
  desktop = 'desktop',
  mobile = 'mobile',
  tablet = 'tablet',
}

interface PreviewModalState {
  isOpen: boolean;
  mode: PreviewMode;
}

interface ImportTemplateModalState {
  isOpen: boolean;
}

interface ModalState {
  previewModal: PreviewModalState;
  importTemplateModal: ImportTemplateModalState;
}

const initialState: ModalState = {
  previewModal: { isOpen: false, mode: PreviewMode.desktop },
  importTemplateModal: { isOpen: false },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openPreviewModal: (state, action: PayloadAction<{ mode: PreviewMode }>) => {
      state.previewModal = { isOpen: true, mode: action.payload.mode };
    },
    closePreviewModal: (state) => {
      state.previewModal = { isOpen: false, mode: PreviewMode.desktop };
    },
    openImportTemplateModal: (state) => {
      state.importTemplateModal = { isOpen: true };
    },
    closeImportTemplateModal: (state) => {
      state.importTemplateModal = { isOpen: false };
    },
  },
});

// Explicitly type the reducer
export const ModalReducer: Reducer<ModalState> = modalSlice.reducer;

export const {
  openPreviewModal,
  closePreviewModal,
  openImportTemplateModal,
  closeImportTemplateModal,
} = modalSlice.actions;