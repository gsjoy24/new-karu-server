import z from 'zod';
import { UserStatus } from './User.constant';

const userValidationSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z
        .string({
          required_error: 'First Name is required!',
          invalid_type_error: 'First Name should be a string!',
        })
        .min(2, { message: 'First Name should be at least 2 characters long!' })
        .max(20, {
          message: 'First Name should be at most 20 characters long!',
        }),
      lastName: z
        .string({
          required_error: 'Last Name is required!',
          invalid_type_error: 'Last Name should be a string!',
        })
        .min(2, {
          message: 'Last Name should be at least 2 characters long!',
        })
        .max(20, {
          message: 'Last Name should be at most 20 characters long!',
        }),
    }),
    email: z.string().email({
      message: 'Invalid email format!',
    }),
    password: z
      .string({
        required_error: 'Password is required!',
        invalid_type_error: 'Password should be a string!',
      })
      .min(8, {
        message: 'Password should be at least 8 characters long!',
      }),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string()
          .min(2, {
            message: 'First Name should be at least 2 characters long!',
          })
          .max(20, {
            message: 'First Name should be at most 20 characters long!',
          })
          .optional(),
        lastName: z
          .string()
          .min(2, {
            message: 'Last Name should be at least 2 characters long!',
          })
          .max(20, {
            message: 'Last Name should be at most 20 characters long!',
          })
          .optional(),
      })
      .optional(),
    address: z
      .string()
      .min(3, {
        message: 'Address should be at least 3 characters long!',
      })
      .optional(),
    city: z
      .string()
      .min(3, {
        message: 'City should be at least 3 characters long!',
      })
      .optional(),
    district: z
      .string()
      .min(3, {
        message: 'District should be at least 3 characters long!',
      })
      .optional(),
    mobile_number: z
      .string({
        required_error: 'Mobile Number is required!',
      })
      .refine(
        (value) => {
          // at least 11 digits and at most 14 digits and only digits are allowed
          const regex = /^(\+?88)?01[0-9]{9}$/;
          return regex.test(value);
        },
        {
          message: 'Enter a valid phone number!',
        },
      ),
    status: z.enum([...UserStatus] as [string, ...string[]]).optional(),
  }),
});

const addProductToCartValidation = z.object({
  body: z.object({
    product: z.string({
      required_error: 'Product Id is required to add product in cart!',
    }),
    quantity: z
      .number({
        required_error: 'Product quantity is required to add product in cart!',
        invalid_type_error: 'Quantity should be a number!',
      })
      .nonnegative('Quantity should be a positive number!'),
  }),
});

const userValidations = {
  userValidationSchema,
  updateUserValidation,
  addProductToCartValidation,
};

export default userValidations;
