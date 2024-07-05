import express from 'express';
import userAuth from '../../middlewares/userAuth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controllers';
import { AuthValidations } from './auth.validations';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.LoginUserValidationSchema),
  AuthControllers.loginUser,
);
router.get('/me', userAuth(), AuthControllers.getMe);
router.patch(
  '/change-password',
  userAuth(),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePasswordOfUser,
);
router.post('/refresh-user-token', AuthControllers.refreshToken);

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

export const UserAuthRoutes = router;
