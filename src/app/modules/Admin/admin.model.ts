import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';

import { AdminModel, TAdmin } from './admin.types';

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    isEmailConfirmed: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },

    contactNo: { type: String, required: [true, 'Contact number is required'] },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: {
      type: String,
      default:
        'https://res.cloudinary.com/dghszztcc/image/upload/v1707815776/duumy-user_wmto60.png',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

//! pre save middleware/hook || hashing password
adminSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//checking if user is already exist!
adminSchema.statics.isAdminExists = async function (id) {
  const existingAdmin = await Admin.findById(id).select('+password');
  return existingAdmin;
};

adminSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
