import { Schema, model } from 'mongoose';
import { AdminModel, TAdmin, TUserName } from './admin.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// generating full name
adminSchema.virtual('fullName').get(function () {
  if (this?.name?.middleName) {
    return (
      this?.name?.firstName +
      ' ' +
      this?.name?.middleName +
      ' ' +
      this?.name?.lastName
    );
  }
  return this?.name?.firstName + ' ' + this?.name?.lastName;
});

// filter out deleted documents
adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
adminSchema.statics.isAdminExists = async function (id: string) {
  const existingUser = await Admin.findById(id);
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
