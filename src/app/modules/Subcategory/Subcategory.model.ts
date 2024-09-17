import { Schema, model } from 'mongoose';
import generateSlug from '../../utils/generateSlug';
import { TSubcategory } from './Subcategory.type';

const SubcategorySchema = new Schema<TSubcategory>(
  {
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
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

SubcategorySchema.pre('save', function (next) {
  this.slug = generateSlug(this.name);
  next();
});

const Subcategory = model<TSubcategory>('Subcategory', SubcategorySchema);

export default Subcategory;
