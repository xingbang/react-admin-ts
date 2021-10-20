import { routerConfigType } from './indexTyings';

const adminRouter: routerConfigType[] = [
  {
    name: '管理系统',
    path: '/',
    children: [
      {
        name: '个人中心',
        path: '/login',
        children: [
          {
            name: '个人中心',
            path: '/login/user',
            component: '/',
            isHide: false
          },
          {
            name: '个人详情',
            path: '/login/detail',
            component: '/'
          }
        ]
      }
    ]
  }
];

export default adminRouter;
