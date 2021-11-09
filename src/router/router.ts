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
    permission: 'index',
    icon: 'ReadOutlined',
    children: [
      {
        name: '热门书籍',
        path: '/book/hot',
        permission: 'index'
      }
    ]
  },
  {
    name: '个人中心',
    path: '/user',
    permission: 'index',
    icon: 'TeamOutlined',
    children: [
      {
        name: '人员详情',
        path: '/user/list',
        permission: 'index'
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
