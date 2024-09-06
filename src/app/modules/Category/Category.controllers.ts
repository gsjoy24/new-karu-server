import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CategoryServices from './Category.services';

const CreateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.CreateCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully!',
    data: result,
  });
});

const GetCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.GetCategories(req.query.name as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});

const GetCategoryById = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.GetCategoryById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category fetched successfully',
    data: result,
  });
});

const UpdateCategoryById = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.UpdateCategoryById(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const DeleteCategoryById = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.DeleteCategoryById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});

const CategoryControllers = {
  CreateCategory,
  GetCategories,
  GetCategoryById,
  UpdateCategoryById,
  DeleteCategoryById,
};

export default CategoryControllers;
