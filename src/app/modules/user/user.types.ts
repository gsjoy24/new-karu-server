/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
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
