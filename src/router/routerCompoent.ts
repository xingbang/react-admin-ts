// 路由懒加载
import { lazy } from 'react';
import { MenuDataItem } from './router';
import menuData from './router';

const getFlatMenuData = (menus: MenuDataItem[]) => {
  let keys: any = {};
  menus.forEach((item: MenuDataItem) => {
    if (item.children) {
      keys[item.path] = item.name;
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = item.name;
    }
  });
  return keys;
};

export const getRoutes = (routerData: any) => {
  const renderRoutes = Object.keys(routerData).map((item: any) => {
    // const exact = !routes.some((route) => route !== item && getRelation(route, item) === 1);
    return {
      key: `${item}`,
      path: `${item}`,
      component: routerData[`${item}`].component
      // exact
    };
  });
  return renderRoutes;
};

const BookHot = lazy(() => import('@src/pages/Book/Hot'));
const UserList = lazy(() => import('@src/pages/User'));
const RoleList = lazy(() => import('@src/pages/Role'));
const MenuList = lazy(() => import('@src/pages/Menu'));

export const getRouterData = () => {
  const routerData: any = {
    '/book/hot': {
      component: BookHot
    },
    '/book/list': {
      component: BookHot
    },
    '/root/user': {
      component: UserList
    },
    '/root/role': {
      component: RoleList
    },
    '/root/menu': {
      component: MenuList
    }
  };

  let routerDataWithName: any = {};
  const menuDataTemp = getFlatMenuData(menuData);
  Object.keys(routerData).forEach((item: any) => {
    routerDataWithName[item] = {
      ...routerData[item],
      name: routerData[item].name || menuDataTemp[item]
    };
  });
  return getRoutes(routerDataWithName);
};
