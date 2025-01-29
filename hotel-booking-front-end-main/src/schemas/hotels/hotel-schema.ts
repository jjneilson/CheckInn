import { z } from "zod";

export const hotelFormSchema = z.object({
    hotelName: z.string().min(1, "Please enter a hotel name").max(50),
    description: z.string().min(1, "Please enter a description"),
    rooms: z.string().min(1, "Please enter a number of rooms"),
    location: z.string().min(1, "Please enter a location").max(50),
    price: z.string().min(1, "Please enter a price"),
    image: z.string().min(1, "Please enter an image URL"),
})

export type HotelSchema = z.infer<typeof hotelFormSchema>;