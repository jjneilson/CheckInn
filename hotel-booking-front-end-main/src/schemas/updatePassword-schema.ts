import { z } from "zod";

export const updatePasswordFormSchema = z.object({
    oldPassword: z
    .string({ message: "Please enter a valid password." })
    .min(8, "Password must be at least 8 characters long.")
    .max(50),
    newPassword: z
    .string({ message: "Please enter a valid password." })
    .min(8, "Password must be at least 8 characters long.")
    .max(50),
    confirmPassword: z
    .string({ message: "Please enter a valid password." })
    .min(8, "Password must be at least 8 characters long.")
    .max(50),

});

export type UpdatePasswordSchema = z.infer<typeof updatePasswordFormSchema>;