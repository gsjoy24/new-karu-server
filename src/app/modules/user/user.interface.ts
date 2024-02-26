/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { TUserName } from '../../types/userInfo.type';
import { USER_ROLES } from './user.constant';

export interface TUser {
  _id?: string;
  name?: TUserName;
  email: string;
  password: string;
  street_address?: string;
  apartment_name?: string;
  city?: string;
  postal_code?: string;
  district?: string;
  mobile_number?: string;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLES;
