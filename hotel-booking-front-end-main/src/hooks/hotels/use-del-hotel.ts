import axiosInstance from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useRouter } from "@tanstack/react-router";

export function useDelHotel()
{
    const {toast} = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async (id: number) =>
            {
                const res = await axiosInstance.delete(`api/hotels/del/${id}`);
                return res.data;
            },
            onSuccess: () =>
            {
                toast(
                    {
                        title: "Hotel Deleted"
                    }
                );
                queryClient.invalidateQueries(
                    {
                        queryKey: ["hotels"]
                    }
                )
                router.navigate({to:"/HomePage"});
            },
            onError: () =>
            {
                toast(
                    {
                        title: "Hotel Deletion Failed"
                    }
                );
            }
        }
    )
}