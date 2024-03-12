import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Category from './Category.model';
import { TCategory } from './Category.types';

const CreateCategory = async (data: TCategory) => {
  // check if category already exists
  const categoryExists = await Category.findOne({
    name: data.name,
  });
  if (categoryExists) {
    throw new AppError(httpStatus.CONFLICT, 'Category already exists');
  }
  const category = await Category.create(data);
  return category;
};

const GetCategories = async (params: string) => {
  const searchName = params ? { name: { $regex: params, $options: 'i' } } : {};
  const categories = await Category.find(searchName);
  return categories;
};

const GetCategoryById = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

const UpdateCategoryById = async (id: string, data: Partial<TCategory>) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

const DeleteCategoryById = async (id: string) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

export default {
  CreateCategory,
  GetCategories,
  GetCategoryById,
  UpdateCategoryById,
  DeleteCategoryById,
};
