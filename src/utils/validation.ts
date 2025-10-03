import z from "zod";

export const createRegisterUserSchema = z.object({
    name:z.string().min(2).max(20),
    email:z.string().min(2).max(100).email(),
    password:z.string().min(6).max(50)
})

export const loginSchema = z.object({
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
});

export const customerCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  website: z.boolean().optional(),
  apps: z.boolean().optional(),
  markiting: z.boolean().optional(),
  seo: z.boolean().optional(),
  ai: z.boolean().optional(),
  website_ai_complate: z.boolean().optional(),
  apps_ai_complate: z.boolean().optional(),
  markiting_ai_complate: z.boolean().optional(),
  seo_ai_complate: z.boolean().optional(),
  ai_complate: z.boolean().optional(),
});
