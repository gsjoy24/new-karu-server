/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdminIntoDB = async (payload: TAdmin) => {
  const isAdminExists = await Admin.findOne({ email: payload.email });
  if (isAdminExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'An admin already exists with this email',
    );
  }
  const result = await Admin.create(payload);
  return result;
};

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  // check if admin exists
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  // password is not allowed to update here. So, we are removing that from the payload.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { name, password, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  // if name is present then update name fields. name is an object with firstName, lastName. So, we need to update it like name.firstName, name.lastName. So, we are iterating over the name object and updating the fields.
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const admin = await Admin.isAdminExists(id);
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found!');
  }

  const deletedAdmin = await Admin.findByIdAndDelete(id);
  if (!deletedAdmin) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete the admin!');
  }

  return deletedAdmin;
};

export const AdminServices = {
  createAdminIntoDB,
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
