import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import ProductController from './Product.controllers';
import ProductValidations from './Products.validation';
const router = express.Router();

// the routes with adminAuth middleware are protected and only accessible by admins. If any other user tries to access these routes, they will get a 401 unauthorized error. so, only admins can access these routes for adding, updating, and deleting products. All routes are prefixed with /api/products.
router.post(
  '/',
  adminAuth(),
  validateRequest(ProductValidations.CreateProductValidationSchema),
  ProductController.addProduct,
);
router.get('/', ProductController.getProducts);
router.get('/new-arrivals', ProductController.getNewArrivals);
router.get('/slug/:slug', ProductController.getProductBySlug);
router.get('/id/:id', ProductController.getProductById);
router.put(
  '/update/:id',
  validateRequest(ProductValidations.UpdateProductsValidationSchema),
  adminAuth(),
  ProductController.updateProductById,
);
router.delete('/:id', adminAuth(), ProductController.deleteProductById);

export const ProductRoutes = router;
