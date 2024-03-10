import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ProductsSearchableFields } from './Product.constant';
import Product from './Product.model';
import { TProduct } from './Product.type';

const addProduct = async (product: TProduct) => {
  const result = await Product.create(product);
  if (!result) {
    new AppError(httpStatus.BAD_REQUEST, 'Product not created!');
  }
  return result;
};

const getProducts = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(ProductsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getProductById = async (id: string) => {
  const result = await Product.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return result;
};

const updateProductById = async (id: string, product: Partial<TProduct>) => {
  const { additional_info, ...remainingProductData } = product;
  const modifiedProduct: Record<string, unknown> = { ...remainingProductData };

  if (additional_info && Object.keys(additional_info).length) {
    for (const [key, value] of Object.entries(additional_info)) {
      modifiedProduct[`additional_info.${key}`] = value;
    }
  }
  const result = await Product.findByIdAndUpdate(id, modifiedProduct, {
    new: true,
  });
  return result;
};

const deleteProductById = async (id: string) => {
  const product = await getProductById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product deletion failed!');
  }
  return result;
};

const ProductServices = {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};

export default ProductServices;
