import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ProductServices from './Product.services';

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.addProduct(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product is created successfully',
    data: result,
  });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await ProductServices.getProducts(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products are fetched successfully',
    meta,
    data: result,
  });
});

const getNewArrivals = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getNewArrivals();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New arrivals are fetched successfully',
    data: result,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getProductById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is fetched successfully',
    data: result,
  });
});

const updateProductById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.updateProductById(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated successfully',
    data: result,
  });
});

const deleteProductById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.deleteProductById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted successfully',
    data: result,
  });
});

const ProductController = {
  addProduct,
  getProducts,
  getNewArrivals,
  getProductById,
  updateProductById,
  deleteProductById,
};

export default ProductController;
