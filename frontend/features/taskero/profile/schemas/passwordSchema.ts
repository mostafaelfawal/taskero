import z from "zod";

export const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Old password must be at least 6 chars"),
  newPassword: z.string().min(6, "New password must be at least 6 chars"),
});

export type PasswordSchemaType = z.infer<typeof passwordSchema>;
