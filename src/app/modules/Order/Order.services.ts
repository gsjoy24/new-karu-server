import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import generateUniqueId from '../../utils/generateUniqueId';
import { User } from '../user/user.model';
import Order from './Order.model';
import { TOrder } from './Order.types';

const createOrderIntoDB = async (userId: Types.ObjectId, order: TOrder) => {
  const session = await mongoose.startSession();
  const modifiedData = { ...order };

  // adding unique order id for each order
  modifiedData.order_id = generateUniqueId();
  modifiedData.customer = userId;

  try {
    session.startTransaction();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newOrder: any = await Order.create(modifiedData, {
      session,
    });

    if (!newOrder) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Order not created');
    }

    const addOrderRefToUser = await User.findByIdAndUpdate(
      userId,
      { $push: { orders: newOrder?._id } },
      { session },
    );

    if (!addOrderRefToUser) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Order not created');
    }
    await session.commitTransaction();
    await session.endSession();
    return newOrder;
  } catch (err: unknown) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err as string);
  }
};

const getAllOrdersFromDB = async () => {
  const orders = await Order.find();
  return orders;
};

const getSingleOrderFromDB = async (id: string) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const updateOrderIntoDB = async (id: string, order: TOrder) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true });
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
