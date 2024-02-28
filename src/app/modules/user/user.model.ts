import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUserName } from '../../types/userInfo.type';
import { UserStatus } from './user.constant';
import { TUser, UserModel } from './user.interface';

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

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      select: 0,
    },
    street_address: {
      type: String,
      trim: true,
    },
    apartment_name: {
      type: String,
      trim: true,
    },
    courier_address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    postal_code: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    mobile_number: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//! pre save middleware/hook || hashing password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//! post save middleware/hook
// removing password from response after save
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (id: string) {
  return await this.findById(id).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
