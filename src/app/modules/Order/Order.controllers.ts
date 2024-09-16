import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TUser } from '../User/User.types';
import OrderServices from './Order.services';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderServices.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order placed successfully!',
    data: order,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await OrderServices.getAllOrdersFromDB(
    req.query,
    req.userData as TUser,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully!',
    meta,
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderServices.getSingleOrderFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully!',
    data: order,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderServices.updateOrderIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully!',
    data: order,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderServices.deleteOrderFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully!',
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
