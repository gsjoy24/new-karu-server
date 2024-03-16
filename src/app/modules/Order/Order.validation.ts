import { z } from 'zod';

const OrderValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email address',
      }),
    mobile_number: z.string({
      required_error: 'Mobile number is required',
    }),
    products: z.array(
      z.object({
        product: z.string({
          required_error: 'Product id is required',
        }),
        quantity: z.number({
          required_error: 'Product quantity is required',
        }),
        total_price: z.number({
          required_error: 'Product total price is required',
        }),
      }),
    ),
    house_number: z.string().optional(),
    street_address: z.string().optional(),
    district: z.string(),
    city: z.string(),
    order_note: z.string().optional(),
    payment_method: z.string({
      required_error: 'Payment method is required',
    }),
    shipping_method: z.string({
      required_error: 'Shipping method is required',
    }),
    courier_address: z.string().optional(),
    status: z.enum(['pending', 'processing', 'shipped', 'delivered']),
  }),
});

const updateOrderValidation = z.object({
  body: z.object({
    email: z
      .string()
      .email({
        message: 'Invalid email address',
      })
      .optional(),
    mobile_number: z.string().optional(),
    house_number: z.string().optional(),
    street_address: z.string().optional(),
    district: z.string().optional(),
    city: z.string().optional(),
    order_note: z.string().optional(),
    payment_method: z.string().optional(),
    shipping_method: z.string().optional(),
    courier_address: z.string().optional(),
    status: z
      .enum(['pending', 'processing', 'shipped', 'delivered'])
      .optional(),
  }),
});

const orderValidations = {
  OrderValidationSchema,
  updateOrderValidation,
};

export default orderValidations;
