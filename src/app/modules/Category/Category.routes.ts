import express from 'express';

import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import CategoryControllers from './Category.controllers';
import CategoryValidations from './Category.validations';
const router = express.Router();

// all routes start with /api/categories. all routes are protected and only an admin can access them.

router.post(
  '/',
  adminAuth(),
  validateRequest(CategoryValidations.CreateCategoryValidation),
  CategoryControllers.CreateCategory,
);
router.get('/', CategoryControllers.GetCategories);
router.get('/:id', CategoryControllers.GetCategoryById);
router.put(
  '/:id',
  adminAuth(),
  validateRequest(CategoryValidations.UpdateCategoryValidation),
  CategoryControllers.UpdateCategoryById,
);
router.delete('/:id', adminAuth(), CategoryControllers.DeleteCategoryById);

const CategoryRoutes = router;

export default CategoryRoutes;
