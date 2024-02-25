/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

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
  const admin = await Admin.isAdminExists(id);
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  // if name is present then update name fields. name is an object with firstName, middleName, lastName. So, we need to update it like name.firstName, name.middleName, name.lastName. So, we are iterating over the name object and updating the fields.
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

  // we are not deleting the admin from the database. We are just marking it as deleted. So, we are updating the isDeleted field to true. So, that we can filter out the deleted admins from the database.
  const deletedAdmin = await Admin.findByIdAndUpdate(id, { isDeleted: true });

  if (!deletedAdmin) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete the admin!');
  }

  return deletedAdmin;
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
