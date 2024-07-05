import { Router } from 'express';
import { AdminAuthRoutes } from '../modules/Admin-auth/admin-auth.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { UserAuthRoutes } from '../modules/Auth/auth.routes';
import CategoryRoutes from '../modules/Category/Category.routes';
import { CouponRoutes } from '../modules/Coupon/Coupon.routes';
import { OrderRoutes } from '../modules/Order/Order.routes';
import { ProductRoutes } from '../modules/Product/Products.routes';
import SubcategoryRoutes from '../modules/Subcategory/Subcategory.routes';
import { UserRoutes } from '../modules/User/User.routes';
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
    path: '/auth',
    route: UserAuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/subcategories',
    route: SubcategoryRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/coupons',
    route: CouponRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
