import express from 'express';
import userAuth from '../../middlewares/userAuth';
import validateRequest from '../../middlewares/validateRequest';
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
  userAuth(),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePasswordOfUser,
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

export const UserAuthRoutes = router;
