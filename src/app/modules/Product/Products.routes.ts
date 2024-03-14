import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import validateRequest from '../../middlewares/validateRequest';
import ProductController from './Product.controllers';
import ProductValidations from './Products.validation';
const router = express.Router();

// the routes with adminAuth middleware are protected and only accessible by admins. If any other user tries to access these routes, they will get a 401 unauthorized error. so, only admins can access these routes for adding, updating, and deleting products.
router.post(
  '/',
  adminAuth(),
  validateRequest(ProductValidations.CreateProductValidationSchema),
  ProductController.addProduct,
);
router.get('/', ProductController.getProducts);

// this route will fetch the last 10 products as new arrivals for the home page based on the createdAt field.
router.get('/new-arrivals', ProductController.getNewArrivals);
router.get('/:id', ProductController.getProductById);
router.put(
  '/:id',
  validateRequest(ProductValidations.UpdateProductsValidationSchema),
  adminAuth(),
  ProductController.updateProductById,
);
router.delete('/:id', adminAuth(), ProductController.deleteProductById);

export const ProductRoutes = router;
