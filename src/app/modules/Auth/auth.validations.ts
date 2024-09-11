import { z } from 'zod';

const LoginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
      invalid_type_error: 'New password must be a string',
    }),
  }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
    token: z.string({
      required_error: 'Token is required',
    }),
  }),
});

export const AuthValidations = {
  LoginUserValidationSchema,
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
};
