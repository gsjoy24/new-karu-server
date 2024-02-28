/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { TUserName } from '../../types/userInfo.type';

export type TGender = 'male' | 'female' | 'other';

export type TAdmin = {
  _id?: string;
  name: TUserName;
  password: string;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
};

export interface AdminModel extends Model<TAdmin> {
  isAdminExists(id: string): Promise<TAdmin | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
