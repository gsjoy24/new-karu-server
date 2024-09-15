import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  });
});

const changePasswordOfUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.changePassword(
    req?.userData as JwtPayload,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.getMe(req.userData as JwtPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User details fetched successfully!',
    data: result,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.body?.email;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  await AuthServices.forgotPassword(userEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset link sent successfully!',
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { newPassword, token } = req.body;
  const result = await AuthServices.resetPassword({
    token,
    newPassword,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePasswordOfUser,
  getMe,
  forgotPassword,
  resetPassword,
};
