import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import ProductController from './Product.controller';
import ProductValidations from './Products.validation';
const router = express.Router();

router.post(
  '/',
  adminAuth(),
  validateRequest(ProductValidations.CreateProductValidationSchema),
  ProductController.addProduct,
);
router.get('/', adminAuth(), ProductController.getProducts);
router.get('/:id', adminAuth(), ProductController.getProductById);
router.put(
  '/:id',
  validateRequest(ProductValidations.UpdateProductsValidationSchema),
  adminAuth(),
  ProductController.updateProductById,
);
router.delete('/:id', adminAuth(), ProductController.deleteProductById);

export const ProductRoutes = router;
