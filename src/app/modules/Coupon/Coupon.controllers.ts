import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import CouponServices from './Coupon.services';

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const coupon = await CouponServices.createCoupon(req.body);
  res.status(201).json({
    success: true,
    message: 'Coupon created successfully!',
    statusCode: httpStatus.OK,
    data: coupon,
  });
});

const getCoupons = catchAsync(async (req: Request, res: Response) => {
  const coupons = await CouponServices.getCoupons();
  res.status(200).json({
    success: true,
    message: 'Coupons fetched successfully!',
    statusCode: httpStatus.OK,
    data: coupons,
  });
});

const getCoupon = catchAsync(async (req: Request, res: Response) => {
  const coupon = await CouponServices.getCoupon(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Coupon fetched successfully!',
    statusCode: httpStatus.OK,
    data: coupon,
  });
});

const updateCoupon = catchAsync(async (req: Request, res: Response) => {
  const coupon = await CouponServices.updateCoupon(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: 'Coupon updated successfully!',
    statusCode: httpStatus.OK,
    data: coupon,
  });
});

const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  const coupon = await CouponServices.deleteCoupon(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Coupon deleted successfully!',
    statusCode: httpStatus.OK,
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
