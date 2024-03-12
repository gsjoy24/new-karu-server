import express from 'express';
const router = express.Router();

import validateRequest from '../../middlewares/validateRequest';
import CategoryControllers from './Category.controllers';
import CategoryValidations from './Category.validation';

router.post(
  '/',
  validateRequest(CategoryValidations.CreateCategoryValidation),
  CategoryControllers.CreateCategory,
);

router.get('/', CategoryControllers.GetCategories);

router.get('/:id', CategoryControllers.GetCategoryById);

router.put(
  '/:id',
  validateRequest(CategoryValidations.UpdateCategoryValidation),
  CategoryControllers.UpdateCategoryById,
);

router.delete('/:id', CategoryControllers.DeleteCategoryById);

export default router;
