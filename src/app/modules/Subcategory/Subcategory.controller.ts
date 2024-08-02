import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import SubcategoryServices from './Subcategory.services';
import { TSubcategory } from './Subcategory.type';

const CreateSubcategory = async (req: Request, res: Response) => {
  const data = req?.body as unknown as TSubcategory;
  const result = await SubcategoryServices.CreateSubcategory(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Subcategory created successfully',
    data: result,
  });
};

const UpdateSubcategoryById = async (req: Request, res: Response) => {
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

const DeleteSubcategoryById = async (req: Request, res: Response) => {
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

const GetSubcategoriesWithProducts = async (req: Request, res: Response) => {
  const result = await SubcategoryServices.GetSubcategoriesWithProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subcategories fetched successfully',
    data: result,
  });
};

const SubcategoryControllers = {
  CreateSubcategory,
  UpdateSubcategoryById,
  DeleteSubcategoryById,
  GetSubcategoriesWithProducts,
};

export default SubcategoryControllers;
