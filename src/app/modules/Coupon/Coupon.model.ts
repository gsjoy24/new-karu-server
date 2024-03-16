import { Schema, model } from 'mongoose';
import { TCoupon } from './Coupon.types';

const CouponSchema = new Schema<TCoupon>(
  {
    code: {
      type: String,
      required: [true, 'Coupon code is required!'],
      minlength: [3, 'Coupon code must be at least 3 characters!'],
      maxlength: [20, 'Coupon code must be at most 20 characters!'],
    },
    discount: {
      type: Number,
      required: [true, 'Coupon discount is required!'],
      min: [0, 'Coupon discount must be a non-negative number!'],
    },
    expireDate: {
      type: Date,
      required: [true, 'Coupon expire date is required!'],
    },
  },
  {
    timestamps: true,
  },
);

const Coupon = model<TCoupon>('Coupon', CouponSchema);

export default Coupon;
