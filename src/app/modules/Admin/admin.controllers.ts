import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'The admin is created successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The admin is retrieved successfully',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The admins are retrieved successfully',
    meta,
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { adminData } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The admin is updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The admin is deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
