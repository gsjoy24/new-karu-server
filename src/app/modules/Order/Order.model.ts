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
    },
    name: { type: String },
    phone: { type: String },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        total_price: { type: Number, required: true },
      },
    ],
    total_price: { type: Number },
    address: { type: String },
    district: { type: String },
    city: { type: String },
    order_note: { type: String },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'cancel', 'delivered'],
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
