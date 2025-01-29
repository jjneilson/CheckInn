import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { HotelSchema } from "@/schemas/hotels/hotel-schema";
import axiosInstance from "@/lib/axios-config";
import { useAtom } from "jotai";
import { hotelAtom } from "@/store/atoms";

export function useUpdateHotel() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [hotel, setHotel] = useAtom(hotelAtom);

  interface Hotel {
    hotelId: any;
    hotelName: string;
    description: string;
    rooms: number;
    location: string;
    price: number;
    image: string;
  }

  return useMutation({
    mutationFn: async (values: HotelSchema) => {
      const res = await axiosInstance.patch(
        `/api/hotels/edit/${hotel?.hotelId}`,
        values,
      );
      const updateHotel: Hotel = {
        hotelId: hotel?.hotelId,
        hotelName: values.hotelName,
        description: values.description,
        rooms: Number(values.rooms),
        location: values.location,
        price: Number(values.price),
        image:values.image
      };
      console.log({ updateHotel });
      //   console.log(hotel?.hotelId);
      //   console.log({ values, hotel });
      //   values.hotelId = hotel?.hotelId;
      setHotel(updateHotel)
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
      toast({
        title: "Hotel Updated",
      });
    },
    onError: () => {
      toast({
        title: "Hotel Update Failed",
      });
    },
  });
}
