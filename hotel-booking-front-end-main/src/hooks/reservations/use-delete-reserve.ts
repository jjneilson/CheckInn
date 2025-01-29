import axiosInstance from "@/lib/axios-config";
import { reserveAtom } from "@/store/atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { toast } from "../use-toast";

export function useDeleteReserve()
{
    const [reserve] = useAtom(reserveAtom);
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async () =>
            {
                const res = await axiosInstance.delete(`/api/reservations/del/${reserve?.reservationId}`);
                return res.data;
            },
            onSuccess: () =>
            {
                toast(
                    {
                        title: "Reservation Deleted"
                    }
                );
                queryClient.invalidateQueries({queryKey: ["all-reservations"]});
                queryClient.invalidateQueries({queryKey: ["reservations"]});
            },
            onError: () =>
            {
                toast(
                    {
                        title: "Error Deleting Reservation"
                    }
                );
            }
        }
    )
}