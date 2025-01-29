import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

export function UpdateReservationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2 border border-black bg-white text-black hover:bg-white hover:opacity-75">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Reservation Details</DialogTitle>
          <DialogDescription>
            Update the reservation details as needed.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="check_in_time" className="text-right">
              CheckIn
            </Label>
            <Input
              id="check_in_time"
              placeholder="Check in date"
              className="col-span-2 flex justify-center"
              type="date"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="check_out_time" className="text-right">
              CheckOut
            </Label>
            <Input
              id="check_out_time"
              placeholder="Check out date"
              className="col-span-2 flex justify-center"
              type="date"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose className="w-full">
            <Button
              type="submit"
              className="w-1/2 bg-blue-500 text-white hover:bg-blue-500 hover:opacity-75"
            >
              Update Reservation
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
