import z from 'zod';
import { UserStatus } from './User.constant';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required!',
        invalid_type_error: 'Name should be a string!',
      })
      .min(2, {
        message: 'Name should be at least 2 characters long!',
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
      .string({})
      .min(2, {
        message: 'First Name should be at least 2 characters long!',
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

const userValidations = {
  userValidationSchema,
  updateUserValidation,
};

export default userValidations;
