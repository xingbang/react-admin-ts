import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { CustomProvider } from '@src/store/CustomProvider';
import { Redirect, Route, Switch } from 'react-router-dom';
import SideMenu from '@src/components/SideMenu';
import menuData from '@src/router/router';
import { MenuDataItem } from '@src/router/router';
import LayoutHeader from '@src/components/LayoutHeader';
import { getRouterData } from '@src/router/routerCompoent';
import PermissionPage from '@src/components/PermissionPage';
import './index.less';

const { Header, Content, Footer } = Layout;

const permission = [
  {
    id: 1000,
    permission: 'index'
  }
];

const LayoutDefault = (props: any) => {
  // 菜单权限path: persion
  const getPathAuto = (data: MenuDataItem[]) => {
    let obj: any = {};
    const format = (data: MenuDataItem[]) => {
      data.forEach((item: any) => {
        obj[`${item.path}`] = item.permission;
        if (item.children) {
          format(item.children);
        }
      });
    };
    format(data);
    return obj;
  };

  const pathAuto = getPathAuto(menuData);

  console.log(pathAuto, 'pathAuto');

  return (
    <Layout className="layout-main" style={{ height: 'auto', minHeight: '100vh' }}>
      <CustomProvider>
        <SideMenu menuData={menuData} history={props.history} location={props.location} permission={permission} />
        <Layout className="site-layout">
          <LayoutHeader />
          <Content
            className="site-layout-background"
            style={{
              margin: '0 16px',
              padding: 24,
              minHeight: 280
            }}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/book/hot" />} />
              {getRouterData().map((item: any) => (
                <Route
                  key={item.key}
                  path={item.path}
                  exact={true}
                  render={(props) => {
                    let isPermission: boolean = false;
                    permission.forEach((per: any) => {
                      if (per.permission === item.permission) {
                        isPermission = true;
                      }
                    });
                    if (!pathAuto[item.path]) {
                      return <item.component {...props} />;
                    }
                    return (
                      <PermissionPage isPermission={isPermission}>
                        <item.component {...props} />
                      </PermissionPage>
                    );
                  }}
                />
              ))}
              {/* <Route render={NotFound} /> */}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Made with ❤ by xingbang</Footer>
        </Layout>
      </CustomProvider>
    </Layout>
  );
};

export default LayoutDefault;
