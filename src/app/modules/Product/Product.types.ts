import { Types } from 'mongoose';

export type TProduct = {
  _id?: string;
  slug: string;
  name: string;
  description: string;
  old_price: number;
  last_price: number;
  stock: number;
  primary_image: string;
  images: string[];
  category: Types.ObjectId;
  sub_category?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
