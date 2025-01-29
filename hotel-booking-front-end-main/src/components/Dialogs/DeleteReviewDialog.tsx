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
import { useDelReview } from "@/hooks/reviews/use-del-review";

interface DeleteReviewDialogProps
{
  reviewId: number;
}

export function DeleteReviewDialog({reviewId} : DeleteReviewDialogProps) 
{
  // console.log(`review id: ${reviewId}`);
  const del = useDelReview();

  function delReview()
  {
    del.mutate(reviewId);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2 border border-red-500 bg-white text-red-500 hover:bg-white hover:opacity-75">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Review Deletion</DialogTitle>
          <DialogDescription>
            This action is irreversible. Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="w-full">
            <Button className="w-1/2 border border-red-500 bg-red-500 text-white hover:bg-red-500 hover:opacity-75 mx-auto"
            onClick={delReview}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
