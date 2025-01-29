import axiosInstance from "@/lib/axios-config";
import { allHotelReviewsAtom, Review } from "@/store/atoms";
import { useQuery} from "@tanstack/react-query";
import { useSetAtom } from "jotai";

export function useHotelReviews(id: any)
{
    const setAllHotelReviews = useSetAtom(allHotelReviewsAtom);

    return useQuery<Review[]>(
        {
            queryKey: ["reviews"],
            queryFn: async () =>
            {
                const res = await axiosInstance.get<Review[]>(`/api/reviews/hotel/${id}`);
                setAllHotelReviews(res.data);
                return res.data;
            },
        }
    )
}