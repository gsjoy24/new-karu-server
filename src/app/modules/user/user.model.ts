import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { AccountStatus } from '../../constants';
import { TUserName } from '../../types/userInfo.types';
import { TCart, TUser, UserModel } from './User.types';

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

const cartSchema = new Schema<TCart>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product Id is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      default: 1,
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
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      select: false,
    },
    cart: [cartSchema],
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
      enum: [AccountStatus.active, AccountStatus.blocked],
      default: 'active',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
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

userSchema.virtual('total_cart_items').get(function () {
  return this?.cart?.length || 0;
});

userSchema.virtual('full_name').get(function () {
  return `${this?.name?.firstName} ${this?.name?.lastName}`;
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

userSchema.statics.isEmailConfirmed = async function (email: string) {
  const user = await this.findOne({ email });
  return user?.isEmailConfirmed;
};

export const User = model<TUser, UserModel>('User', userSchema);
