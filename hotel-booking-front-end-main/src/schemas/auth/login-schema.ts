import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().min(1, "Please enter an email").max(50),

    password: z.string().min(8, "Password must be at least 8 characters long.").max(50),
});

export type LoginSchema = z.infer<typeof loginFormSchema>;