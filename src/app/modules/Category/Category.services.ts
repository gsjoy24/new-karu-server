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
