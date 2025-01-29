import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { EllipsisVertical, Star } from "lucide-react";
import { ReviewsDialog } from "./Dialogs/ReviewsDialog";
import { DeleteReviewDialog } from "./Dialogs/DeleteReviewDialog";
import { UpdateReviewDialog } from "./Dialogs/UpdateReviewDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";

// modify as needed, might have to pass in some user info to get the avatar to display properly
interface ReviewItemProps {
  reviewId: number;
  title: string;
  description: string;
  rating: number;
  userFN: string;
  userLN: string;
  show: boolean;
  userId: any;
  profile: boolean;
}

export default function ReviewItem({
  reviewId,
  title,
  description,
  rating,
  userFN,
  userLN,
  show,
  userId,
  profile
}: ReviewItemProps) {
  // console.log(`item Id: ${reviewId}`);
  // console.log(`item title: ${title}`);
  const [currentUser] = useAtom(userAtom);
  // console.log(currentUser);

  return (
    <div className="grid h-full grid-cols-8 rounded-md border-2 border-gray-100 p-2 xs:min-w-full">
      <div className={`col-span-1 row-span-1 flex h-full items-center justify-center ${profile ? 'lg:col-span-2 lg:flex md:hidden':''}`}>
        <Avatar className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#022b60b6] text-white">
          <AvatarFallback>
            {userFN?.charAt(0)} {userLN?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className={`col-span-5 row-span-1 flex flex-col justify-center pl-1 ${profile ? 'lg:col-span-4 lg:text-sm md:text-sm md:col-span-6 ':''}`}>
        <h1 className={`review_title font-bold`}>{title}</h1>
        <p className="review_description line-clamp-1">{description}</p>
      </div>
      <div className="col-span-2 row-span-1 flex items-center justify-end gap-2">
        <div className="flex items-center xxs:hidden">
          <span className="text-2xl font-bold text-[#022b60]">{rating}</span>
          <Star fill="#022b60" color="#022b60" className="h-[25px] w-[25px]" />
        </div>

        {show && <ReviewsDialog />}

        {(currentUser?.userId === userId || currentUser?.isAdmin) && (
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical className="m-2 scale-150" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Available Actions
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Pick an option to proceed with your next step.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <UpdateReviewDialog
                    reviewId={reviewId}
                    title={title}
                    description={description}
                    rating={rating}
                  />
                  <DeleteReviewDialog reviewId={reviewId} />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
