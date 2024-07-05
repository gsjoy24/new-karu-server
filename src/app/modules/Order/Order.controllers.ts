import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Types } from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import OrderServices from './Order.services';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.userData?.id as Types.ObjectId;
  const order = await OrderServices.createOrderIntoDB(userId, req.body);
  res.status(201).json({
    success: true,
    message: 'Order created successfully!',
    statusCode: httpStatus.OK,
    data: order,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await OrderServices.getAllOrdersFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Orders fetched successfully!',
    statusCode: httpStatus.OK,
    meta,
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderServices.getSingleOrderFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Order fetched successfully!',
    statusCode: httpStatus.OK,
    data: order,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderServices.updateOrderIntoDB(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: 'Order updated successfully!',
    statusCode: httpStatus.OK,
    data: order,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderServices.deleteOrderFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Order deleted successfully!',
    statusCode: httpStatus.OK,
    data: order,
  });
});

const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};

export default OrderControllers;
