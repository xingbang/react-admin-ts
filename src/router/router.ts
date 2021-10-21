import { routerConfigType } from './indexTyings';
import Login from '@src/pages/Login';
import List from '@src/pages/List';

const adminRouter: routerConfigType[] = [
  {
    name: '管理系统',
    path: '/',
    children: [
      {
        name: '书籍',
        path: '/book',
        children: [
          {
            name: '热门书籍',
            path: '/book/hot',
            component: List
          }
        ]
      },
      {
        name: '个人中心',
        path: '/user',
        children: [
          {
            name: '人员详情',
            path: '/user/list',
            component: List
          }
        ]
      },
      {
        name: '登录',
        path: '/login',
        component: Login,
        isHide: true
      }
    ]
  }
];

export default adminRouter;
