import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Routes from '@src/components/Routes';
import Menus from '@src/components/Menus';

import './index.less';

const { Header, Content, Footer } = Layout;

const LayoutDefault = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  console.log(props);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout-main" style={{ height: 'auto', minHeight: '100vh' }}>
      <Menus />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle
          })}
        </Header>
        <Breadcrumb style={{ margin: '16px' }}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>公告</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            margin: '0 16px',
            padding: 24,
            minHeight: 280
          }}>
          <Routes />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Made with ❤ by xingbang</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutDefault;
