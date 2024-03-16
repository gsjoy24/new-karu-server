import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import CouponControllers from './Coupon.controllers';
import CouponValidationSchema from './Coupon.validation';

const router = express.Router();

// all routes start with /api/coupons
router.post(
  '/',
  adminAuth(),
  validateRequest(CouponValidationSchema),
  CouponControllers.createCoupon,
);
router.get('/', adminAuth(), CouponControllers.getCoupons);
router.get('/:id', adminAuth(), CouponControllers.getCoupon);
router.put(
  '/:id',
  adminAuth(),
  validateRequest(CouponValidationSchema),
  CouponControllers.updateCoupon,
);

router.delete('/:id', adminAuth(), CouponControllers.deleteCoupon);

export const CouponRoutes = router;
