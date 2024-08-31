import { Types } from 'mongoose';

export type TOrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'cancel'
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
  customer: Types.ObjectId;
  name: string;
  phone: string;
  products: TOrderProduct[];
  address?: string;
  district?: string;
  city?: string;
  order_note?: string;
  status: TOrderStatus;
};
