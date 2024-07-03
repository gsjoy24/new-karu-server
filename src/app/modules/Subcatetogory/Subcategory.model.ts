import { Schema, model } from 'mongoose';
import { TSubcategory } from './Subcategory.type';

const SubcategorySchema = new Schema<TSubcategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Subcategory = model<TSubcategory>('Subcategory', SubcategorySchema);

export default Subcategory;
