import z from 'zod';
import { UserStatus } from './user.constant';

const userValidationSchema = z.object({
  name: z.object({
    firstName: z.string().max(20, {
      message: 'First Name can not be more than 20 characters',
    }),
    lastName: z.string().max(20, {
      message: 'Last Name can not be more than 20 characters',
    }),
  }),
  email: z
    .string({
      required_error: 'Email address is required!',
    })
    .email({ message: 'Invalid email address!' }),
  password: z
    .string({ invalid_type_error: 'Password must be string!' })
    .max(20, { message: 'Password can not be more than 20 characters.' }),
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
