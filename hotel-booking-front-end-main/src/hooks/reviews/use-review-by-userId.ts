import axiosInstance from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";

export function useReviewByUserId(userId: number)
{

    return useQuery(
        {
            queryKey: ["user-reviews", userId],
            queryFn: async () =>
            {
                const res = await axiosInstance.get(`/api/reviews/user/${userId}`);
                return res.data;
            }
        }
    )
}