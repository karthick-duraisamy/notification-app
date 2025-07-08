import { Layout, Menu, Drawer, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Icon, { MenuOutlined } from '@ant-design/icons';
import './Menu.scss';
import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetMenuServiceMutation, useGetMenusMutation } from '../../services/initializer/initializer';
import { setMenuServiceData } from '../../stores/menu.store';
import { getMenuUrl } from '../../Utils/baseurl';
import { useResize } from '../../Utils/resize';
import { useTheming } from '../../hooks/Theme.hook';
import { Icons } from '../Icons/MenuIcon';
import { SkeletonLoaderMenuItem } from '../UI/SkeletonLoader/SkeletonLoader';
import { useAppSelector } from '../../hooks/App.hook';
import type { MenuInterface, SubMenuInterface } from '../../services/initializer/initializerTypes';
import { useSelector } from 'react-redux';
import { AppState } from '../../../src/stores/Store';
import { setLayoutOption } from '../../stores/layoutSlice';

const MenuCard = (props: MenuInterface | SubMenuInterface) => {
  const { t } = useTranslation();
  const link = props.path;
  const IconComponent = props.iconName ? Icons.get(props.iconName) : '';
  const menuIcon = t(props.name);
  return (
    <>
      <Link to={link} />
      {IconComponent ? <Icon component={IconComponent} /> : ''}
      <span className="content">{menuIcon}</span>
    </>
  );
};
const SkeletonLoaderMenuItems = [
  {
    label: <SkeletonLoaderMenuItem />,
    key: 'SkeletonLoaderMenuItem'
  }
];
const { Sider } = Layout;
const SideBar = () => {
  const dispath = useDispatch();
  const { menuServiceData } = useAppSelector((state) => state.MenuServiceReducer);
  const [menuList, setMenuList] = useState<any[]>([]);
  const [menuListAPI, menuListAPIService] = useGetMenusMutation();
  const [menuServiceAPI, menuServiceAPIService] = useGetMenuServiceMutation();
  let menuUrl: string | undefined = getMenuUrl();
  const menuRequest: any = {
    url:
      (menuUrl?.substr(0, menuUrl.lastIndexOf('/')) as string) +
      '/menu/' +
      menuUrl?.split('/')[menuUrl?.split('/').length - 1] +
      '/'
  };

  // State to track the visibility of the menu
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  // Get the value of isSmallScreen from the custom hook
  const { isSmallScreen } = useResize();
  const layout = useSelector((state: AppState) => state.layout.mode);
  const isVertical = layout === 'vertical';
  const menuRef = useRef(null);
  const backgroundColor = useSelector((state: AppState) => state.layout.menuBackgroundColor);
  const textColor = useSelector((state: AppState) => state.layout.menuTextColor);
  const activeBgColor = useSelector((state: AppState) => state.layout.activeMenuBackgroundColor);
  const activeTextColor = useSelector((state: AppState) => state.layout.activeMenuTextColor);
  const primaryIconColor = useSelector((state: AppState) => state.layout.primaryMenuIconColor);
  const secondaryIconColor = useSelector((state: AppState) => state.layout.secondaryMenuIconColor);

  useEffect(() => {
    if (menuRef.current) {
      // const currentBg = getComputedStyle(menuRef.current).backgroundColor;
      if (backgroundColor === '#ffffff') {
        dispath(setLayoutOption({ key: 'menuBackgroundColor', value: backgroundColor }));
      }
    }
  }, [dispath, backgroundColor]);

  useEffect(() => {
    if (menuListAPIService.status === 'uninitialized') {
      setTimeout(() => {
        menuListAPI([]);
      }, 3000);
    }
    // if (menuListAPIService.isSuccess) {
    //   setMenuList(menuServiceData?.menu.length > 0 ? menuServiceData?.menu : menuListAPIService.data);
    // }
  }, [menuListAPIService, menuListAPI]);

  useEffect(() => {
    if (!sessionStorage.getItem('iframe_token')) {
      menuServiceAPI(menuRequest);
    }
  }, []);

  useEffect(() => {
    if (menuServiceAPIService?.isSuccess) {
      let value: any = menuServiceAPIService?.data;
      dispath(setMenuServiceData({ value }));
      // setMenuList(
      //   (menuServiceAPIService?.data as any)?.response?.data?.menu.length > 0
      //     ? (menuServiceAPIService?.data as any)?.response?.data?.menu
      //     : menuServiceAPIService?.isSuccess && menuListAPIService?.isSuccess
      //       ? menuListAPIService.data
      //       : []
      // );
      setMenuList([
        {
          menu_code: 'dashboard',
          path: '/dashboard',
          icon_name: 'DashBoardIcon',
          subMenu: []
        },
        {
          menu_code: 'inbox',
          path: '/inbox',
          icon_name: 'MailerIcon',
          subMenu: []
        },
        {
          menu_code: 'Library',
          path: '',
          icon_name: 'SettingsIcon',
          subMenu: [
            {
              name: 'Templates',
              menu_code: 'templates',
              path: '/templates/:type/:id',
              icon_name: 'TemplateIcon'
            },
            {
              name: 'Variables',
              menu_code: 'variables',
              path: '/variables',
              icon_name: 'VariablesIcon'
            }
          ]
        },
        {
          menu_code: 'Configuration',
          path: '',
          icon_name: 'MailerIcon',
          subMenu: [
            {
              name: 'ChannelBinding',
              menu_code: 'channelBinding',
              path: '/mailer',
              icon_name: 'MailerIcon'
            },
            {
              name: 'Settings',
              menu_code: 'settings',
              path: '/settings',
              icon_name: 'SettingsIcon'
            }
          ]
        },
        {
          menu_code: 'project',
          path: '/project',
          icon_name: 'ProjectIcon',
          subMenu: []
        },
        {
          menu_code: 'tracking',
          path: '/tracking',
          icon_name: 'TrackingIcon',
          subMenu: []
        },
        {
          menu_code: 'contacts',
          path: '/manageGroup',
          icon_name: 'ContactsIcon',
          subMenu: []
        },
        {
          menu_code: 'campaign',
          path: '/campaign',
          icon_name: 'CampaignIcon'
        }
      ]);
    }
  }, [menuServiceAPIService?.isSuccess]);

  // useEffect(() => {
  //   if (menuServiceStatus.status === 'uninitialized') {
  //     setTimeout(() => {
  //       menuService([]);
  //     }, 3000);
  //   }

  //   if (menuServiceStatus?.isSuccess && (menuServiceStatus?.data as any)?.response?.data?.menu.length > 0) {
  //     setMenuList((menuServiceStatus?.data as any)?.response?.data?.menu);
  //   } else if (menuListAPIService.isSuccess) {
  //     setMenuList(menuListAPIService?.data);
  //   }
  // }, [menuServiceStatus, menuService]);

  const navigate = useNavigate();

  const menuAntdMapping = (label: ReactElement, key: string, icon: string = '') => {
    return {
      label: label,
      key: key,
      icon: icon ? <Icon component={Icons.get(icon)} /> : null,
      onClick: () => {
        if (sessionStorage.getItem('isDashboardTracking')) sessionStorage.removeItem('isDashboardTracking');
        if (key.includes('templates')) {
          // const prevLocation = localStorage.getItem("lastLocation");
          // if (prevLocation) {
          // }
          navigate('/templates/saved/default');
        }
      }
    };
  };

  const menuItems = menuList.map((menuData: any, index) => {
    let key = menuData.path || menuData.menu_code;
    let menuItem: any = menuAntdMapping(
      <MenuCard
        key={index}
        path={menuData.path}
        iconName={menuData?.icon_name ? menuData?.icon_name : menuData.iconName}
        name={
          menuData.menu_code ? menuData.menu_code.charAt(0).toUpperCase() + menuData.menu_code.slice(1) : menuData.name
        }
      />,
      key
    );
    if (menuData.subMenu) {
      if (menuData.subMenu.length > 0) {
        let subMenuItem: any = menuData.subMenu.map((subMenuList: any) => {
          return menuAntdMapping(
            <MenuCard
              path={subMenuList.path}
              name={subMenuList.name}
              iconName={subMenuList?.icon_name ? subMenuList?.icon_name : subMenuList.iconName}
            />,
            subMenuList.path,
            subMenuList.iconName
          );
        });

        menuItem['children'] = subMenuItem;
      }
    }
    return menuItem;
  });

  const { theme } = useTheming();
  const { pathname } = useLocation();
  // const [authentication, setauthentication] = useState(false);
  // const iframe_token = sessionStorage.getItem("iframe_token");
  const isLoadedInIframe = window !== window.parent;

  // the following function is used to  Menu visibility
  const handleMenu = () => {
    setDrawerVisible((value: boolean) => !value);
  };

  // If no exact match, it tries to match the `pathname` against all menu paths using **regular expressions**, assuming paths like `/templates/:type/:id` should match real paths like `/templates/saved/123`.

  const pathToRegex = (path: string): RegExp => {
    // Convert dynamic route to regex
    const pattern = path
      .replace(/\/:[^/]+/g, '/[^/]+') // Replace :params with wildcard
      .replace(/\//g, '\\/'); // Escape slashes
    return new RegExp(`^${pattern}$`);
  };
  // Defines a function named `getSelectedKey` that takes:
  // - `pathname`: a string representing the current URL path.
  // - `menus`: an array of menu items (possibly nested).
  // It returns a `string`, which is the best-matching path from the menu.
  const getSelectedKey = (pathname: string, menus: any[]): string => {
    const allPaths: string[] = [];

    // Defines a helper function `collectPaths` to **recursively collect all menu paths**, including nested submenus.

    const collectPaths = (items: any[]) => {
      for (const item of items) {
        // If the menu item has a `path`, it's added to the `allPaths` array.
        if (item.path) allPaths.push(item.path);
        if (item.subMenu?.length) collectPaths(item.subMenu);
      }
    };

    collectPaths(menus);

    // 1. Check exact match
    // Checks for an **exact match** between the current `pathname` and any collected path.
    const exactMatch = allPaths.find((path) => path === pathname);
    if (exactMatch) return exactMatch;

    // 2. Check regex match for dynamic routes
    const regexMatch = allPaths.find((menuPath) => pathToRegex(menuPath).test(pathname));
    if (regexMatch) return regexMatch;

    // 3. Fallback: Closest matching prefix (longest first)
    // Creates a new array with all paths sorted **from longest to shortest**. Longer matches are more specific, so they are checked first.
    const sortedPaths = [...allPaths].sort((a, b) => b.length - a.length);
    for (const path of sortedPaths) {
      if (pathname.startsWith(path)) return path;
    }

    // 4. If all fails, just return the raw pathname
    return pathname;
  };

  return (
    <>
      <style>
        {`
        .Menu .ant-menu-item-selected,
        .Menu .ant-menu-item-selected:hover,
        .Menu .ant-menu-submenu-selected,
        .Menu .ant-menu-submenu-selected:hover {
          background-color: ${activeBgColor} !important;
        }
        .Menu .ant-menu-item-selected span,
        .Menu .ant-menu-item-selected:hover span,
        .Menu .ant-menu-submenu-selected span,
        .Menu .ant-menu-submenu-selected:hover span{
          color: ${activeTextColor} !important;
        }
        .Menu{
          --logo-color: ${primaryIconColor};
          --sec-logo-color: ${secondaryIconColor};
        }
      `}
      </style>
      {!isLoadedInIframe ? (
        <>
          {/* mobile view  */}
          {isSmallScreen ? (
            <>
              <div className="cls-mainmenu">
                <Button type="primary" className="cls-submenu" onClick={handleMenu} icon={<MenuOutlined />} />
                <Drawer title="Menu" placement="right" closable onClose={handleMenu} open={drawerVisible} width={250}>
                  <Menu
                    mode="vertical"
                    theme={theme === 'light' ? 'light' : 'dark'}
                    selectedKeys={[getSelectedKey(pathname, menuList)]}
                    items={menuItems.length > 0 ? menuItems : SkeletonLoaderMenuItems}
                    onClick={handleMenu}
                  />
                </Drawer>
              </div>
            </>
          ) : // desktop View
          isVertical ? (
            <Sider
              width={'100px'}
              style={{
                display: menuServiceData?.response?.data?.menu?.length === 0 ? 'none' : ''
              }}
              collapsedWidth="200px"
              breakpoint="md"
              className="Menu"
            >
              <Menu
                mode="vertical"
                theme={theme === 'light' ? 'light' : 'dark'}
                defaultSelectedKeys={['/']}
                style={{
                  height: '100%',
                  borderRight: 0,
                  backgroundColor,
                  transition: 'background-color 0.3s ease',
                  ['--menu-text-color' as any]: textColor
                }}
                selectedKeys={[getSelectedKey(pathname, menuList)]}
                items={menuItems.length > 0 ? menuItems : SkeletonLoaderMenuItems}
              />
            </Sider>
          ) : (
            <Menu
              mode="horizontal"
              theme={theme === 'light' ? 'light' : 'dark'}
              defaultSelectedKeys={['/']}
              style={{
                height: '100%',
                borderRight: 0,
                backgroundColor,
                transition: 'background-color 0.3s ease',
                ['--menu-text-color' as any]: textColor
              }}
              selectedKeys={[getSelectedKey(pathname, menuList)]}
              items={menuItems.length > 0 ? menuItems : SkeletonLoaderMenuItems}
            />
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
};

export { SideBar };
