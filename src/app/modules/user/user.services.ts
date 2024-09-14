/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AccountStatus } from '../../constants';
import AppError from '../../errors/AppError';
import { UserSearchableFields } from './User.constant';
import { User } from './User.model';
import { TUser } from './User.types';

const createUserIntoDB = async (payload: TUser) => {
  // check if user already exists
  const user = await User.findUserByEmail(payload?.email);
  if (user) {
    throw new AppError(
      httpStatus.CONFLICT,
      'An user already exists with this email!',
    );
  }

  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = (
    await new QueryBuilder(User.find(), query)
      .search(UserSearchableFields)
      .filter()
  )
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;
  return {
    meta,
    result,
  };
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
  // the password is not updated here because it is handled in a separate route. and the name, cart and orders are objects so these will handled separately as well.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, orders, ...restData } = payload;

  const result = await User.findByIdAndUpdate(id, restData);
  return result;
};

const changeUserStatus = async (id: string) => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const status =
    user.status === AccountStatus.active
      ? AccountStatus.blocked
      : AccountStatus.active;
  const result = await User.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  changeUserStatus,
};
