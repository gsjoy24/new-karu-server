import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AdminAuthServices from './admin-auth.services';

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminAuthServices.loginAdmin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The admin logged in successfully',
    data: {
      accessToken: result,
    },
  });
});

const changePasswordOfAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminAuthServices.changePasswordOfAdmin(
      req?.adminData as JwtPayload,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully',
      data: result,
    });
  },
);

const AdminAuthControllers = {
  loginAdmin,
  changePasswordOfAdmin,
};

export default AdminAuthControllers;
