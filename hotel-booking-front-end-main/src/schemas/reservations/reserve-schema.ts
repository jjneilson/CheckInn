import { z } from "zod";

export const reserveFormSchema = z.object(
    {
        userId: z.number(),
        checkInTime: z.string(),
        checkOutTime: z.string(),
    }
);

export type ReserveSchema = z.infer<typeof reserveFormSchema>;