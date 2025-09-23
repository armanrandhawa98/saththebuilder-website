// lib/validation.ts
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(24),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  identifier: z.string().min(3), // email OR username
  password: z.string().min(6),
});

export const projectCreateSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional().default(""),
  images: z.array(z.string().url()).optional().default([]),
  tags: z.array(z.string().min(1)).optional().default([]),
  isPublished: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(false),
});

export const projectUpdateSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string().min(1)).optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export const contactCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().max(40).optional().default(""),
  message: z.string().min(10).max(2000),
  tags: z.array(z.string().min(1)).optional().default([]),
  // honeypot: if bot fills this, we reject
  website: z.string().optional().default(""),
});
