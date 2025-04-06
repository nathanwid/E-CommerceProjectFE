import { object, string } from "zod";

export const RegisterSchema = object({
  name: string().min(1, "Name must be more than 1 character"),

  email: string().email("Invalid email format"),

  phoneNumber: string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits"),

  password: string()
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),

  confirmPassword: string()
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password does not match",
  path: ["confirmPassword"],
});

export const SignInSchema = object({
  email: string().email("Invalid email format"),

  password: string()
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
