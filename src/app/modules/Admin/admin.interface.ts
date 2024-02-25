import { Model } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

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
  isUserExists(id: string): Promise<TAdmin | null>;
}
