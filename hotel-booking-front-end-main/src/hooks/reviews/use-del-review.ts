import axiosInstance from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export function useDelReview() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewId: number) => {
      const res = await axiosInstance.delete(`/api/reviews/del/${reviewId}`);
      return res.data;
    },
    onSuccess: () => {
      toast({ title: "Review Deleted" });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["user-reviews"],
      });
    },
    onError: () => {
      toast({ title: "Error: Review could not be deleted" });
    },
  });
}
