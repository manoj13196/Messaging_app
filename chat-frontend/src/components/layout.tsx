
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { UsersPage } from '../pages/users';
import { HeaderBar } from './header';

const { Header, Sider, Content } = Layout;

const Lay: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider>
        <div className="demo-logo-vertical" />
        <UsersPage/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <HeaderBar/>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            // minHeight: 280,
            height:"80vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Lay;