import axiosInstance from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { ReviewUpdSchema } from "@/schemas/reviews/review-upd-schema";

export function useUpdReview(id: number)
{
    const {toast} = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: ReviewUpdSchema) =>
        {
            const res = await axiosInstance.patch(`/api/reviews/edit/${id}`, values);
            return res.data;
        },
        onSuccess: () =>
        {
            toast({title: "Review Updated"});
            queryClient.invalidateQueries({queryKey: ["reviews"]})
        },
        onError: () =>
        {
            toast({title: "Error Updating Review"});
        }
    })
}