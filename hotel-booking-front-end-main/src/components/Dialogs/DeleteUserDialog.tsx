import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDelUser } from "@/hooks/users/use-del-user";

export function DeleteUserDialog() 
{
  const deleteUser = useDelUser();

  function handleDeleteUser()
  {
    deleteUser.mutate();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2 border border-red-500 bg-white text-red-500 hover:bg-white hover:opacity-75 sm:w-3/4 md:w-3/4">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm User Deletion</DialogTitle>
          <DialogDescription>
            This action is irreversible. Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="w-full">
            <Button className="w-1/2 border border-red-500 bg-red-500 text-white hover:bg-red-500 hover:opacity-75 mx-auto"
            onClick={handleDeleteUser}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
