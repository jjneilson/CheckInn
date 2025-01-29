import { z } from "zod";

export const updateUserFormSchema = z.object({
  firstName: z
    .string({ message: "Please enter a valid first name" })
    .min(1, "Please enter a valid first name")
    .max(50),

  lastName: z
    .string({ message: "Please enter a valid last name." })
    .min(1, "Please enter a valid first name")
    .max(50),
});

export type UpdateUserSchema = z.infer<typeof updateUserFormSchema>;
