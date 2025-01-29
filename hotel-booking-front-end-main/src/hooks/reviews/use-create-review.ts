import axiosInstance from "@/lib/axios-config";
import { ReviewSchema } from "@/schemas/reviews/reviews-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useSetAtom } from "jotai";
import { reviewAtom } from "@/store/atoms";

export function useCreateReview()
{
    const {toast} = useToast();
    const queryClient = useQueryClient();
    const setReview = useSetAtom(reviewAtom);

    return useMutation(
        {
            mutationFn: async (values: ReviewSchema) =>
            {
                const res = await axiosInstance.post("/api/reviews/create", values);
                return res.data;
            },
            onSuccess: (data) =>
            {
                toast({title: "Review Added"});
                queryClient.invalidateQueries({
                    queryKey: ["reviews"]
                });
                setReview(data);
            },
            onError: () =>
            {
                toast({title: "Error Adding Review"});
            }
        }
    )
}