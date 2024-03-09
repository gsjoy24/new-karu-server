import { Schema, model } from 'mongoose';
import { TProduct } from './Product.type';

const ProductSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  additional_info: [
    {
      title: {
        type: String,
        required: [true, 'Additional info title is required'],
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
      },
    },
  ],
  old_price: {
    type: Number,
    required: [true, 'Old price is required'],
  },
  last_price: {
    type: Number,
    required: [true, 'Last price is required'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
  },
  primary_image: {
    type: String,
    required: [true, 'Primary image is required'],
  },
  images: {
    type: [String],
    required: [true, 'Images are required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
});

const ProductModel = model<TProduct>('Product', ProductSchema);
export default ProductModel;
