import { Schema, model } from 'mongoose';
import generateSlug from '../../utils/generateSlug';
import { TProduct } from './Product.types';

const AdditionalInfoSchema = new Schema(
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
  {
    _id: false,
  },
);
const ProductSchema = new Schema<TProduct>(
  {
    slug: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    additional_info: [AdditionalInfoSchema],
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// the pre-save hook is used to generate the slug for the product before saving it to the database. It checks if the name field has been modified and generates a slug using the generateSlug utility function.
ProductSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = generateSlug(this.name);
  }
  next();
});

// the virtual property discountPercentage is used to calculate the discount percentage of a product. It is not stored in the database but can be accessed as a property of the product object. It is calculated by subtracting the last_price from the old_price, dividing the result by the old_price, and then multiplying by 100.
ProductSchema.virtual('discountPercentage ').get(function () {
  return Math.ceil(((this.old_price - this.last_price) / this.old_price) * 100);
});

// the virtual property isOutOfStock is used to check if the product is out of stock. It is not stored in the database but can be accessed as a property of the product object. It is calculated by checking if the stock is less than or equal to 0.
ProductSchema.virtual('isOutOfStock').get(function () {
  return this.stock <= 0;
});

const Product = model<TProduct>('Product', ProductSchema);
export default Product;
