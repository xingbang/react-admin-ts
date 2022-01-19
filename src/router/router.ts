export interface MenuDataItem {
  name: string; // 菜单名称
  icon?: string;
  path: string;
  children?: MenuDataItem[];
  permission?: string; // 权限标识
  isHide?: boolean; // 是否隐藏
}

const menuData: MenuDataItem[] = [
  {
    name: '书籍',
    path: '/book',
    permission: 'book',
    icon: 'ReadOutlined',
    children: [
      {
        name: '图书列表',
        path: '/book/list',
        permission: 'book'
      },
      {
        name: '热门书籍',
        path: '/book/hot',
        permission: 'index'
      }
    ]
  },
  {
    name: '权限管理',
    path: '/root',
    permission: 'user',
    icon: 'TeamOutlined',
    children: [
      {
        name: '用户管理',
        path: '/root/user',
        permission: 'user'
      },
      {
        name: '角色管理',
        path: '/root/role',
        permission: 'user'
      },
      {
        name: '菜单管理',
        path: '/root/menu',
        permission: 'user'
      }
    ]
  },
  {
    name: '登录',
    path: '/login',
    isHide: true
  }
];

export default menuData;
