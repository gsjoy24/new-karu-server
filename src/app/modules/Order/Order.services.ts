import Order from './Order.model';
import { TOrder } from './Order.types';

const createOrder = async (order: TOrder) => {
  const newOrder = await Order.create(order);
  return newOrder;
};

const getAllOrders = async () => {
  const orders = await Order.find();
  return orders;
};

const getSingleOrder = async (id: string) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const updateOrder = async (id: string, order: TOrder) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true });
  if (!updatedOrder) {
    throw new Error('Order not found');
  }
  return updatedOrder;
};

const deleteOrder = async (id: string) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  if (!deletedOrder) {
    throw new Error('Order not found');
  }
  return deletedOrder;
};

const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};

export default OrderService;
