/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { TUserName } from '../../types/userInfo.types';

export type TCart = {
  _id?: string;
  product: Types.ObjectId;
  quantity: number;
};
export interface TUser {
  _id?: string;
  name?: TUserName;
  email: string;
  password: string;
  cart?: TCart[];
  courier_address?: string;
  city?: string;
  district?: string;
  postal_code?: string;
  mobile_number?: string;
  orders?: string[];
  status?: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
