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
  name: TUserName;
  full_name?: string;
  email: string;
  isEmailConfirmed: boolean;
  password: string;
  cart?: TCart[];
  address?: string;
  district?: string;
  city?: string;
  mobile_number?: string;
  orders?: string[];
  status?: 'active' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  findUserByEmail(email: string): Promise<TUser | null>;
  isEmailConfirmed(email: string): Promise<boolean>;
}
