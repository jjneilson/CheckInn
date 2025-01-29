import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";
import { useRouter } from "@tanstack/react-router";
import axios from "axios";
import { RegisterSchema } from "@/schemas/auth/register-schema";
import { useToast } from "../../use-toast";

export function useRegister() {
  const { toast } = useToast();
  const router = useRouter();

    return useMutation({
        mutationFn: async (values: RegisterSchema) => {
            const resp = await axiosInstance.post("/api/auth/register", values);
            // console.log(`headers: ${resp.headers}`);
            // console.log(`body: ${resp.data}`);
            return resp.data;
            // return;
        },
        onSuccess: () => {
            toast({
                title: "Account Created",
            });
            router.navigate({ to: "/login" });
        },
        onError: (error: any) => {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                toast({
                    title: "Failed to create account",
                    description: "An account with this username already exists.",
                });
            } else {
                toast({
                    title: "Failed to create account",
                    description: `Unexpected error: ${error.message}`,
                });
            }
        },
    });
}
