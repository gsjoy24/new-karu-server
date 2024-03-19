import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controllers';
import {
  createAdminValidationSchema,
  updateAdminValidationSchema,
} from './admin.validations';

const router = express.Router();

router.post(
  '/',
  adminAuth('onlySuperAdmin'),
  validateRequest(createAdminValidationSchema),
  AdminControllers.createAdmin,
);
router.get('/', adminAuth(), AdminControllers.getAllAdmins);
router.get('/:id', adminAuth(), AdminControllers.getSingleAdmin);
router.patch(
  '/:id',
  adminAuth(),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.delete('/:adminId', adminAuth(), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
