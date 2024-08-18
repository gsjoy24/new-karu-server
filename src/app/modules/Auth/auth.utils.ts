/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';

export const createToken = (
  jwtPayload: { id: string | undefined; email: string; role?: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }
};
