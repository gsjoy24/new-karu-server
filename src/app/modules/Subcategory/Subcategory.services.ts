import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Subcategory from './Subcategory.model';
import { TSubcategory } from './Subcategory.type';

const CreateSubcategory = async (data: TSubcategory) => {
  // check if Subcategory already exists
  const categoryExists = await Subcategory.findOne({
    name: data.name,
  });
  if (categoryExists) {
    throw new AppError(httpStatus.CONFLICT, 'Subcategory already exists');
  }
  const result = await Subcategory.create(data);
  return result;
};

const GetSubcategories = async (id: string) => {
  // this function will be used on the category module to get all subcategories of a category
  const result = await Subcategory.find({ category: id });
  return result;
};

const UpdateSubcategoryById = async (
  id: string,
  data: Partial<TSubcategory>,
) => {
  const result = await Subcategory.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subcategory not found');
  }
  return result;
};

const DeleteSubcategoryById = async (id: string) => {
  const result = await Subcategory.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subcategory not found');
  }
  return result;
};

const GetSubcategoriesWithProducts = async () => {
  // this function will be used on the home page to get all subcategories with products for each subcategory.

  // i need only the product images form the products array
  const result = await Subcategory.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'sub_category',
        as: 'products',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        category_slug: { $arrayElemAt: ['$category.slug', 0] },
        products: {
          $slice: ['$products.images', 4],
        },
        productCount: {
          $size: '$products',
        },
      },
    },
    {
      $sort: { created_at: -1 },
    },
  ]);

  return result;
};

const SubcategoryServices = {
  CreateSubcategory,
  GetSubcategories,
  UpdateSubcategoryById,
  DeleteSubcategoryById,
  GetSubcategoriesWithProducts,
};

export default SubcategoryServices;
