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
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdReview } from "@/hooks/reviews/use-upd-review";
import { reviewUpdFormSchema, ReviewUpdSchema } from "@/schemas/reviews/review-upd-schema";
import { useToast } from "@/hooks/use-toast";

interface UpdateReviewDialogProps
{
  reviewId: number;
  title: string;
  description: string; 
  rating: number;
}

export function UpdateReviewDialog({reviewId, title, description, rating}: UpdateReviewDialogProps) 
{
  const update = useUpdReview(reviewId);
  const {toast} = useToast();

  const form = useForm<ReviewUpdSchema>({
    resolver: zodResolver(reviewUpdFormSchema),
    defaultValues:
    {
      title: title,
      description: description,
      rating: rating.toString(),
    }
  })

  function onSubmit(values: ReviewUpdSchema)
  {
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

    const req = 
    {
      ...values,
      rating: values.rating.toString(),
    }
    update.mutate(req);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2 border border-black bg-white text-black hover:bg-white hover:opacity-75">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Review Details</DialogTitle>
          <DialogDescription>
            Update the review details as needed.
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
                      <Input placeholder="title" {...field} />
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
                      <Input placeholder="description" {...field} />
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
                      <Input type="number" placeholder="rating" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose className="w-full">
                <Button type="submit" className="w-1/2 bg-blue-500 hover:bg-blue-500 hover:opacity-75">Update Review</Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
