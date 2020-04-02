export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['users:list'],
        routes: [
          {
            path: '/',
            redirect: '/home',
          },
          {
            path: '/home',
            name: 'welcome',
            icon: 'smile',
            component: './home',
          },
          {
            path: '/system',
            name: 'admin',
            icon: 'setting',
            authority: ['permissions:manage', 'roles:manage', 'users:manage'],
            routes: [
              {
                path: '/system/permission',
                name: 'permission',
                component: './system/permission',
                authority: ['permissions:manage'],
              },
              {
                path: '/system/role',
                name: 'role',
                component: './system/role',
                authority: ['roles:manage'],
              },
              {
                path: '/system/user',
                name: 'user',
                component: './system/user',
                authority: ['users:manage'],
              }
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]
