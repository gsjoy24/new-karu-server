import { Schema, model } from 'mongoose';
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
});

const Category = model<TCategory>('Category', CategorySchema);

export default Category;
