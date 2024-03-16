import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Coupon from './Coupon.model';
import { TCoupon } from './Coupon.types';

const createCoupon = async (coupon: TCoupon) => {
  // check if the coupon is already exist
  const existCoupon = await Coupon.findOne({ code: coupon.code });
  if (existCoupon) {
    throw new AppError(httpStatus.CONFLICT, 'The coupon is already exist');
  }
  const newCoupon = Coupon.create(coupon);
  return newCoupon;
};

const getCoupons = async () => {
  const coupons = await Coupon.find();
  return coupons;
};

const getCoupon = async (id: string) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    throw new AppError(httpStatus.NOT_FOUND, 'The coupon is not found');
  }
  return coupon;
};

const updateCoupon = async (id: string, coupon: TCoupon) => {
  const updatedCoupon = await Coupon.findByIdAndUpdate(id, coupon, {
    new: true,
    runValidators: true,
  });
  if (!updatedCoupon) {
    throw new AppError(httpStatus.NOT_FOUND, 'The coupon is not found');
  }
  return updatedCoupon;
};

const deleteCoupon = async (id: string) => {
  const deletedCoupon = await Coupon.findByIdAndDelete(id);
  if (!deletedCoupon) {
    throw new AppError(httpStatus.NOT_FOUND, 'The coupon is not found');
  }
  return deletedCoupon;
};

const CouponServices = {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
export default CouponServices;
