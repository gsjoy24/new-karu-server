import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.LoginUserValidationSchema),
  AuthControllers.loginAdmin,
);

router.patch(
  '/change-password',
  adminAuth(),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePasswordOfAdmin,
);

// router.post(
//   '/forgot-password',
//   validateRequest(AuthValidations.forgotPasswordValidationSchema),
//   AuthControllers.forgotPassword,
// );

// router.post(
//   '/reset-password',
//   validateRequest(AuthValidations.resetPasswordValidationSchema),
//   AuthControllers.resetPassword,
// );

export const AdminAuthRoutes = router;
