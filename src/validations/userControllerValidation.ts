import z from 'zod';

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const UserRegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.string(),
  phone: z.string(),
});
