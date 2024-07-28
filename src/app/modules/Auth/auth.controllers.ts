import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  res.cookie('refreshToken', result?.refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken: result?.accessToken,
    },
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
    message: 'User details fetched successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.refreshToken(
    req.cookies?.refreshToken as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token refreshed successfully',
    data: {
      accessToken: result,
    },
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.body?.email;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  await AuthServices.forgotPassword(userEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset link sent successfully',
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.query as { token: string };
  const { newPassword } = req.body;
  const result = await AuthServices.resetPassword({
    token,
    newPassword,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePasswordOfUser,
  getMe,
  refreshToken,
  forgotPassword,
  resetPassword,
};
