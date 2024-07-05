import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from '../Auth/auth.validations';
import AdminAuthControllers from './admin-auth.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.LoginUserValidationSchema),
  AdminAuthControllers.loginAdmin,
);

router.patch(
  '/change-password',
  adminAuth(),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AdminAuthControllers.changePasswordOfAdmin,
);

// router.post(
//   '/forgot-password',
//   validateRequest(AuthValidations.forgotPasswordValidationSchema),
//   AdminAuthControllers.forgotPassword,
// );

// router.post(
//   '/reset-password',
//   validateRequest(AuthValidations.resetPasswordValidationSchema),
//   AdminAuthControllers.resetPassword,
// );

export const AdminAuthRoutes = router;
