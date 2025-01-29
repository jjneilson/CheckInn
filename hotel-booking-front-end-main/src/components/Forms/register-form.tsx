import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  registerFormSchema,
  RegisterSchema,
} from "@/schemas/auth/register-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useRegister } from "@/hooks/users/auth/use-register";
import { blueAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function RegisterForm() {
  const [, setBlue] = useAtom(blueAtom);

  useEffect(() => {
    setBlue(false);
  }, []);
  const { mutate: register, isPending } = useRegister();

  // Define your form
  const form = useForm<RegisterSchema>({
    // resolver integrates wuth your preferred validation library
    resolver: zodResolver(registerFormSchema),
    // this is the default values for the form
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Define the onSubmit function
  const onSubmit = (data: RegisterSchema) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords do not match." });
      return;
    }

    try {
      register(data);
      // console.log("Registration successful", data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="col-start-4 col-end-10 row-start-3 row-end-12 flex rounded bg-white p-2 sm:col-span-full lg:col-start-2 lg:col-end-12 2xl:col-start-4 2xl:col-end-10 xs:col-span-full xs:h-full">
      <div className="register_form_image relative w-1/2 xs:hidden">
        <img
          src="https://img.freepik.com/free-photo/one-person-typing-laptop-night-generated-by-ai_188544-27872.jpg"
          alt="Laptop Image"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center p-3 text-center text-white">
          <h1 className="mb-3 text-2xl font-bold">Create an Account</h1>
          <h2 className="">
            Sign up with your details to get started and join our community.
          </h2>
        </div>
      </div>
      <div className="flex w-1/2 flex-col justify-center rounded-md bg-white p-5 xs:w-full">
        <div className="mb-8 text-center text-lg font-semibold">Sign Up</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center space-y-1"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
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
              Register
            </Button>
          </form>
        </Form>
        <div className="mt-4 xs:hidden">
          Already have an account?
          <Link to="/login" className="ml-1 text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
