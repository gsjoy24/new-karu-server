import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import userAuth from '../../middlewares/userAuth';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './User.controllers';
import userValidations from './User.validations';
const router = express.Router();

// all routes start with /api/users.

router.post(
  '/',
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createUser,
);
router.get('/', adminAuth(), UserControllers.getAllUsers);
router.get('/:id', adminAuth(), UserControllers.getSingleUser);
router.put(
  '/:id',
  userAuth(),
  validateRequest(userValidations.updateUserValidation),
  UserControllers.updateUser,
);

router.patch(
  '/change-status/:id',
  adminAuth(),
  UserControllers.changeUserStatus,
);

export const UserRoutes = router;
