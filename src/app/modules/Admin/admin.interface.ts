import { Model } from 'mongoose';
import { TUserName } from '../../types/userInfo.type';

export type TGender = 'male' | 'female' | 'other';

export type TAdmin = {
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isAdminExists(id: string): Promise<TAdmin | null>;
}
