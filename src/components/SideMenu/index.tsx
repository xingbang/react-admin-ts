import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu } from 'antd';
import { Context } from '@src/contextStore/CustomProvider';
import type { MenuDataItem } from '@src/router/router';
import type { RouteComponentProps } from 'react-router-dom';
import styles from './index.less';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

type MenuId = number; // 菜单的主键ID；

export interface PermissionModelState {
  loading?: boolean;
  // 菜单权限 键-值：菜单权限标识-主键ID
  menuMarkMap: {
    [propName: string]: MenuId;
  };
  // 按钮权限 键-值：按钮权限标识-主键ID
  buttonMap: {
    [propName: string]: MenuId;
  };
}

interface ISideMenuProps {
  menuData: MenuDataItem[];
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
  permission: PermissionModelState;
}

const SideMenu = (props: ISideMenuProps) => {
  const { _state } = useContext(Context);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  let rootSubmenuKeys: string[] = [];

  useEffect(() => {
    const menuKeys = getMenuKeys(props.location.pathname);
    setOpenKeys(menuKeys);
    const selectKeysAll = menuKeys.length === 0 ? [props.menuData[0].path] : menuKeys;
    setSelectKeys(selectKeysAll);
  }, [props.location.pathname, props.menuData]);

  const getFlatMenuKeys = (menus: MenuDataItem[]) => {
    let keys: any = [];
    menus.forEach((item: any) => {
      if (item.children) {
        keys.push(item.path);
        keys = keys.concat(getFlatMenuKeys(item.children));
      } else {
        keys.push(item.path);
      }
    });
    return keys;
  };

  const getMenuKeys = (path: string): string[] => {
    const flatMenuKeys = getFlatMenuKeys(props.menuData);
    const arr: string[] = path.split('/');
    let back_arr: string[] = [];
    back_arr = arr.reduce((ret: any, item: any) => {
      if (ret.length === 0) {
        return [item];
      } else {
        return [...ret, ret[ret.length - 1] + '/' + item];
      }
    }, []);
    back_arr.shift();
    return back_arr.filter((item) => {
      return flatMenuKeys.indexOf(item) > -1;
    });
  };

  const menuItemClick = (path: string) => {
    if (path === props.location.pathname) return;
    props.history.push(path);
  };

  // 菜单遍历
  const getNavMenuItems = (menuData: MenuDataItem[], isSubMenu = false) => {
    if (!menuData) {
      return [];
    }
    if (!isSubMenu) {
      rootSubmenuKeys = [];
    }
    return menuData.map((item: any) => {
      if (!isSubMenu && item.children) rootSubmenuKeys.push(item.path);
      let Icon;
      if (item.icon) {
        Icon = require('@ant-design/icons')[item.icon];
      }
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                {Icon && <Icon style={{ fontSize: '18px', verticalAlign: 'sub' }} />}
                <span>{item.name}</span>
              </span>
            }>
            {getNavMenuItems(item.children, true)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.path} onClick={() => menuItemClick(item.path)}>
            {Icon && <Icon style={{ fontSize: '18px', verticalAlign: 'sub' }} />} <span>{item.name}</span>
          </Menu.Item>
        );
      }
    });
  };

  // 过滤权限菜单
  const filterMenuData = (menuData: MenuDataItem[], permissionMap: PermissionModelState['menuMarkMap']): MenuDataItem[] => {
    const dfs = (menuList: MenuDataItem[]): MenuDataItem[] => {
      // debugger;
      const ret = [];
      for (let i = 0; i < menuList.length; i++) {
        const item = menuList[i];
        if (!item.isHide) {
          //for (let j = 0; j < permissionMap.length; j++) {
          if (!item.permission || permissionMap[item.permission]) {
            if (item.children) {
              const children = dfs(item.children);
              item.children = children;
            }
            ret.push(item);
          }
          //}
        }
      }
      return ret;
    };
    const ret = dfs(menuData);
    return ret;
  };

  const handSelect = (e: any) => {
    setSelectKeys(e.selectedKeys);
  };

  const handMenuChange = (keys: any) => {
    const latestOpenKey = keys.find((key: string) => keys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      const openKeysAll = latestOpenKey ? [latestOpenKey] : [];
      setOpenKeys(openKeysAll);
    }
  };

  return (
    <Sider trigger={null} collapsed={_state.isCollapsed} width={250}>
      <div className={styles.sideTit}>管理系统</div>
      <Menu theme="dark" mode="inline" selectedKeys={selectKeys} openKeys={openKeys} onSelect={handSelect} onOpenChange={handMenuChange}>
        {getNavMenuItems(filterMenuData(props.menuData, props.permission.menuMarkMap))}
      </Menu>
    </Sider>
  );
};

export default SideMenu;
