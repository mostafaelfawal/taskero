import z from "zod";

export const authSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").optional(),
  email: z
    .string()
    .email("Invalid email address")
    .max(60, "Email must not exceed 60 characters"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type AuthSchemaType = z.infer<typeof authSchema>;
