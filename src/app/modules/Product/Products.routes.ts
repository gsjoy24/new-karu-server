import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import ProductController from './Product.controller';
const router = express.Router();

router.post('/', adminAuth(), ProductController.addProduct);
router.get('/', adminAuth(), ProductController.getProducts);
router.get('/:id', adminAuth(), ProductController.getProductById);
router.put('/:id', adminAuth(), ProductController.updateProductById);
router.delete('/:id', adminAuth(), ProductController.deleteProductById);

export const ProductRoutes = router;
