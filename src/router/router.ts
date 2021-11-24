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
        permission: 'book'
      }
    ]
  },
  {
    name: '个人中心',
    path: '/user',
    permission: 'user',
    icon: 'TeamOutlined',
    children: [
      {
        name: '人员详情',
        path: '/user/list',
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
