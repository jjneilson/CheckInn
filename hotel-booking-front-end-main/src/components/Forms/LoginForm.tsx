import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { loginFormSchema, LoginSchema } from "@/schemas/auth/login-schema";
import { useLogin } from "@/hooks/users/auth/use-login";
import { blueAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import axiosInstance from "@/lib/axios-config.ts";

export default function LoginForm() {
  const [, setBlue] = useAtom(blueAtom);

  useEffect(() => {
    setBlue(false);
    axiosInstance.get("api/auth/ping").then((res) => console.log(res.data));
  }, []);
  const { mutate: login, isPending } = useLogin();

  // Define your form
  const form = useForm<LoginSchema>({
    // resolver integrates wuth your preferred validation library
    resolver: zodResolver(loginFormSchema),
    // this is the default values for the form
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define the onSubmit function
  const onSubmit = (data: LoginSchema) => {
    try {
      login(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // <div className="flex w-1/2 h-1/2 p-2 bg-white rounded"> => changed
  return (
    <div className="col-start-4 col-end-10 row-start-4 row-end-10 flex rounded bg-white p-2 sm:col-span-full md:col-start-1 md:col-end-13 lg:col-start-2 lg:col-end-12 2xl:col-start-4 2xl:col-end-10 xs:col-span-full">
      <div className="login_form_image relative w-1/2 xs:hidden">
        <img
          src="https://img.freepik.com/free-photo/one-person-typing-laptop-night-generated-by-ai_188544-27872.jpg"
          alt="Laptop Image"
          className="h-full w-full"
        />
        <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center p-3 text-center text-white">
          <h1 className="mb-3 text-2xl font-bold">Welcome Back</h1>
          <h2 className="">
            Please log in using your personal information to stay connected with
            us.
          </h2>
        </div>
      </div>

      <div className="flex w-1/2 flex-col justify-center rounded-md bg-white p-5 xs:w-full">
        <div className="mb-8 text-center text-lg font-semibold">Login</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center space-y-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="!mt-5 w-full bg-blue-500 text-white hover:bg-blue-500 hover:opacity-75"
            >
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-4 xs:hidden">
          Don't have an account?
          <Link to="/register" className="ml-1 text-blue-500">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
