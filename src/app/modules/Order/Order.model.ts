import { Schema, model } from 'mongoose';
import { TOrder } from './Order.types';

const OrderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    mobile_number: {
      type: String,
      required: [true, 'Mobile number is required'],
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    house_number: {
      type: String,
    },
    street_address: {
      type: String,
      required: [true, 'Street address is required'],
    },
    district: {
      type: String,
      required: [true, 'District is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    order_note: {
      type: String,
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
