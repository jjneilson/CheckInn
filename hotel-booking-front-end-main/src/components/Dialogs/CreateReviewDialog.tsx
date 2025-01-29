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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  reviewFormSchema,
  ReviewSchema,
} from "@/schemas/reviews/reviews-schema";
import { useAtom } from "jotai";
import { hotelAtom, userAtom } from "@/store/atoms";
import { useEffect } from "react";
import { useCreateReview } from "@/hooks/reviews/use-create-review";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@tanstack/react-router";

export function CreateReviewDialog() {
  //   const { mutate: create, isPending } = useCreateReview();
  const [hotel] = useAtom(hotelAtom);
  const { mutate: createReview } = useCreateReview();
  const { toast } = useToast();
  const [user] = useAtom(userAtom);

  const form = useForm<ReviewSchema>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      title: "",
      description: "",
      rating: "5",
      hotel: {
        hotelId: hotel?.hotelId || 0,
      },
    },
  });

  function onSubmit(values: ReviewSchema) {
    let num = parseInt(values.rating);
    if (num > 5 || num < 1) {
      form.setError("rating", { message: "Rating must be between 1 and 5" });
      toast({ title: "Rating must be between 1 and 5" });
      return;
    }
    if (values.rating.includes("."))
    {
      form.setError("rating", {message: "Rating cannot be decimal values"});
      toast({ title: "Rating cannot be decimal values" });
      return;
    }
    const req = {
      title: values.title,
      description: values.description,
      rating: values.rating,
      hotel: {
        hotelId: values.hotel.hotelId,
      },
    };
    // console.log(req);
    createReview(req);
    form.reset();
  }

  useEffect(() => {
    if (hotel) {
      form.reset({
        title: "",
        description: "",
        rating: "5",
        hotel: {
          hotelId: hotel.hotelId,
        },
      });
    }
  }, [hotel, form]);

  if (!user) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-1/2 bg-green-600 text-white hover:bg-green-600 hover:opacity-75 xs:w-full">
            Add Review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to log in to write a review. Please log in to continue.
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
        <Button className="w-1/2 bg-green-600 text-white hover:bg-green-600 hover:opacity-75 xs:w-full">
          Add Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>
            Share your thoughts and feedback about your experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Rating" {...field} />
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
                  Add Review
                </Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
