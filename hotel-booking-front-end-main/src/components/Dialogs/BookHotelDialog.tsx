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
import { Calendar } from "../ui/calendar";
import React from "react";
import { Input } from "../ui/input";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { useCreateReserve } from "@/hooks/reservations/use-create-reserve";
import { useForm } from "react-hook-form";
import {
  reserveFormSchema,
  ReserveSchema,
} from "@/schemas/reservations/reserve-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";

export function BookHotelDialog() {
  const [dates, setDates] = React.useState<Date[] | undefined>([]);
  const [user] = useAtom(userAtom);
  const { mutate: createReserve } = useCreateReserve();

  const form = useForm<ReserveSchema>({
    resolver: zodResolver(reserveFormSchema),
    defaultValues: {
      userId: user?.userId,
      checkInTime: "",
      checkOutTime: "",
    },
  });

  // Get the earliest and latest dates from the selected dates
  const checkIn = dates?.length
    ? new Date(Math.min(...dates.map((date) => date.getTime())))
    : undefined;
  const checkOut = dates?.length
    ? new Date(Math.max(...dates.map((date) => date.getTime())))
    : undefined;

  const onSubmit = (data: ReserveSchema) => {
    // console.log(values);
    try {
      createReserve(data);
      setDates([]);
      form.reset();
      // console.log("Registration successful", data);
    } catch (error) {
      // console.error("Registration failed:", error);
    }
  };

  if (!user) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-1/2 bg-blue-500 hover:bg-blue-500 hover:opacity-75 xs:w-full">
            Book Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to log in to book a hotel. Please log in to continue.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="w-full">
              <DialogClose className="w-full">
                <Button
                  className="mx-auto w-1/2 bg-blue-500 hover:bg-blue-500 hover:opacity-75 relative"
                  type="button"
                >
                  <Link
                    to="/login"
                    className={`text-white [&.active]:font-bold w-full h-full absolute flex justify-center items-center`}
                  >
                    Login
                  </Link>
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2 bg-blue-500 hover:bg-blue-500 hover:opacity-75 xs:w-full">
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Reservation</DialogTitle>
          <DialogDescription>Pick at least 2 dates.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Calendar
            mode="multiple"
            fromDate={new Date(new Date().setDate(new Date().getDate() + 1))}
            selected={dates}
            onSelect={setDates}
            className="mx-auto rounded-md border shadow"
          />
          <div className="grid grid-cols-5 items-center gap-4">
            <Input
              id="check_in_time"
              name="checkInTime"
              placeholder="CheckIn"
              value={checkIn ? checkIn.toLocaleDateString() : ""}
              readOnly
              className="col-span-2"
            />
            <span className="col-span-1 text-center">to</span>
            <Input
              id="check_out_time"
              name="checkOutTime"
              placeholder="CheckOut"
              value={checkOut ? checkOut.toLocaleDateString() : ""}
              readOnly
              className="col-span-2"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose className="w-full">
            <Button
              className="mx-auto w-1/2 bg-blue-500 hover:bg-blue-500 hover:opacity-75"
              type="button"
              onClick={() => {
                // fillDates();
                if (checkIn && checkOut) {
                  let inString = checkIn.toISOString();
                  let outString = checkOut.toISOString();

                  form.setValue("checkInTime", inString);
                  form.setValue("checkOutTime", outString);

                  // console.log(inString);
                  // console.log(outString);

                  form.handleSubmit(onSubmit)();
                }
              }}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
