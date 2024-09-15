import { Types } from 'mongoose';

export type TProduct = {
  _id?: string;
  slug: string;
  sku: string;
  name: string;
  description: string;
  short_description: string;
  old_price: number;
  last_price: number;
  stock: number;
  images: string[];
  category: Types.ObjectId;
  sub_category?: Types.ObjectId;
  tags: string[];
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
