// Define an interface for the entire config object

import CFG from '../config/config.json';
interface Airline {
  airline_code: string;
  url: string;
}

// Check if the query parameter exists in the urlMappings object
const airlineConfig: { [key: string]: Airline } = CFG.airline;

const queryParam_local = window.location.href.split('?')[1];
const isLoadedInIframe = window !== window.parent;
const queryParam = window.location.href.split('?')[1];

if (queryParam_local) {
  localStorage?.setItem('queryParam_local', queryParam_local);
} else {
  localStorage.removeItem('queryParam_local');
}

const getBaseUrl = (): string => {
  if (queryParam) {
    sessionStorage.setItem('query_params', queryParam);
  } else {
    sessionStorage.removeItem('query_params');
  }

  // Assuming queryParam is a string
  if (queryParam && airlineConfig[queryParam]) {
    localStorage.setItem('airline_code', airlineConfig[queryParam].airline_code);
    return airlineConfig[queryParam].url;
  }
  if (isLoadedInIframe) {
    const sessionStorageBaseUrl = sessionStorage.getItem('baseUrl');
    if (sessionStorageBaseUrl) {
      return sessionStorageBaseUrl;
    }
  }
  if (!isLoadedInIframe) {
    const localStorageBaseUrl = localStorage.getItem('baseUrl');
    if (localStorageBaseUrl && localStorageBaseUrl !== 'undefined' && localStorageBaseUrl !== '') {
      return localStorageBaseUrl;
    }
  }
  return import.meta.env.VITE_API_URL || '/';
};

const getMenuUrl = (): string | undefined => {
  const queryParams = localStorage.getItem('queryParam_local');
  if (queryParams === 'c6a0e7c2e78ced7f024313cb92b897a3') {
    return CFG.WN_URL;
  } else if (queryParams === '58806e006b14b04a535784a5462d09b0') {
    return CFG.JA_URL;
  } else if (queryParams === '8e3eb2c69a184ad1d448afe5985f50b3') {
    return CFG.NZ_URL;
  } else if (queryParams === 'eb56daa50d41428baf0100d40253f481') {
    return CFG.SIX_E_URL;
  } else if (queryParams === '74c53bcd3dcb2bb79993b2fec37d362a') {
    return CFG.XY_URL;
  } else if (queryParams === 'd67f249b90615ca158b1258712c3a9fc') {
    return CFG.RM_URL;
  } else if (queryParams === '631de3eab18d35e667a73157e91a8aa6') {
    return CFG.AK_LIVE;
  } else if (queryParams === 'caa2bddffe733667adc903cafa68be0c') {
    return CFG.AK_UAT;
  } else if (queryParams === '3708e5a2cb40d3b140ef4f894908a14d') {
    return CFG.FZ_UAT;
  } else if (queryParams === 'b35d85bda809a8ee7b7b2f125553bf51') {
    return CFG.WN_STAGING;
  } else if (queryParams === '19e538ec0219b603c4084ff59466eec3') {
    return CFG.FZ_TEST;
  } else if (queryParams === '952e108649eee4b686c2431edc8fcd17') {
    return CFG.VB_URL;
  } else if (queryParams === '0a40e3c91a3a55c9a37428c6d194d0e5') {
    return CFG.AI_URL;
  } else if (queryParams === 'f5ddaf0ca7929578b408c909429f68f2') {
    return CFG.LOCAL_URL;
  } else if (queryParams === '2dc91da7332b25b78c7752f5f830ac44') {
    return CFG.CT_PROD;
  } else if (queryParams === '67a7c9cc86d4ae431c139d802a9df22c') {
    return CFG.CT_TEST;
  } else if (queryParams === '6a7a49bfa67ce91c402c76086f1944ba') {
    return CFG.XY_TEST_URL;
  } else if (queryParams === 'dd480f25b31ec27223fee2c6edcacb3c') {
    return CFG.KM_URL;
  } else if (queryParam === 'f9c24782c24c237d16e79f18e2fa9046') {
    return CFG.RX_URL;
  } else {
    const queryParam = window.location.href.split('?')[1];
    if (queryParam === '58806e006b14b04a535784a5462d09b0') {
      return CFG.JA_URL;
    } else if (queryParam === 'c6a0e7c2e78ced7f024313cb92b897a3') {
      return CFG.WN_URL;
    } else {
      const localStorageBaseUrl = localStorage.getItem('baseUrl');
      if (localStorageBaseUrl && localStorageBaseUrl !== 'undefined' && localStorageBaseUrl !== '') {
        return localStorageBaseUrl;
      } else {
        return import.meta.env.VITE_API_URL || undefined;
      }
    }
  }
};

export { getBaseUrl, getMenuUrl };
