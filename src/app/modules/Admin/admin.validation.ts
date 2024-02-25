import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20).optional(),
  lastName: z.string().max(20),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    adminData: z.object({
      name: createUserNameValidationSchema,
      gender: z.string({
        required_error: 'Gender is required',
        invalid_type_error: 'The value must be a string',
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
          invalid_type_error: 'The value must be a string',
        })
        .optional(),
      email: z.string().email({
        message: 'Invalid email',
      }),
      contactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string(),
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
