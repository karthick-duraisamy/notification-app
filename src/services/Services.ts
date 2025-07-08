import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../Utils/baseurl';
import { decryptResponse } from '../Utils/crypto';

let url = getBaseUrl();
const queryParam = window.location.href.split('?')[1];
const isLoadedInIframe = window !== window.parent;

if (queryParam) {
  if (!isLoadedInIframe) {
    localStorage.setItem('baseUrl', url);
  }
}

// let _url = process.env.REACT_APP_API_URL;

// let sanitizeUrl = (url: string): string => {
//   return url.replace(/([^:]\/)\/+/g, '$1');
// };

const MailService = createApi({
  reducerPath: 'mailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: 'include',
    prepareHeaders: (headers) => {
      const user = decryptResponse(localStorage.getItem('user') as string);
      const iframe_token = sessionStorage.getItem('iframe_token');
      if (iframe_token) {
        iframe_token && headers.set('Authorization', `Bearer ${iframe_token}`);
      }
      if (user) {
        const token = JSON.parse(user)?.token;
        token && headers.set('X-XSRF-TOKEN', token);
      }
      return headers;
    }
  }),
  endpoints: () => ({})
});

const CommonService = createApi({
  reducerPath: 'CommonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const user = decryptResponse(localStorage.getItem('user') as string);
      const iframe_token = sessionStorage.getItem('iframe_token');
      if (iframe_token) {
        iframe_token && headers.set('Authorization', `Bearer ${iframe_token}`);
      }

      if (user) {
        const token = JSON.parse(user)?.token;
        token && headers.set('X-XSRF-TOKEN', token);
      }
      return headers;
    }
  }),
  endpoints: () => ({})
});

export { MailService, CommonService };
