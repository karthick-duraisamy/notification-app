import { Row, Col, Avatar, Button, Popover, Select } from 'antd';
import { ExpandOutlined, CompressOutlined, CaretDownFilled, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../hooks/App.hook';
import { useDispatch } from 'react-redux';
import { useLogoutService } from '../../services/user/Users';
import './Header.scss';
import { useEffect, useState } from 'react';
import Language from '../Language/Language';
import { useGetProjectSelection } from '../../hooks/Selection.hook';
import { setTemplateProjectId, setTimeFormat, setTrackingModuleInfo } from '../../stores/TemplateProject.store';
import { useLazyGetProjectQuery } from '../../services/project/Project';
import { handleCustomFont } from '../../Utils/user';
import { FONTS_CONFIG } from '../../pages/Authenticated/Templates/FontConfig';
import { useResize } from '../../Utils/resize';
import { delUser } from '../../stores/User.store';
import { useTheming } from '../../hooks/Theme.hook';
import { ThemeChanger } from '../ThemeChanger/ThemeChanger';
import { useAuth } from '../../hooks/Auth.hook';
const HeaderItems = () => {
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  const { user } = useAppSelector((state) => state.user);
  const [isFullScreen, setIsFullscreen] = useState(false);
  const [getProjects, getProjectsData] = useLazyGetProjectQuery();
  const [baseURL, setURL] = useState();
  let userName = user?.name;
  const dispath = useDispatch();
  const { selectProject } = useGetProjectSelection();
  const { changeTheme } = useTheming();

  // Get the value of isSmallScreen from the custom hook
  const { isSmallScreen } = useResize();

  const { Option } = Select;
  if (userName && userName.includes('@')) {
    userName = userName.split('@')[0];
    userName = userName.slice(0, 1).toUpperCase() + userName.slice(1).toLowerCase();
  }

  // const iframe_token = sessionStorage.getItem('iframe_token');
  const toggleScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('airline_code')) {
      setURL(localStorage.getItem('airline_code') as any);
    }
  }, [localStorage.getItem('airline_code')]);

  // The following method is used to update the changed project if to store and local storage.
  const handleChanges = (value: number) => {
    const selectedProject = selectProject.find((lang: any) => lang.value === value || lang.id === value);
    localStorage.setItem('project_code', selectedProject?.code);
    const projectCode = selectedProject?.code?.toLocaleLowerCase() || '';
    if (
      ['xy', '6e', 'qr'].some((code) => projectCode.includes(code)) &&
      sessionStorage.getItem('iframe_token') !== null
    ) {
      changeTheme(
        projectCode?.includes('xy')
          ? 'XY'
          : projectCode?.includes('6e')
          ? 'Indigo'
          : projectCode.includes('qr')
          ? 'QR'
          : 'light'
      );
    } else changeTheme('light');
    localStorage.setItem('project', value?.toString());
    // getProjects({ project_id: value.toString() });
    localStorage.setItem('fontInfo', JSON.stringify(FONTS_CONFIG));
    dispath(setTemplateProjectId({ value }));
    window.location.reload();
  };

  useEffect(() => {
    if (project !== undefined) getProjects({ project_id: (project as string)?.toString() });
  }, [project]);

  useEffect(() => {
    if (getProjectsData?.isSuccess && getProjectsData?.data?.responseCode === 0) {
      if ((getProjectsData as any)?.data?.response?.data?.customizations?.font?.length > 0) {
        let dynamicFont = handleCustomFont((getProjectsData as any)?.data?.response?.data?.customizations?.font);
        localStorage.setItem('fontInfo', JSON.stringify(dynamicFont));
      }
      let trackingModule = (getProjectsData as any)?.data?.response?.data?.customizations?.tracking;
      dispath(setTrackingModuleInfo({ trackingModule }));
      let value = (getProjectsData as any)?.data?.response?.data?.customizations?.timezone_conversion;
      dispath(setTimeFormat({ value }));
      localStorage.setItem('isTimeZone', value?.toLocaleLowerCase()?.includes('local') ? '1' : '0');
    }
  }, [getProjectsData]);

  return (
    <Col
      flex="auto"
      xs={12}
      sm={12}
      md={20}
      lg={24}
      xl={24}
      xxl={24}
      className="menu-row HeaderItems"
      data-testid="header"
    >
      <Row justify="end">
        <Col className="header-side-buttons d-flex">
          {baseURL ? (
            <Row align="middle">
              <Col style={{ marginRight: '15px' }}>
                <label className="f-sbold">API: &nbsp;</label>
                {baseURL}
              </Col>
            </Row>
          ) : (
            ''
          )}
          {project ? (
            <Select
              placeholder="Select Project"
              style={{ width: '125px', paddingTop: '2px' }}
              showSearch
              defaultValue={project as null | undefined | number}
              notFoundContent={'Not Found'}
              optionFilterProp="children"
              onChange={handleChanges}
              className="cls-select"
              filterOption={(input, option) =>
                (option as any)?.children?.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {selectProject &&
                selectProject.map((lang: any, index: any) => {
                  return (
                    <Option value={lang.value ? lang.value : lang.id} key={index}>
                      {lang.label}
                    </Option>
                  );
                })}
            </Select>
          ) : (
            <></>
          )}

          <>
            <Button type="link" style={{ paddingRight: 0, margin: '3px' }}>
              <Language />
            </Button>
          </>
          <>
            <div className="cls-screen-theme">
              <ThemeChanger />
              <Button data-testid="header_toggle_screen" type="link" onClick={toggleScreen}>
                {isFullScreen ? (
                  <CompressOutlined className="cls-screen-expand-collapse" />
                ) : (
                  <ExpandOutlined className="cls-screen-expand-collapse" />
                )}
              </Button>
            </div>
          </>
          {isSmallScreen ? (
            <>
              <ProfileDropDown />
            </>
          ) : (
            <>
              <Button type="link" className="cls-user-profile">
                <Popover
                  data-testid="log_out_ele"
                  trigger="click"
                  overlayClassName="user-actions"
                  placement="bottomRight"
                  content={<ProfileDropDown />}
                  title={null}
                >
                  <Avatar shape="circle" alt={userName} children={<>{userName?.slice(0, 1)}</>} />
                  <span className="loggedUser">{userName}</span>
                  <CaretDownFilled className="dropdown" />
                </Popover>
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Col>
  );
};

const ProfileDropDown = () => {
  const dispath = useDispatch();
  const [service] = useLogoutService();

  //To redirect on login page after logout
  const auth = useAuth();
  useEffect(() => {
    if (auth === false) window.location.href = '/';
  }, [auth]);

  const onLogoutClick = () => {
    // localStorage.removeItem('airline_code');
    service();
    dispath(delUser());
  };

  return (
    <ul className="mb-0 cls-list">
      <li>
        <Button block icon={<EditOutlined />} style={{ textAlign: 'left' }} type="text">
          Edit Profile
        </Button>
      </li>
      <li>
        <Button
          onClick={onLogoutClick}
          block
          icon={<LogoutOutlined rotate={180} />}
          type="text"
          className="cls-flex-start"
        >
          Logout
        </Button>
      </li>
    </ul>
  );
};

export { HeaderItems };
