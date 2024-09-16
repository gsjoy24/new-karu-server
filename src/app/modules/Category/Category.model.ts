import { Schema, model } from 'mongoose';
import generateSlug from '../../utils/generateSlug';
import { TCategory } from './Category.types';

const CategorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

CategorySchema.pre('save', function (next) {
  this.slug = generateSlug(this.name);
  next();
});

const Category = model<TCategory>('Category', CategorySchema);

export default Category;
