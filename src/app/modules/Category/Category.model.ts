import { Schema, model } from 'mongoose';
import generateSlug from '../../utils/generateSlug';
import { TCategory } from './Category.types';

const CategorySchema = new Schema<TCategory>({
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
    required: true,
    unique: true,
  },
});

CategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = generateSlug(this.name);
  }
  next();
});

const Category = model<TCategory>('Category', CategorySchema);

export default Category;
