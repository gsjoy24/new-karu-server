import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import SubcategoryServices from './Subcategory.services';
import { TSubcategory } from './Subcategory.type';

const createSubcategory = async (req: Request, res: Response) => {
  const data = req.body as unknown as TSubcategory;
  const result = await SubcategoryServices.CreateSubcategory(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Subcategory created successfully',
    data: result,
  });
};

const getSubcategories = async (req: Request, res: Response) => {
  const result = await SubcategoryServices.GetSubcategories(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subcategories fetched successfully',
    data: result,
  });
};

const getSubcategoryById = async (req: Request, res: Response) => {
  const result = await SubcategoryServices.GetSubcategoryById(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subcategory fetched successfully',
    data: result,
  });
};

const updateSubcategoryById = async (req: Request, res: Response) => {
  const data = req.body as unknown as TSubcategory;
  const result = await SubcategoryServices.UpdateSubcategoryById(
    req?.params?.id,
    data,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subcategory updated successfully',
    data: result,
  });
};

const deleteSubcategoryById = async (req: Request, res: Response) => {
  const result = await SubcategoryServices.DeleteSubcategoryById(
    req?.params?.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subcategory deleted successfully',
    data: result,
  });
};

const SubcategoryControllers = {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategoryById,
  deleteSubcategoryById,
};

export default SubcategoryControllers;
