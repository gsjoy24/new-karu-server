/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AccountStatus } from '../constants';
import Product from '../Product/Product.model';
import { UserSearchableFields } from './User.constant';
import { User } from './User.model';
import { TCart, TUser } from './User.types';

const createUserIntoDB = async (payload: TUser) => {
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

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter()
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
  const { password, name, cart, orders, ...restData } = payload;

  const modifiedData = { ...restData };

  // the name object containing first and last name is handled here.
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      (modifiedData as { [key: string]: any })[`name.${key}`] = value;
    }
  }

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

const addProductToCart = async (id: string, product: TCart) => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check if the product exists in the database
  const productExists = await Product.findById(product.product);
  if (!productExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // check if the product already exists in the cart. if it does, then throw an error. otherwise, add the product to the cart.
  const isProductExists = user?.cart?.find(
    (item) => item.product.toString() === product.product.toString(),
  );
  if (isProductExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This product already exists in the cart!',
    );
  }

  const result = await User.updateOne(
    { _id: id },
    {
      $push: { cart: product },
    },
  );
  return result;
};

const manipulateQuantityInCart = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const user = await User.isUserExists(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the product already exists in the cart.
  const isProductExists = user?.cart?.find(
    (item) => item.product.toString() === productId,
  );
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found in the cart!');
  }

  const result = await User.updateOne(
    {
      _id: userId,
      'cart.product': productId,
    },
    {
      $set: { 'cart.$.quantity': quantity },
    },
  );
  return result;
};

const removeProductFromCart = async (productId: string, product: string) => {
  const user = await User.isUserExists(productId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.updateOne(
    {
      _id: productId,
    },
    {
      $pull: { cart: { product } },
    },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  changeUserStatus,
  addProductToCart,
  removeProductFromCart,
  manipulateQuantityInCart,
};
