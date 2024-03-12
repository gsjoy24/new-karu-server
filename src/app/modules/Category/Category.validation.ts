import { z } from 'zod';

const CreateCategoryValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Category name is required',
        invalid_type_error: 'Category name must be a string',
      })
      .min(3, {
        message: 'Category name must be at least 3 characters long',
      })
      .max(50, {
        message: 'Category name must be at most 50 characters long',
      }),
    description: z
      .string({
        invalid_type_error: 'Category description must be a string',
      })
      .min(3, {
        message: 'Category description must be at least 3 characters long',
      })
      .max(255, {
        message: 'Category description must be at most 255 characters long',
      })
      .optional(),
    image: z
      .string()
      .url({
        message: 'Category image must be a valid URL',
      })
      .optional(),
  }),
});

const UpdateCategoryValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Category name must be a string',
      })
      .min(3, {
        message: 'Category name must be at least 3 characters long',
      })
      .max(50, {
        message: 'Category name must be at most 50 characters long',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Category description must be a string',
      })
      .min(3, {
        message: 'Category description must be at least 3 characters long',
      })
      .max(255, {
        message: 'Category description must be at most 255 characters long',
      })
      .optional(),
    image: z
      .string()
      .url({
        message: 'Category image must be a valid URL',
      })
      .optional(),
  }),
});

const CategoryValidations = {
  CreateCategoryValidation,
  UpdateCategoryValidation,
};

export default CategoryValidations;
