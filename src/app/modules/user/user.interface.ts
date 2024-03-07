/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { TUserName } from '../../types/userInfo.type';

export interface TUser {
  _id?: string;
  name?: TUserName;
  email: string;
  password: string;
  courier_address?: string;
  city?: string;
  district?: string;
  postal_code?: string;
  mobile_number?: string;
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
