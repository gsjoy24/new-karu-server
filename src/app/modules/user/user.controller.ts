import { RequestHandler } from 'express';
import httpStatus from 'http-status';
// import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.CreateUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully!',
    data: result,
  });
});

// const getMe = catchAsync(async (req, res) => {
//   const result = await UserServices.getMe(req.userData as JwtPayload);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User details fetched successfully',
//     data: result,
//   });
// });

export const UserControllers = {
  createUser,
  // getMe,
};
