import { configureStore, Middleware, Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { FC } from 'react';
import { ModalReducer } from './Modal.store';
import { MailService, CommonService } from '../services/Services';
import { serviceErrorLoggerMiddleware } from './Service.middleware';
import { ProjectReducer } from './Project.store';
import { SettingReducer } from './Setting.store';
import { TemplateReducer } from './Template.store';
import { AutoCompleteReducer } from './Autocomplete.store';
import { MasterInfoReducer } from './masterInfo.store';
import { TemplateProjectReducer } from '../stores/TemplateProject.store';
import { MenuServiceReducer } from './menu.store';
import { DynamicFilterReducer } from './DynamicFilter.store';
import { userReducer } from './User.store';
import layoutReducer from './layoutSlice';

import { inboxServiceReducer, inboxServiceMiddleware } from '@/assets/Infiniti-mail-engine/infinit-mail-engine.js';

export const store: any = configureStore({
  reducer: {
    user: userReducer,
    ProjectReducer,
    SettingReducer,
    TemplateProjectReducer,
    DynamicFilterReducer,
    MenuServiceReducer,
    ModalReducer,
    TemplateReducer,
    AutoCompleteReducer,
    MasterInfoReducer,
    [MailService.reducerPath]: MailService.reducer,
    [CommonService.reducerPath]: CommonService.reducer,
    layout: layoutReducer,

    // ✅ Inject the inboxService reducer from infinit-mail-engine
    ...inboxServiceReducer
  },

  middleware: (getDefaultMiddleware: any) => {
    const allMiddleware = inboxServiceMiddleware(getDefaultMiddleware).concat(
      serviceErrorLoggerMiddleware as Middleware<{}, any, Dispatch<UnknownAction>>,
      MailService.middleware as Middleware<{}, any, Dispatch<UnknownAction>>,
      CommonService.middleware as Middleware<{}, any, Dispatch<UnknownAction>>
    );
    return allMiddleware as any;
  },

  devTools: process.env.NODE_ENV !== 'production'
});

// Explicitly type your root state and dispatch
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Redux Provider component
interface AppStoreProviderProps {
  children: React.ReactNode;
}

const AppStoreProvider: FC<AppStoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { AppStoreProvider };
