import { MailService } from '../Services';
import CFG from '../../config/config.json';
import type { MailApiResponse } from '../Service';
import type { AuthResponseData, ForgotPassword, UnAuththenticatedUser } from './User';

// auth url is different for backend
const Base_URL =
  window.location.href.split('?')[1] === '8e3eb2c69a184ad1d448afe5985f50b3'
    ? CFG.NZ_URL
    : window.location.href.split('?')[1] === 'eb56daa50d41428baf0100d40253f481'
    ? CFG.SIX_E_URL
    : window.location.href.split('?')[1] === '58806e006b14b04a535784a5462d09b0'
    ? CFG.JA_URL
    : window.location.href.split('?')[1] === '2dc91da7332b25b78c7752f5f830ac44'
    ? CFG.CT_PROD
    : window.location.href.split('?')[1] === '67a7c9cc86d4ae431c139d802a9df22c'
    ? CFG.CT_TEST
    : window.location.href.split('?')[1] === 'c6a0e7c2e78ced7f024313cb92b897a3'
    ? CFG.WN_URL
    : window.location.href.split('?')[1] === 'f5ddaf0ca7929578b408c909429f68f2'
    ? CFG.LOCAL_URL
    : window.location.href.split('?')[1] === 'dd480f25b31ec27223fee2c6edcacb3c'
    ? CFG.KM_URL
    : window.location.href.split('?')[1] === '6a7a49bfa67ce91c402c76086f1944ba'
    ? CFG.XY_TEST_URL
    : window.location.href.split('?')[1] === 'f9c24782c24c237d16e79f18e2fa9046'
    ? CFG.RX_URL
    : localStorage.getItem('baseUrl') !== 'undefined' &&
      localStorage.getItem('baseUrl') !== '' &&
      localStorage.getItem('baseUrl')
    ? localStorage.getItem('baseUrl')?.toString()
    : import.meta.env.VITE_API_URL;
// console.log(Base_URL);
// let sanitizeUrl = (url: string): string => {
//   return url.replace(/([^:]\/)\/+/g, '$1');
// };
// const AUTH_URL = sanitizeUrl(Base_URL as any);
const AUTH_URL = Base_URL?.substr(0, Base_URL.lastIndexOf('/'));
// const AUTH_URL = 'http://localhost:8000';
// console.log(AUTH_URL);
// injecting authentication service into base service
const service = MailService.enhanceEndpoints({}).injectEndpoints({
  endpoints: (build) => ({
    initialAuthService: build.mutation<'', void>({
      query: () => ({
        method: 'POST',
        url: `${AUTH_URL}/checksession/`
      })
    }),
    logoutService: build.mutation<'', void>({
      query: () => ({
        method: 'POST',
        url: `${AUTH_URL}/web_app_logout/`
      })
    }),
    authenticateService: build.mutation<MailApiResponse<AuthResponseData>, UnAuththenticatedUser>({
      query: (data) => {
        return {
          method: 'POST',
          url: `${AUTH_URL}/web_app_login/`,
          body: data
        };
      }
    }),
    resetPasswordService: build.mutation<MailApiResponse<undefined>, ForgotPassword>({
      query: (data) => {
        return {
          method: 'POST',
          url: `${AUTH_URL}/forgotpassword/`,
          body: data
        };
      }
    }),
    resetPasswordLinkService: build.mutation<MailApiResponse<undefined>, { reset_link: string }>({
      query: (data) => {
        return {
          method: 'POST',
          url: `${AUTH_URL}/reset_link/`,
          body: data
        };
      }
    }),
    forgotPasswordService: build.mutation<
      MailApiResponse<undefined>,
      { reset_link: string; confirm_password: string; password: string; email_id: string }
    >({
      query: (data: any) => {
        return {
          method: 'POST',
          url: `${AUTH_URL}/resetpassword/`,
          body: data
        };
      }
    })
  }),
  overrideExisting: false
});

export const {
  useAuthenticateServiceMutation: useAuthenticateService,
  useInitialAuthServiceMutation: useInitialAuthService,
  useLogoutServiceMutation: useLogoutService,
  useResetPasswordServiceMutation: resetPasswordService,
  useForgotPasswordServiceMutation,
  useResetPasswordLinkServiceMutation,
  endpoints: { authenticateService, initialAuthService }
} = service;
