import bcrypt from 'bcrypt';

import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUserName } from '../../types/userInfo.types';
import { AdminModel, TAdmin } from './admin.types';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
      maxlength: [20, 'Name can not be more than 20 characters'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last Name is required'],
      maxlength: [20, 'Name can not be more than 20 characters'],
    },
  },
  {
    _id: false,
  },
);

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    name: {
      type: userNameSchema,
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
      minlength: [6, 'Password can not be less than 6 characters'],
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

// generating full name
adminSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.lastName;
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
