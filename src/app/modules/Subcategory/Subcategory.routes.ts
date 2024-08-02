import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import SubcategoryController from './Subcategory.controller';
import SubcategoryValidations from './Subcategory.validations';

const router = express.Router();

// all routes start with /api/subcategories. all routes are protected and only an admin can access them.

router.post(
  '/',
  adminAuth(),
  validateRequest(SubcategoryValidations.CreateSubcategoryValidation),
  SubcategoryController.CreateSubcategory,
);

router.put(
  '/:id',
  adminAuth(),
  validateRequest(SubcategoryValidations.UpdateSubcategoryValidation),
  SubcategoryController.UpdateSubcategoryById,
);

router.delete('/:id', adminAuth(), SubcategoryController.DeleteSubcategoryById);

router.get(
  '/subcategory-with-products',
  SubcategoryController.GetSubcategoriesWithProducts,
);

const SubcategoryRoutes = router;

export default SubcategoryRoutes;
