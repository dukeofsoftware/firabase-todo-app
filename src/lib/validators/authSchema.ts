import { email, minLength, object, type Output, parse, string } from 'valibot'; // 0.76 kB

export const authSchema = object({
    email: string([email()]),
    password: string([minLength(8)]),
  });
  
export  type AuthType = Output<typeof authSchema>;