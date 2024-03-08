/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
// import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const CreateUserIntoDB = async (payload: TUser) => {
  // check if user already exists
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(
      httpStatus.CONFLICT,
      'An user already exists with this email!',
    );
  }
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

const updateUserIntoDB = async (id: string, payload: TUser) => {
  // check if user already exists
  const user = await User.isUserExists(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  // the password is not updated here because it is handled in a separate route. and the name is an object so it is handled separately as well.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, name, ...restData } = payload;

  const modifiedData = { ...restData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      (modifiedData as { [key: string]: any })[`name.${key}`] = value;
    }
  }

  const result = await User.findByIdAndUpdate(id, restData);
  return result;
};

// const changeUserStatus = async (id: string, payload: { status: string }) => {
//   const result = await User.findByIdAndUpdate(id, payload, {
//     new: true,
//   });
//   return result;
// };

// const getMe = async (user: JwtPayload) => {
//   const { role, userId } = user;

//   let result: Record<string, unknown> | null = {};

//   if (role === USER_ROLES.student) {
//     result = await Student.findOne({
//       id: userId,
//     }).populate('user');
//   } else if (role === USER_ROLES.faculty) {
//     result = await Faculty.findOne({
//       id: userId,
//     }).populate('user');
//   } else if (role === USER_ROLES.admin) {
//     result = await Admin.findOne({
//       id: userId,
//     }).populate('user');
//   } else if (role === USER_ROLES.superAdmin) {
//     result = await User.findOne({ id: userId });
//   }

//   // if user not found
//   if (!result) {
//     throw new AppError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   return result;
// };

export const UserServices = {
  CreateUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  // changeUserStatus,
  // getMe,
};
