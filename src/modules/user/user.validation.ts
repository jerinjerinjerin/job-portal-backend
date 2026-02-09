import e from "express";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100),

  email: z
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z
    .enum(["candidate", "employer"])
    .default("candidate"),
});

export const loginSchema = z.object({
  email: z
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;
