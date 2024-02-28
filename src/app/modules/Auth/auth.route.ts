import express from 'express';
import auth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.LoginUserValidationSchema),
  AuthControllers.loginUser,
);

router.patch(
  '/change-password',
  auth(USER_ROLES.admin, USER_ROLES.user),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/forgot-password',
  validateRequest(AuthValidations.forgotPasswordValidationSchema),
  AuthControllers.forgotPassword,
);

router.post(
  '/reset-password',
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
