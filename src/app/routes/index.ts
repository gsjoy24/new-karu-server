import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
// import { AuthRoutes } from '../modules/Auth/userAuth.routes';

import { AdminAuthRoutes } from '../modules/Auth/AdminAuth.routes';
import { UserRoutes } from '../modules/user/user.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/admins/auth',
    route: AdminAuthRoutes,
  },
  {
    path: '/users/auth',
    route: UserRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
