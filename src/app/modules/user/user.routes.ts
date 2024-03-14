import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controllers';
import userValidations from './user.validations';
const router = express.Router();

router.post(
  '/',
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createUser,
);
router.get('/', UserControllers.getAllUsers);
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
