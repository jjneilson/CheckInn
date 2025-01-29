import { useMutation } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import axiosInstance from "@/lib/axios-config";
import { UpdatePasswordSchema } from "@/schemas/updatePassword-schema";

export function useUpdPassword()
{
    const {toast} = useToast();

    return useMutation(
        {
            mutationFn: async (values: UpdatePasswordSchema) =>
            {
                const res = await axiosInstance.patch("/api/users/edit/password", values);
                return res.data;
            },
            onSuccess: () =>
            {
                toast({title: "Password has been updated"});
            },
            onError: () =>
            {
                toast({title: "Incorrect old password"})
            }
        }
    )
}