import express from 'express';
import userAuth from '../../middlewares/userAuth';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import userValidations from './user.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createUser,
);
router.get('/', UserControllers.getAllUsers);
router.get('/mee', userAuth(), UserControllers.getMe);
router.get('/:id', UserControllers.getSingleUser);
router.put(
  '/:id',
  validateRequest(userValidations.updateUserValidation),
  UserControllers.updateUser,
);

// router.patch(
//   '/change-status/:id',
//   auth(),
//   validateRequest(userValidations.changeUserStatusValidationSchema),
//   UserControllers.changeUserStatus,
// );

export const UserRoutes = router;
