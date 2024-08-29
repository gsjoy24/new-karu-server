import httpStatus from 'http-status';
import { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import generateUniqueId from '../../utils/generateUniqueId';
import { User } from '../User/User.model';
import { OrderSearchableFields } from './Order.constant';
import Order from './Order.model';
import { TOrder } from './Order.types';

const createOrderIntoDB = async (userId: Types.ObjectId, order: TOrder) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const modifiedData = { ...order };

  // Adding order_id and customer to the order
  modifiedData.order_id = generateUniqueId();
  modifiedData.customer = userId;

  const newOrder = await Order.create(modifiedData);

  if (!newOrder) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Order not created');
  }

  // remove all product from user cart
  user.cart = [];
  await user.save();

  return newOrder;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const ordersQuery = (
    await new QueryBuilder(Order.find(), query)
      .search(OrderSearchableFields)
      .filter()
  )
    .sort()
    .paginate()
    .fields();

  const meta = await ordersQuery.countTotal();
  const result = await ordersQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleOrderFromDB = async (id: string) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const updateOrderIntoDB = async (id: string, order: TOrder) => {
  const updatedOrder = await Order.updateOne({ _id: id }, order, { new: true });
  if (!updatedOrder) {
    throw new Error('Order not found');
  }
  return updatedOrder;
};

const deleteOrderFromDB = async (id: string) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  if (!deletedOrder) {
    throw new Error('Order not found');
  }
  return deletedOrder;
};

const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};

export default OrderServices;
