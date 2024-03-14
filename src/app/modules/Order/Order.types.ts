import { Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId;
  email: string;
  mobile_number: string;
  products: string[];
  house_number?: string;
  street_address: string;
  district: string;
  city: string;
  order_note?: string;
};
