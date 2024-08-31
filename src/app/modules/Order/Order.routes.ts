import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import AuthGuard from '../../middlewares/AuthGuard';
import userAuth from '../../middlewares/userAuth';
import validateRequest from '../../middlewares/validateRequest';
import OrderControllers from './Order.controllers';
import orderValidations from './Order.validation';
const router = express.Router();

// all routes start with /api/orders
router.post(
  '/',
  userAuth(),
  validateRequest(orderValidations.OrderValidationSchema),
  OrderControllers.createOrder,
);
router.get('/', AuthGuard('user', 'admin'), OrderControllers.getAllOrders);
router.get('/:id', adminAuth(), OrderControllers.getSingleOrder);
router.put(
  '/:id',
  adminAuth(),
  validateRequest(orderValidations.updateOrderValidation),
  OrderControllers.updateOrder,
);

router.delete('/:id', adminAuth(), OrderControllers.deleteOrder);

export const OrderRoutes = router;
