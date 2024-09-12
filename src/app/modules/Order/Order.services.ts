import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import generateUniqueId from '../../utils/generateUniqueId';
import Product from '../Product/Product.model';
import { TUser } from '../User/User.types';
import { OrderSearchableFields } from './Order.constant';
import Order from './Order.model';
import { TOrder } from './Order.types';

const createOrderIntoDB = async (userId: Types.ObjectId, order: TOrder) => {
  const session = await mongoose.startSession();
  const modifiedData = { ...order };

  // Adding order_id and customer to the order
  modifiedData.order_id = generateUniqueId();
  modifiedData.customer = userId;

  try {
    session.startTransaction();

    // decrease product quantity in stock
    for (const product of modifiedData.products) {
      const productInDB = await Product.findById(product.product);
      if (!productInDB) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
      }
      if (productInDB.stock < product.quantity) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Product out of stock');
      }
      productInDB.stock -= product.quantity;
      await productInDB.save({ session });
    }

    const newOrder = await Order.create(modifiedData, { session });

    await session.commitTransaction();
    await session.endSession();
    return newOrder;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllOrdersFromDB = async (
  query: Record<string, unknown>,
  user: TUser,
) => {
  const queryData: Record<string, unknown> = {};
  if (user.role === 'user') {
    queryData['customer'] = user._id;
  }

  const ordersQuery = (
    await new QueryBuilder(
      Order.find(queryData).populate('customer products.product'),
      query,
    )
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
