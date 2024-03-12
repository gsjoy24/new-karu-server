import express from 'express';
const router = express.Router();

import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import CategoryControllers from './Category.controllers';
import CategoryValidations from './Category.validation';

router.post(
  '/',
  adminAuth(),
  validateRequest(CategoryValidations.CreateCategoryValidation),
  CategoryControllers.CreateCategory,
);

router.get('/', adminAuth(), CategoryControllers.GetCategories);

router.get('/:id', adminAuth(), CategoryControllers.GetCategoryById);

router.put(
  '/:id',
  adminAuth(),
  validateRequest(CategoryValidations.UpdateCategoryValidation),
  CategoryControllers.UpdateCategoryById,
);

router.delete('/:id', adminAuth(), CategoryControllers.DeleteCategoryById);

const CategoryRoutes = router;

export default CategoryRoutes;
