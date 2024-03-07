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
  }),
});

const changeUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
const userValidations = {
  userValidationSchema,
  changeUserStatusValidationSchema,
};

export default userValidations;
