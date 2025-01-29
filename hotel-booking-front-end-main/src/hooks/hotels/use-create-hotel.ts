import axiosInstance from "@/lib/axios-config";
import { HotelSchema } from "@/schemas/hotels/hotel-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export function useCreateHotel()
{
    // const router = useRouter();
    const {toast} = useToast();
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async (values: HotelSchema) =>
            {
                const res = await axiosInstance.post("/api/hotels/create", values);
                return res.data;
            },
            onSuccess: () =>
            {
                toast(
                    {
                        title: "Hotel Created"
                    }
                );
                queryClient.invalidateQueries({
                    queryKey: ["hotels"]
                });
            },
            onError: () =>
            {
                toast(
                    {
                        title: "Hotel Creation Failed"
                    }
                );
            }
        }
    )
}