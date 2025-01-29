import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";
import { useSetAtom } from "jotai";
import { reviewAtom } from "@/store/atoms";

export function useFetchReviewByHotel(id: any) {
  const setReview = useSetAtom(reviewAtom);
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      if (!id) return null;
      try {
        const resp = await axiosInstance.get(`/api/reviews/hotel/${id}`);
        setReview(resp.data);
        return resp.data;
      } catch (e) {
        // console.log(e);
        return null;
      }
    },
  });
}
