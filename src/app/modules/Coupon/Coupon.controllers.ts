import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CouponServices from './Coupon.services';

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const coupon = await CouponServices.createCoupon(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Coupon created successfully!',
    data: coupon,
  });
});

const getCoupons = catchAsync(async (req: Request, res: Response) => {
  const coupons = await CouponServices.getCoupons();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupons fetched successfully!',
    data: coupons,
  });
});

const getCoupon = catchAsync(async (req: Request, res: Response) => {
  const coupon = await CouponServices.getCoupon(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon fetched successfully!',
    data: coupon,
  });
});

const updateCoupon = catchAsync(async (req: Request, res: Response) => {
  const coupon = await CouponServices.updateCoupon(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon updated successfully!',
    data: coupon,
  });
});

const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  const coupon = await CouponServices.deleteCoupon(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon deleted successfully!',
    data: coupon,
  });
});

const CouponControllers = {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};

export default CouponControllers;
