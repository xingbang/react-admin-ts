import React, { useContext } from 'react';
import { Layout } from 'antd';
import { CustomProvider } from '@src/contextStore/CustomProvider';
import { Context } from '@src/contextStore/GlobalProvider';
import { Redirect, Route, Switch } from 'react-router-dom';
import SideMenu from '@src/components/SideMenu';
import menuData from '@src/router/router';
import { MenuDataItem } from '@src/router/router';
import LayoutHeader from '@src/components/LayoutHeader';
import { getRouterData } from '@src/router/routerCompoent';
import { Provider } from 'react-redux';
import { store } from '@src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import PermissionPage from '@src/components/PermissionPage';
import NotFound from '@src/pages/Exception/404';

import './index.less';

const { Content, Footer } = Layout;
const persistor = persistStore(store);

const LayoutDefault: React.FC = (props: any) => {
  const { g_state } = useContext(Context);
  const { Menu } = g_state;

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

  // console.log(pathAuto, 'pathAuto')

  return (
    <Layout className="layout-main" style={{ height: 'auto', minHeight: '100vh' }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CustomProvider>
            <SideMenu menuData={menuData} history={props.history} location={props.location} permission={Menu} />
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
                        console.log(item);
                        if (!pathAuto[item.path]) {
                          return <item.component {...props} />;
                        }
                        return (
                          <PermissionPage permission={pathAuto[item.path]} permissionList={Menu}>
                            <item.component {...props} />
                          </PermissionPage>
                        );
                      }}
                    />
                  ))}
                  <Route render={NotFound} />
                </Switch>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Made with ❤ by xingbang</Footer>
            </Layout>
          </CustomProvider>
        </PersistGate>
      </Provider>
    </Layout>
  );
};

export default LayoutDefault;
