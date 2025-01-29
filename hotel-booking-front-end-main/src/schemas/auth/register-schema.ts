import { z } from "zod";

export const registerFormSchema = z.object({
    firstName: z.string().min(1, "Please enter a valid first name").max(50),

    lastName: z.string().min(1, "Please enter a valid last name").max(50),

    email: z.string().min(1, "Please enter a valid email").max(50),

    password: z.string().min(8, "Password must be at least 8 characters long.").max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, "The password must have an UPPERCASE, LOWERCASE and at least 1 number"),

    confirmPassword: z.string().min(1, "Please confirm your password."),
});

export type RegisterSchema = z.infer<typeof registerFormSchema>;