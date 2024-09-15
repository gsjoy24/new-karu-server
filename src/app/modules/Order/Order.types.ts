import { Types } from 'mongoose';

export type TOrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'cancelled'
  | 'delivered';

export type TOrderProduct = {
  _id?: string;
  product: Types.ObjectId;
  quantity: number;
  total_price: number;
};

export type TOrder = {
  _id?: string;
  order_id: string;
  name: string;
  phone: string;
  products: TOrderProduct[];
  total_price: number;
  address?: string;
  district?: string;
  city?: string;
  order_note?: string;
  status: TOrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
};
