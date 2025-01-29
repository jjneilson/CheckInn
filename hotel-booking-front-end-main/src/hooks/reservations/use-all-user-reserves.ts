import axiosInstance from "@/lib/axios-config";
import { allReserveAtom, Reservation,  } from "@/store/atoms";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

export function useAllUserReserves()
{
    const setAllReserve = useSetAtom(allReserveAtom);

    return useQuery<Reservation[]>(
        {
            queryKey: ["reservations"],
            queryFn: async () =>
            {
                const res = await axiosInstance.get<Reservation[]>("/api/reservations/user");
                // console.log("entered");
                setAllReserve(res.data);
                return res.data;
            },
        }
    )
}