import { useEffect, useState, type FunctionComponent } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PageNotFound from '../pages/Landing/PageNotFound/PageNotFound';
import {
  useGetLandingRoutesMutation,
  useGetMenuServiceMutation,
  useGetRoutesMutation
} from '../services/initializer/initializer';
import { Components, Layouts } from './route';
import { useDispatch } from 'react-redux';
import { setMenuServiceData } from '../stores/menu.store';
import { useAppSelector } from '../hooks/App.hook';
import trackingRoute from './../../public/trackingroute.json';
import { getBaseUrl } from '../Utils/baseurl';
import type { RouterResponse } from '../services/initializer/initializerTypes';
import { useResetPasswordLinkServiceMutation } from '../services/user/Users';
import { useAuth } from '../hooks/Auth.hook';
import { Loader } from '../components/Loader/Loader';
interface IrouteAPI {
  default?: boolean;
  component: FunctionComponent<any>;
  // layout: FunctionComponent<any>;
  layoutName: string;
  path: string;
}

interface IsubRoutes {
  layout: FunctionComponent<any>;
  children: IrouteAPI[];
}

interface ImainRoutes {
  [key: string]: IsubRoutes;
}

// To Generate the Router configurations
const mapRouting = (routingData: RouterResponse) => {
  if (!Components.has(routingData.component) || !Layouts.has(routingData.layout)) {
    console.error('Component or Layout are missing.');
    return null;
  }
  const route: IrouteAPI = {
    path: routingData.path,
    component: Components.get(routingData.component),
    // layout: Layouts.get(routingData.layout),
    layoutName: routingData.layout,
    default: routingData.default ? routingData.default : false
  };
  return route;
};

const AppRoute = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  // To get the menu and route from serive
  const [menuService, menuServiceStatus] = useGetMenuServiceMutation();

  // To check the reset password tokem will be correct or in-correct
  const [resetPasswordSerive, resetPasswordSeriveStatus] = useResetPasswordLinkServiceMutation();

  // To check whether user logged in or not
  const isAuthenticated = useAuth();

  // To get app routes based on react app
  const [authRoutesAPI, authRoutesResponse] = useGetRoutesMutation();

  // To get landing routes based on react app
  const [landingRoutesAPI, landingRoutesResponse] = useGetLandingRoutesMutation();

  // State is declared to save auth route details with component for dyanmic rendering
  const [activeRoutes, setActiveRoutes] = useState<IrouteAPI[]>([]);

  // State is declared to save auth route details with component for dyanmic rendering
  const [defaultRedirects, setDefaultRedirects] = useState<IrouteAPI[]>([]);

  const isLoadedInIframe = window !== window.parent;

  const [expTimestamp, setexpTimestamp] = useState();

  // let menuUrl: string | undefined =
  //   localStorage.getItem('baseUrl') !== 'undefined' &&
  //   localStorage.getItem('baseUrl') !== '' &&
  //   localStorage.getItem('baseUrl')
  //     ? localStorage.getItem('baseUrl')?.toString()
  //     : process.env.REACT_APP_API_URL;
  // const menuRequest: menuRequest = {
  //   url: (menuUrl?.substr(0, menuUrl.lastIndexOf('/')) as string) + '/menu/emailapi/'
  // };
  // To prepare the router JSON with components
  const updateRouteList = (routingList: any, setStateFunc: Function) => {
    let routeList: IrouteAPI[] = [];
    routingList.forEach((routingData: RouterResponse) => {
      let route = mapRouting(routingData);
      if (route !== null) routeList.push(route);
    });

    // Simply return the new state without assignment
    setStateFunc(() => [...routeList]);
  };
  let menuUrl: string | undefined = getBaseUrl();

  const menuRequest: any = {
    url:
      (menuUrl?.substr(0, menuUrl.lastIndexOf('/')) as string) +
      '/menu/' +
      menuUrl?.split('/')[menuUrl?.split('/').length - 1] +
      '/'
  };
  // const TokenMethod = () => {
  //   // const jwtString = ;
  //   // if (typeof jwtString === 'string') {
  //   //   const payloadPart = jwtString.split('.')[1];
  //   //   const decodedPayload = atob(payloadPart);
  //   //   let accessdata = JSON.parse(decodedPayload);
  //   //   setexpTimestamp(accessdata?.exp);
  //   // }
  // };
  useEffect(() => {
    if (isLoadedInIframe) {
      const jwtString = sessionStorage.getItem('iframe_token');
      if (typeof jwtString === 'string') {
        const payloadPart = jwtString.split('.')[1];
        const decodedPayload = atob(payloadPart);
        let accessdata = JSON.parse(decodedPayload);

        setexpTimestamp(accessdata?.exp);
      }
    }
  }, [sessionStorage.getItem('iframe_token')]);
  useEffect(() => {
    if (isLoadedInIframe) {
      let apiCallTimeout: NodeJS.Timeout | undefined; // Declare a variable to hold the setTimeout reference

      const makeAPICall = () => {
        // Make your API call here
        console.log('Making API call...');
        const message = 'get_access_token';
        window.parent.postMessage(message, '*');
      };

      const calculateExpiration = () => {
        const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds

        if (expTimestamp !== undefined) {
          const twoMinutesBeforeExpiry = expTimestamp - 120;
          const timeDifference = twoMinutesBeforeExpiry - currentTime;
          // const timeDifferenceInSeconds = expTimestamp - currentTime;
          // const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);

          // console.log('Time difference in minutes:', timeDifferenceInMinutes);
          // console.log(expTimestamp);
          // console.log(currentTime);
          if (timeDifference <= 0) {
            apiCallTimeout = setTimeout(makeAPICall, timeDifference * 1000); // Schedule API call

            console.log('Already past the time to make the API call.');
          } else {
            // Clear any existing timeout before setting a new one
            if (apiCallTimeout) {
              clearTimeout(apiCallTimeout);
            }

            apiCallTimeout = setTimeout(makeAPICall, timeDifference * 1000); // Schedule API call
          }
        }
      };

      calculateExpiration(); // Initial calculation

      const timer = setInterval(calculateExpiration, 60 * 1000); // Recalculate every minute

      return () => {
        clearInterval(timer); // Clean up the interval when the component unmounts
        clearTimeout(apiCallTimeout); // Clear the timeout on unmount as well
      };
    }
  }, [expTimestamp]);

  useEffect(() => {
    if (isLoadedInIframe) {
      const receiveMessageFromParent = (event: any) => {
        // console.log('message received');

        // if (event.origin !== 'http://127.0.0.1:5500/') {
        //   return;
        // }
        if (event.data.access) {
          if (typeof event.data === 'object') {
            if (event.data?.access) {
              sessionStorage.setItem('iframe_token', event.data?.access);
              setActiveRoutes([]);
              trackingRoute.length > 0 && updateRouteList(trackingRoute, setActiveRoutes);
            }
            if (event.data?.project_id) {
              sessionStorage.setItem('project_id', event.data?.project_id);
            }
            if (event.data?.baseUrl) {
              sessionStorage.setItem(
                'baseUrl',
                event?.data?.baseUrl[event?.data?.baseUrl.length - 1] === '/'
                  ? event?.data?.baseUrl?.slice(0, event?.data?.baseUrl?.length - 1)
                  : event?.data?.baseUrl
              );
              window.location.reload();
            }
            if (event.data?.setting_id) {
              sessionStorage.setItem('setting_id', event.data?.setting_id);
            }
            // TokenMethod(event?.data?.access);
          }
        }
        // Log the received message from the parent
        // console.log('Received message from parent:', event.data);
      };

      // Add event listener to listen for messages from the parent window
      window.addEventListener('message', receiveMessageFromParent);

      return () => {
        // Clean up the event listener when component unmounts
        window.removeEventListener('message', receiveMessageFromParent);
      };
    }
  }, []);

  useEffect(() => {
    if (isLoadedInIframe) {
      setActiveRoutes([]);
      trackingRoute.length > 0 && updateRouteList(trackingRoute, setActiveRoutes);
    } else {
      menuService(menuRequest);
    }
  }, [window !== window.parent]);
  useEffect(() => {
    if (isLoadedInIframe) {
      // Get the query parameters from the URL
      const searchParams = new URLSearchParams(window.location.search);
      // Access specific query parameters
      const param1 = searchParams.get('param1');
      if (param1 === 'load_iframe') {
        const message = 'get_access_token';
        window.parent.postMessage(message, '*'); // '*' allows sending messages to any origin
      }
    }
  }, []); // Load the routes based on authentication

  useEffect(() => {
    // By default load the landing routes
    if (isAuthenticated !== null) landingRoutesAPI([]);
    // Load the auth routes when user logged in
    if (isAuthenticated === true) authRoutesAPI([]);
  }, [isAuthenticated, authRoutesAPI, landingRoutesAPI]);

  useEffect(() => {
    if (localStorage.getItem('isResetLink') === '1') {
      localStorage.removeItem('isResetLink');
      // Use the following line for development server
      resetPasswordSerive({ reset_link: window.location.href.replace('https://mail-v2.grouprm.net/reset?', '') });
      // Use the following line for development work
      // resetPasswordSerive({ reset_link: window.location.href.replace('http://localhost:3000/reset?', '') });
    }
  }, [localStorage.getItem('isResetLink')]);

  useEffect(() => {
    if (resetPasswordSeriveStatus?.isSuccess && (resetPasswordSeriveStatus as any)?.data?.responseCode === 0) {
      localStorage.setItem(
        'resetPasswordData',
        JSON.stringify((resetPasswordSeriveStatus as any)?.data?.response.data)
      );
      navigate('/reset-password');
    }
  }, [resetPasswordSeriveStatus]);

  useEffect(() => {});

  // useEffect(() => {
  // if (menuServiceStatus.status === 'rejected') {
  //   setTimeout(() => {
  //     menuService(menuRequest);
  //   }, 3000);
  // }

  // if (menuServiceStatus?.isSuccess && (menuServiceStatus?.data as any)?.response?.data) {
  //   const value: any = (menuServiceStatus?.data as any)?.response?.data;
  //   dispath(setMenuServiceData({ value }));
  // }
  // }, [menuService, menuServiceStatus]);

  // useEffect(() => {
  //   if (!sessionStorage.getItem('iframe_token')) {
  //   }
  // }, []);

  useEffect(() => {
    if (menuServiceStatus?.isSuccess) {
      let value: any = menuServiceStatus?.data;
      dispath(setMenuServiceData({ value }));
    }
  }, [menuServiceStatus?.isSuccess]);

  const { menuServiceData } = useAppSelector((state) => state.MenuServiceReducer);

  /**
   * @description Called Routes API data are stored in state where JSON
   *              Object from API convert as dynamic component loader and
   *              stored in state for future use
   */
  useEffect(() => {
    if (!isLoadedInIframe) {
      // By default load the landing routes
      const landingRoutes: RouterResponse[] = landingRoutesResponse.isSuccess ? landingRoutesResponse.data : [];
      // Load the auth routes when user logged in
      if (isAuthenticated === true) {
        let authRoutes: any;
        // authRoutes =
        // menuServiceStatus?.isSuccess && (menuServiceStatus?.data as any)?.response?.data?.route.length > 0
        //   ? menuServiceData?.response?.data?.route
        //   : menuServiceStatus?.isSuccess && authRoutesResponse?.isSuccess
        //     ? authRoutesResponse?.data
        //     : [];
        authRoutes = [
          {
            route_id: 19,
            path: '/templates/:tab/:view',
            layout: 'HomeLayout',
            component: 'Templates',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 20,
            path: '/editor/:id',
            layout: 'TemplateLayout',
            component: 'Editor',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 21,
            path: '/editor/:type/:id',
            layout: 'TemplateLayout',
            component: 'Editor',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 22,
            path: '/templates/htmleditor',
            layout: 'HomeLayout',
            component: 'HtmlEditor',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 23,
            path: '/project',
            layout: 'HomeLayout',
            component: 'Project_V2',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 2334,
            path: '/inbox',
            layout: 'HomeLayout',
            component: 'InboxApp',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 24,
            path: '/project/:action',
            layout: 'HomeLayout',
            component: 'ProjectForm',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 25,
            path: '/mailer',
            layout: 'HomeLayout',
            component: 'Mailer',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 26,
            path: '/mailer/:action/:id',
            layout: 'HomeLayout',
            component: 'MailerOperations',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 27,
            path: '/variables',
            layout: 'HomeLayout',
            component: 'Variables',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 28,
            path: '/variables/:action',
            layout: 'HomeLayout',
            component: 'VariablesForm',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 29,
            path: '/variables/:action/:id',
            layout: 'HomeLayout',
            component: 'VariablesForm',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 30,
            path: '/settings',
            layout: 'HomeLayout',
            component: 'Settings',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 31,
            path: '/settings/:action',
            layout: 'HomeLayout',
            component: 'SettingsForm',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 32,
            path: '/tracking',
            layout: 'HomeLayout',
            component: 'Tracking',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 33,
            path: '/contacts',
            layout: 'HomeLayout',
            component: 'Contacts',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 331,
            path: '/manageGroup',
            layout: 'HomeLayout',
            component: 'ManageGroup_V3',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 3311,
            path: '/manageGroup/:action',
            layout: 'HomeLayout',
            component: 'ManageGroupForm',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 3312,
            path: '/manageGroup/:action/:id',
            layout: 'HomeLayout',
            component: 'GroupViewPage_V3',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 332,
            path: '/segments',
            layout: 'HomeLayout',
            component: 'Segments',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 3321,
            path: '/segments/:action',
            layout: 'HomeLayout',
            component: 'CreateSegment',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 3321,
            path: '/segments/view',
            layout: 'HomeLayout',
            component: 'ViewSegment',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 34,
            path: '/contacts/:action/:id',
            layout: 'HomeLayout',
            component: 'ContactsForm',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 18,
            path: '/dashboard',
            layout: 'HomeLayout',
            component: 'Dashboard',
            default: 1,
            permission: ['all']
          },
          {
            route_id: 35,
            path: '/campaign',
            layout: 'HomeLayout',
            component: 'Campaign',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 36,
            path: '/campaign/:action/:id',
            layout: 'HomeLayout',
            component: 'ViewCampaign',
            default: 0,
            permission: ['all']
          },
          {
            route_id: 37,
            path: '/campaign/:action',
            layout: 'HomeLayout',
            component: 'CampaignForm',
            default: 0,
            permission: ['all']
          }
        ];

        //Reset the active routes
        setActiveRoutes([]);
        authRoutes.length > 0 && updateRouteList(authRoutes, setActiveRoutes);
        landingRoutes.length > 0 && updateRouteList(landingRoutes, setDefaultRedirects);
      } else if (isAuthenticated === false) {
        landingRoutes.length > 0 && updateRouteList(landingRoutes, setActiveRoutes);
      }
    }
  }, [isAuthenticated, authRoutesResponse, landingRoutesResponse, menuServiceData, menuServiceData?.route]);

  // To wait until session check service complete and verify user logged in or not
  if (!isLoadedInIframe && isAuthenticated === null) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // When user try to access landing page unauthorised page then redirect to default page
  const redirects = ['/', ...defaultRedirects.map((item) => item.path)];

  // To redirect default page after logged in or landing page
  const [defaultRoute] = activeRoutes.filter((config) => config && config.default);

  // To wait until page load
  if (!defaultRoute) return null;

  //Format the layout based routing
  let routes: ImainRoutes = {};
  activeRoutes.map((value) => {
    if (!(value.layoutName in routes))
      routes[value.layoutName] = { layout: Layouts.get(value.layoutName), children: [] };

    routes[value.layoutName].children.push(value);
    return true;
  });
  return (
    <Routes>
      {/* while logged in, if user tries to go '/login', he should'nt  be treated with '/404',
          but instead should be redirected to 'auth-routes default rotue', vice-versa */}
      {redirects.map((path, key) => (
        <Route key={'redirect_' + key} path={path} element={<Navigate to={defaultRoute.path} />} />
      ))}
      {Object.values(routes).map((layouts, key) => {
        const childRoute: IrouteAPI[] = layouts.children;
        return (
          <Route path="/" key={'active_' + key} element={<layouts.layout />}>
            {childRoute.map((routeConfig, index) => (
              <Route key={'subRoute_' + index} path={routeConfig.path.slice(1)} element={<routeConfig.component />} />
            ))}
          </Route>
        );
      })}
      <Route path="/404" element={<PageNotFound />} />
      {isAuthenticated ? (
        <Route path="*" element={<Navigate replace={true} to="/404" />} />
      ) : (
        <Route path="*" element={<Navigate replace={true} to="/login" />} />
      )}
    </Routes>
  );
};

export { AppRoute };
