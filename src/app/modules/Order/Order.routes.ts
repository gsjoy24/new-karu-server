import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import userAuth from '../../middlewares/userAuth';
import validateRequest from '../../middlewares/validateRequest';
import OrderControllers from './Order.controllers';
import orderValidations from './Order.validation';
const router = express.Router();

router.post(
  '/',
  userAuth(),
  validateRequest(orderValidations.OrderValidationSchema),
  OrderControllers.createOrder,
);

router.get('/', adminAuth(), OrderControllers.getAllOrders);
router.get('/:id', adminAuth(), OrderControllers.getSingleOrder);
router.put(
  '/:id',
  adminAuth(),
  validateRequest(orderValidations.updateOrderValidation),
  OrderControllers.updateOrder,
);

router.delete('/:id', adminAuth(), OrderControllers.deleteOrder);

export const OrderRoutes = router;
