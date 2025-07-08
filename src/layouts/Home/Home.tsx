import { Avatar, Col, Dropdown, Layout, Menu, Row } from 'antd';
import styled from 'styled-components';
import { HeaderItems } from '../../components/Header/Header';
import { SideBar } from '../../components/Menu/Menu';
import AccessibilityHeader from '../../components/AccessibilityHeader/AccessibilityHeader';
import './Home.scss';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useResize } from '../../Utils/resize';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { Logo } from '../../components/Logo/Logo';
import { Footer } from '../../components/Footer';
import { useAppSelector } from '../../hooks/App.hook';
const { Header, Content } = Layout;
const iframe_token = sessionStorage.getItem('iframe_token');
const isLoadedInIframe = window !== window.parent;

const ContainerLayout = styled(Layout)`
  min-height: 100%;

  .ant-layout-header {
    background-color: var(--theme-header-background);
    padding: 0px;
    line-height: unset;

    .container {
      height: 100%;
      padding: 0px 20px;
      align-items: center;
    }
  }
  .ant-layout {
    background: var(--theme-home-layout-background);
  }
   
}
    
`;

const HomeLayout = () => {
  const { user } = useAppSelector((state) => state.user);
  let userName = user?.name;

  // Get the value of isSmallScreen from the custom hook
  const { isSmallScreen } = useResize();

  //State to track the visibility of the drawer
  const [visible, setVisible] = useState(false);

  // the following function is used to  Menu visibility
  const handleMenu = (value: boolean) => {
    setVisible(value);
  };

  //Menu component with items and  close icon
  const menu = (
    <Menu>
      <Menu.Item onClick={() => handleMenu(false)} className="cls-closeicon">
        <CloseOutlined />
      </Menu.Item>
      <Menu.Item>
        <HeaderItems />
      </Menu.Item>
    </Menu>
  );

  return (
    <ContainerLayout className="Home" data-testid="home">
      <AccessibilityHeader />
      {!isLoadedInIframe ? (
        <Header>
          <Row className="container">
            {isSmallScreen ? (
              <>
                <Logo page={'afterLogin'} />
                <Col xs={12} sm={12} className="cls-circle ">
                  <Dropdown overlay={menu} trigger={['click']} open={visible} onOpenChange={() => handleMenu(true)}>
                    <div>
                      <Avatar shape="circle" alt={userName} children={userName?.slice(0, 1)} />
                    </div>
                  </Dropdown>
                </Col>
                <Breadcrumb />
              </>
            ) : (
              <>
                <Logo page={'aftreLogin'} />
                <Breadcrumb />
                <HeaderItems />
              </>
            )}
          </Row>
        </Header>
      ) : (
        ''
      )}
      <Layout>
        <SideBar />
        <Layout className="layout">
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      {!iframe_token ? <Footer /> : ''}
    </ContainerLayout>
  );
};

export default HomeLayout;
