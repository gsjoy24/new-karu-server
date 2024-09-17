import { Types } from 'mongoose';

export type TSubcategory = {
  _id?: number;
  name: string;
  category: Types.ObjectId;
  description?: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
};
