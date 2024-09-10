import { z } from 'zod';

const CreateProductValidationSchema = z.object({
  body: z.object({
    sku: z.string({
      required_error: 'SKU is required',
    }),
    name: z.string({
      required_error: 'Product name is required',
      invalid_type_error: 'Product name should be a string',
    }),
    description: z.string({
      required_error: 'Product description is required',
      invalid_type_error: 'Product description should be a string',
    }),
    short_description: z.string({
      required_error: 'Product short description is required',
      invalid_type_error: 'Product short description should be a string',
    }),
    old_price: z
      .number({
        required_error: 'Old price is required',
        invalid_type_error: 'Old price should be a number',
      })
      .positive({
        message: 'Old price should be a positive number',
      }),
    last_price: z
      .number({
        required_error: 'Last price is required',
        invalid_type_error: 'Last price should be a number',
      })
      .positive({
        message: 'Last price should be a positive number',
      }),
    stock: z
      .number({
        required_error: 'Stock is required',
        invalid_type_error: 'Stock should be a number',
      })
      .positive({
        message: 'Stock should be a positive number',
      }),
    images: z.array(
      z.string({
        required_error: 'Images are required',
        invalid_type_error: 'Images should be a string',
      }),
    ),
    tags: z.array(
      z.string({
        required_error: 'Tags are required',
        invalid_type_error: 'Tags should be a string',
      }),
    ),
    category: z.string({
      required_error: 'Category is required',
    }),
    sub_category: z.string({
      required_error: 'Sub category is required',
    }),
  }),
});

const UpdateProductsValidationSchema = z.object({
  body: z.object({
    sku: z
      .string({
        invalid_type_error: 'Serial number should be a string',
      })
      .optional(),
    name: z
      .string({
        invalid_type_error: 'Product name should be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Product description should be a string',
      })
      .optional(),
    short_description: z
      .string({
        invalid_type_error: 'Product short description should be a string',
      })
      .optional(),
    old_price: z
      .number({
        invalid_type_error: 'Old price should be a number',
      })
      .positive({
        message: 'Old price should be a positive number',
      })
      .optional(),
    last_price: z
      .number({
        invalid_type_error: 'Last price should be a number',
      })
      .positive({
        message: 'Last price should be a positive number',
      })
      .optional(),
    stock: z
      .number({
        invalid_type_error: 'Stock should be a number',
      })
      .positive({
        message: 'Stock should be a positive number',
      })
      .optional(),
    images: z
      .array(
        z.string({
          invalid_type_error: 'Images should be a string',
        }),
      )
      .optional(),
    tags: z
      .array(
        z.string({
          invalid_type_error: 'Tags should be a string',
        }),
      )
      .optional(),
    category: z
      .string({
        required_error: 'Category is required',
      })
      .optional(),
    sub_category: z
      .string({
        required_error: 'Sub category is required',
      })
      .optional(),
  }),
});

const ProductValidations = {
  CreateProductValidationSchema,
  UpdateProductsValidationSchema,
};

export default ProductValidations;
