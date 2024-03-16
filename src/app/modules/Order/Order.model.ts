import { Schema, model } from 'mongoose';
import { TOrder } from './Order.types';

const OrderSchema = new Schema<TOrder>(
  {
    order_id: {
      type: String,
      unique: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: { type: String, required: true },
    mobile_number: { type: String, required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        total_price: { type: Number, required: true },
      },
    ],
    house_number: { type: String },
    street_address: { type: String },
    district: { type: String, required: true },
    city: { type: String, required: true },
    order_note: { type: String },
    payment_method: { type: String, required: true },
    shipping_method: { type: String, required: true },
    courier_address: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Order = model<TOrder>('Order', OrderSchema);

export default Order;
