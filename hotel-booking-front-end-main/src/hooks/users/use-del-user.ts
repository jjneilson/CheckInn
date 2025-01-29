import { useRouter } from "@tanstack/react-router";
import { useToast } from "../use-toast";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";

export function useDelUser()
{
    const {toast} = useToast();
    const router = useRouter();
    const setUser = useSetAtom(userAtom);

    return useMutation(
        {
            mutationFn: async () =>
            {
                const res = await axiosInstance.delete(`/api/users/del`);
                return res.data;
            },
            onSuccess: () =>
            {
                localStorage.removeItem("token");
                setUser(null);
                toast({
                    title: "User deleted successfully",
                });
                router.navigate({to: "/"});
            },
            onError: () =>
            {
                toast({title: "Error Deleting User"});
            }
        }
    )
}