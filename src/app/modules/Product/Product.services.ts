import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ProductsSearchableFields } from './Product.constant';
import Product from './Product.model';
import { TProduct } from './Product.types';

const addProduct = async (product: TProduct) => {
  const result = await Product.create(product);
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

const getNewArrivals = async () => {
  const result = await Product.find().sort({ createdAt: -1 }).limit(10);
  return result;
};

const getProductById = async (id: string) => {
  const result = await Product.findById(id).populate('category sub_category');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return result;
};

const getProductBySlug = async (slug: string) => {
  const product = await Product.findOne({
    slug,
  }).populate('category sub_category');
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

const updateProductById = async (id: string, product: Partial<TProduct>) => {
  const { ...remainingProductData } = product;
  const modifiedProduct: Record<string, unknown> = { ...remainingProductData };

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
  getNewArrivals,
  getProductById,
  updateProductById,
  deleteProductById,

  getProductBySlug,
};

export default ProductServices;
