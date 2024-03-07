import express from 'express';
// import auth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import userValidations from './user.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createUser,
);

// router.patch(
//   '/change-status/:id',
//   auth(),
//   validateRequest(userValidations.changeUserStatusValidationSchema),
//   UserControllers.changeUserStatus,
// );

// router.get(
//   '/me',
//   UserControllers.getMe,
// );

export const UserRoutes = router;
