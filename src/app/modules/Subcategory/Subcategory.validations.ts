import { z } from 'zod';

const CreateSubcategoryValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Subcategory name is required',
        invalid_type_error: 'Subcategory name must be a string',
      })
      .min(3, {
        message: 'Subcategory name must be at least 3 characters long',
      })
      .max(50, {
        message: 'Subcategory name must be at most 50 characters long',
      }),
    description: z
      .string({
        invalid_type_error: 'Subcategory description must be a string',
      })
      .min(3, {
        message: 'Subcategory description must be at least 3 characters long',
      })
      .max(255, {
        message: 'Subcategory description must be at most 255 characters long',
      })
      .optional(),
  }),
});

const UpdateSubcategoryValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Subcategory name must be a string',
      })
      .min(3, {
        message: 'Subcategory name must be at least 3 characters long',
      })
      .max(50, {
        message: 'Subcategory name must be at most 50 characters long',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Subcategory description must be a string',
      })
      .min(3, {
        message: 'Subcategory description must be at least 3 characters long',
      })
      .max(255, {
        message: 'Subcategory description must be at most 255 characters long',
      })
      .optional(),
  }),
});

const SubcategoryValidations = {
  CreateSubcategoryValidation,
  UpdateSubcategoryValidation,
};

export default SubcategoryValidations;
