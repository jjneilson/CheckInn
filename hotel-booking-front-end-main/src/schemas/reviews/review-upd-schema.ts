import { z } from "zod";

export const reviewUpdFormSchema = z.object({
    title: z.string().min(1, "Please enter a review title").max(50, "Title cannot exceed 50 characters"),
    description: z.string().min(1, "Please enter a description"),
    rating: z.string(),
});

export type ReviewUpdSchema = z.infer<typeof reviewUpdFormSchema>;