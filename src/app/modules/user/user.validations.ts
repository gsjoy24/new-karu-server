import z from 'zod';
import { UserStatus } from './user.constant';

const userValidationSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z
        .string({
          required_error: 'First Name is required!',
          invalid_type_error: 'First Name should be a string!',
        })
        .min(3, { message: 'First Name should be at least 3 characters long!' })
        .max(20, {
          message: 'First Name should be at most 20 characters long!',
        }),
      lastName: z
        .string({
          required_error: 'Last Name is required!',
          invalid_type_error: 'Last Name should be a string!',
        })
        .min(3, {
          message: 'Last Name should be at least 3 characters long!',
        })
        .max(20, {
          message: 'Last Name should be at most 20 characters long!',
        }),
    }),
    email: z.string().email({
      message: 'Invalid email format!',
    }),
    password: z.string().refine(
      (data) => {
        const passwordRegex = new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&\\*])(?=.{8,})',
        );
        return passwordRegex.test(data);
      },
      {
        message:
          'The password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.',
      },
    ),
    courier_address: z.string({
      required_error: 'Courier Address is required!',
      invalid_type_error: 'Courier Address should be a string!',
    }),
    city: z.string({
      required_error: 'City is required!',
      invalid_type_error: 'City should be a string!',
    }),
    district: z.string({
      required_error: 'District is required!',
      invalid_type_error: 'District should be a string!',
    }),
    postal_code: z.string({
      required_error: 'Postal Code is required!',
      invalid_type_error: 'Postal Code should be a string!',
    }),
    mobile_number: z.string({
      required_error: 'Mobile Number is required!',
      invalid_type_error: 'Mobile Number should be a string!',
    }),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string()
          .min(3, {
            message: 'First Name should be at least 3 characters long!',
          })
          .max(20, {
            message: 'First Name should be at most 20 characters long!',
          })
          .optional(),
        lastName: z
          .string()
          .min(3, {
            message: 'Last Name should be at least 3 characters long!',
          })
          .max(20, {
            message: 'Last Name should be at most 20 characters long!',
          })
          .optional(),
      })
      .optional(),
  }),
  courier_address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  postal_code: z.string().optional(),
  mobile_number: z.string().optional(),
  status: z.enum([...UserStatus] as [string, ...string[]]).optional(),
});

const userValidations = {
  userValidationSchema,
  updateUserValidation,
};

export default userValidations;
