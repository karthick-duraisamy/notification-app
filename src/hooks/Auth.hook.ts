/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useInitialAuthService } from '../services/user/Users';
import { useAppSelector } from './App.hook';

// listens user and maintains auth state
const useAuth = () => {
  const { auth } = useAppSelector((state) => state.user);
  const [service] = useInitialAuthService();
  const [authentication, setauthentication] = useState(false);
  const iframe_token = sessionStorage.getItem('iframe_token');

  // initial load, check user
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get('param1');
    if (param === 'load_iframe') {
      if (iframe_token) {
        setauthentication(true);
      }
      // authentication = auth
    } else {
      if (auth === null) {
        const isLoadedInIframe = window !== window.parent;

        if (!isLoadedInIframe) service();
        // }
      }
    }
    // if (auth) setauthentication(auth);
  }, [window !== window.parent, iframe_token, auth, service]);
  // return auth;
  return authentication ? authentication : auth;
};

export { useAuth };
