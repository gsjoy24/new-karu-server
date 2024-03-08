import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    name: createUserNameValidationSchema,
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'The value must be a string',
      })
      .min(6, 'Password can not be less than 6 characters')
      .max(20, 'Password can not be more than 20 characters'),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email  must be a string',
      })
      .email({
        message: 'Invalid email',
      }),
    gender: z.enum(['male', 'female', 'other'], {
      required_error: 'Gender is required',
      invalid_type_error: 'Gender must be male, female or other',
    }),
    dateOfBirth: z.string().optional(),
    contactNo: z.string({
      required_error: 'Contact number is required',
      invalid_type_error: 'Contact number must be a string',
    }),
    presentAddress: z.string({
      required_error: 'Present address is required',
      invalid_type_error: 'Present address must be a string',
    }),
    permanentAddress: z.string({
      required_error: 'Permanent address is required',
      invalid_type_error: 'Permanent address must be a string',
    }),
    profileImg: z
      .string({
        required_error: 'Profile image is required',
      })
      .url({
        message: 'Invalid URL',
      }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: updateUserNameValidationSchema,
      gender: z.string().optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
