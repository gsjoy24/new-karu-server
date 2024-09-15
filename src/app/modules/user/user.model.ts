import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { AccountStatus } from '../../constants';
import { TUser, UserModel } from './User.types';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      select: false,
    },
    role: {
      type: String,
      default: 'user',
    },
    status: {
      type: String,
      enum: [AccountStatus.active, AccountStatus.blocked],
      default: 'active',
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
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
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

userSchema.statics.findUserByEmail = async function (email: string) {
  return await this.findOne({ email });
};

export const User = model<TUser, UserModel>('User', userSchema);
