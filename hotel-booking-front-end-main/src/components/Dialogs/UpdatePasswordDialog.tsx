import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordFormSchema, UpdatePasswordSchema } from "@/schemas/updatePassword-schema";
import { useUpdPassword } from "@/hooks/users/use-upd-password";
import { useToast } from "@/hooks/use-toast";

export function UpdatePasswordDialog() {
  const updPassword = useUpdPassword();
  const {toast} = useToast();

  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: UpdatePasswordSchema) 
  {
    if (values.confirmPassword !== values.newPassword)
    {
      form.setError("confirmPassword", {message: "Passwords do not match"});
      toast({title: "Confirm Password and New Password do not match"})
      return;
    }
    updPassword.mutate(values);
    form.reset();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2 border border-black bg-white text-black hover:bg-white hover:opacity-75 sm:w-3/4 md:w-3/4">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Your Password</DialogTitle>
          <DialogDescription>
            Securely change your password to keep your account safe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Current Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="New Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose className="w-full">
                <Button
                  type="submit"
                  // disabled={isPending}
                  className="w-1/2 bg-blue-500 hover:bg-blue-500 hover:opacity-75"
                >
                  Confirm
                </Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
