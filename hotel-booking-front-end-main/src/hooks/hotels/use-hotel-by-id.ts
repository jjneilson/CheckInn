import {
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";

export function useHotelById(id: number): UseQueryResult<{
  hotelId: number;
  hotelName: string;
  description: string;
  rooms: number;
  location: string;
  price: number;
  image: string;
}> {
  // const {toast} = useToast();
  // const queryClient = useQueryClient();

  return useQuery({
    queryKey: [
        // id,
        "hotelId",
        "hotelName",
        "description",
        "rooms",
        "location",
        "price",
        "image",
    ],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/hotels/${id}`);
      // console.log(res.data);
      return res.data;
    },
  });
}
