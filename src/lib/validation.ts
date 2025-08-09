import * as z from "zod";

/**
 * Common name field schema
 */
const nameSchema = z
  .string()
  .min(1, { message: "This field is required" })
  .min(2, { message: "Must be at least 2 characters" })
  .max(50, { message: "Must be less than 50 characters" })
  .regex(/^[a-zA-Z\s\-']+$/, {
    message: "Can only contain letters, spaces, hyphens, and apostrophes",
  });

/**
 * Common email schema
 */
const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Please enter a valid email address" })
  .max(100, { message: "Email must be less than 100 characters" });

/**
 * Common password schema
 */
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(100, { message: "Password must be less than 100 characters" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/\d/, { message: "Must contain at least one number" })
  .regex(/[@$!%*?&]/, {
    message:
      "Must contain at least one special character (@, $, !, %, *, ?, &)",
  });

/**
 * LOGIN FORM SCHEMA
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Password is required" }),
});

/**
 * REGISTER FORM SCHEMA
 */
export const registerSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

/**
 * CONTACT FORM SCHEMA
 */
export const contactSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .regex(/^[\d\s\-+()]+$/, {
      message: "Please enter a valid phone number",
    })
    .transform((val) => val.replace(/\s/g, ""))
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(1, { message: "Please provide a message" })
    .max(1000, { message: "This section must be less than 1000 characters" }),
});
