import axiosInstance from "@/lib/axios-config";
import { allReserveAtom, Reservation } from "@/store/atoms";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

export function useAllReserves()
{
    const setReserves = useSetAtom(allReserveAtom);

    return useQuery<Reservation[]>(
        {
            queryKey: ["all-reservations"],
            queryFn: async () =>
            {
                const res = await axiosInstance.get<Reservation[]>("/api/reservations/");
                setReserves(res.data);
                return res.data;
            }
        }
    )
}