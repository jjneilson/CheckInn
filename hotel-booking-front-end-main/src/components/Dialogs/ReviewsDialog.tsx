import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ReviewItem from "../ReviewItem";
import { useFetchReviewByHotel } from "@/hooks/reviews/use-fetchAllReviewByHotelId";
import { useAtom } from "jotai";
import { hotelAtom, reviewAtom } from "@/store/atoms";
import { useEffect } from "react";

export function ReviewsDialog() {
  const [hotel] = useAtom(hotelAtom);
  useFetchReviewByHotel(hotel?.hotelId);

  const [reviews] = useAtom(reviewAtom);

  // if (Array.isArray(reviews) && reviews.length > 0) {
  //   console.log(`first review: ${reviews[reviews.length-1].reviewId}`);
  //   console.log(`first review: ${reviews[reviews.length-1].title}`);
  // }

  useEffect(() => {}, [reviews]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-600 hover:opacity-75 sm:w-1/2 xxs:w-full">
          Reviews
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reviews</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="scrollbar-hidden grid max-h-96 gap-4 overflow-y-auto py-4">
          {Array.isArray(reviews) &&
            reviews.map((review) => (
              <ReviewItem
                key={review.reviewId}
                reviewId={review.reviewId}
                title={review.title}
                description={review.description}
                rating={review.rating}
                userFN={review.user.firstName}
                userLN={review.user.lastName}
                show={false}
                userId={review.user.userId}
                profile={false}
              />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
