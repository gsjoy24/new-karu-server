import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { Admin } from '../Admin/admin.model';
import { TChangePassword, TLogin } from '../Auth/auth.types';
import { createToken } from '../Auth/auth.utils';
import { User } from '../User/User.model';

const loginAdmin = async (payload: TLogin) => {
  const { email, password } = payload;

  // check if the user is exist
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'The admin is not found');
  }

  // check if the password is correct
  const isPasswordMatch = await Admin.isPasswordMatched(
    password,
    admin?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
  }

  const jwtPayload = {
    id: admin?._id,
    email: admin?.email,
    role: 'admin',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expiration,
  );

  return accessToken;
};

const changePasswordOfAdmin = async (
  adminData: JwtPayload,
  payload: TChangePassword,
) => {
  const { oldPassword, newPassword } = payload;

  // check if the user is exist
  const admin = await Admin.findOne({
    _id: adminData.id,
    email: adminData.email,
  }).select('+password');
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'The admin is not found!');
  }

  // check if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    oldPassword,
    admin?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match!');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round),
  );

  const result = await Admin.findOneAndUpdate(
    {
      id: adminData.id,
      email: adminData.email,
    },
    {
      password: hashedPassword,
    },
  );

  return result;
};

const AdminAuthServices = {
  loginAdmin,
  changePasswordOfAdmin,
};

export default AdminAuthServices;
