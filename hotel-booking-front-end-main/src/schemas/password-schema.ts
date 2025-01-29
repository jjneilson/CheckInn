import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string({ message: "Please enter a valid username" })
    .min(1, "Please enter a valid username")
    .max(50),

  password: z
    .string({ message: "Please enter a valid password." })
    .min(8, "Password must be at least 8 characters long.")
    .max(50),
});

export type LoginSchema = z.infer<typeof loginFormSchema>;