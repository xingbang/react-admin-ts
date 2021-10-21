import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import routes, { rootSubmenuKeys } from '@src/router';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Menus = () => {
  const pathnameArr = window.location?.pathname.split('/');
  const currentOpenKeys = pathnameArr.slice(0, 2).join('/');
  const [openKeys, setOpenKeys] = useState([currentOpenKeys]);

  // console.log('rootSubmenuKeys', rootSubmenuKeys);
  // console.log('currentOpenKeys', currentOpenKeys);
  // console.log('pathnameArr', pathnameArr);

  const onOpenChange = (keys: any) => {
    // console.log(keys);
    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
    rootSubmenuKeys.indexOf(latestOpenKey) === -1 ? setOpenKeys(keys) : setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Sider>
      {routes.map((routeItem) => (
        <div key={routeItem.path + routeItem.name}>
          <div className="layout-tit">{routeItem.name}</div>
          <Menu mode="inline" theme="dark" onOpenChange={onOpenChange} openKeys={openKeys} selectedKeys={[window.location?.pathname]}>
            {routeItem.children.map((mainPage) => {
              const MenuItem = (
                <Menu.Item key={mainPage.path}>
                  <Link key={mainPage.path} to={mainPage.path}>
                    {mainPage.name}
                  </Link>
                </Menu.Item>
              );
              const SubMenuCpt = (
                <SubMenu key={mainPage.path} title={mainPage.name}>
                  {(mainPage.children || []).map((Subpage) => {
                    if (!Subpage.isHide) {
                      return (
                        <Menu.Item key={Subpage.path}>
                          <Link key={Subpage.path} to={Subpage.path}>
                            {Subpage.name}
                          </Link>
                        </Menu.Item>
                      );
                    }
                  })}
                </SubMenu>
              );
              return !mainPage.children ? !mainPage.isHide && MenuItem : SubMenuCpt;
            })}
          </Menu>
        </div>
      ))}
    </Sider>
  );
};

export default withRouter(Menus);
