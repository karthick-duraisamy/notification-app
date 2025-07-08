declare module '@/assets/Infiniti-mail-engine/infinit-mail-engine.js' {
  import type { Middleware } from '@reduxjs/toolkit';
  import type { AnyAction, Reducer } from 'redux';

  export const inboxServiceReducer: {
    [key: string]: Reducer<any, AnyAction>;
  };

  export const inboxServiceMiddleware: (getDefaultMiddleware: any) => Middleware[];

  export const InboxService: any;

  const Component: React.FC;
  export default Component;
}
