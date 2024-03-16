import { z } from 'zod';

const CouponValidationSchema = z.object({
  body: z.object({
    code: z
      .string({
        required_error: 'Coupon code is required!',
      })
      .min(3, {
        message: 'Coupon code must be at least 3 characters!',
      })
      .max(20, {
        message: 'Coupon code must be at most 20 characters!',
      }),

    discount: z
      .number({
        required_error: 'Coupon discount is required!',
        invalid_type_error: 'Coupon discount must be a number!',
      })
      .nonnegative({
        message: 'Coupon discount must be a non-negative number!',
      }),
  }),
});

export default CouponValidationSchema;
