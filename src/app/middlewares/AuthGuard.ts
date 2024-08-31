import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { Admin } from '../modules/Admin/admin.model';
import { User } from '../modules/User/User.model';
import catchAsync from '../utils/catchAsync';

const AuthGuard = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if the user send the token
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // check if the token is valid
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const { id, email, role } = decoded;

    // check if the user is exist. If not, throw an error
    let user;
    if (role === 'user') {
      user = await User.findOne({ _id: id, email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ _id: id, email });
    } else {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
    }

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
    }

    if (role === 'user' && user?.isEmailConfirmed === false) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Please confirm your email!');
    }

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new Error('You are not authorized!');
    }

    req.userData = user;
    next();
  });
};

export default AuthGuard;
