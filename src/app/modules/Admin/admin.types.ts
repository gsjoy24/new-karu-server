/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TGender = 'Male' | 'Female' | 'Other';

export type TAdmin = {
  _id?: string;
  name: string;
  password: string;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  role: 'admin';
  isEmailConfirmed?: boolean;
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
