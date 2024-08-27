import { z } from 'zod';
import { OrderStatus } from './Order.constant';

const OrderValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    phone: z.string({
      required_error: 'Phone number is required',
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
    address: z.string().optional(),
    district: z.string(),
    city: z.string(),
    order_note: z.string().optional(),
    payment_method: z.string().optional(),
    shipping_method: z.string().optional(),
    courier_address: z.string().optional(),
  }),
});

const updateOrderValidation = z.object({
  body: z.object({
    phone: z.string().optional(),
    address: z.string().optional(),
    district: z.string().optional(),
    city: z.string().optional(),
    order_note: z.string().optional(),
    payment_method: z.string().optional(),
    shipping_method: z.string().optional(),
    courier_address: z.string().optional(),
    status: z.enum([OrderStatus[0], ...OrderStatus.slice(1)]).optional(),
  }),
});

const orderValidations = {
  OrderValidationSchema,
  updateOrderValidation,
};

export default orderValidations;
