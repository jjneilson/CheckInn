import {
  UpdateUserSchema,
  updateUserFormSchema,
} from "@/schemas/updateUser-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { useUpdUser } from "@/hooks/users/use-upd-user";

export default function UpdateUserForm() 
{
  const [user, setUser] = useAtom(userAtom);
  const update = useUpdUser();

  // console.log("User updated:", user);

  // Define your form
  const form = useForm<UpdateUserSchema>({
    // resolver integrates wuth your preferred validation library
    resolver: zodResolver(updateUserFormSchema),
    // this is the default values for the form
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  // Define the onSubmit function
  const onSubmit = (data: UpdateUserSchema) => {
    try {
      // this is where you have to hook it up with the backend
      update.mutate(data);
      setUser((prev) => (
        prev ? {
          ...prev,
          firstName: data.firstName,
          lastName: data.lastName,
        } : null
      ))
      
    } catch (error) {
      console.error("User update failed:", error);
    }
  };

  return (
    <div className="w-5/6 p-3 shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center space-y-3"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="First Name" {...field} />
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
                  <Input type="text" placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="!mt-5 w-full bg-blue-500 text-white hover:bg-blue-500 hover:opacity-75"
          >
            Confirm
          </Button>
        </form>
      </Form>
    </div>
  );
}
