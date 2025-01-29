import {
  // allHotelsAtom,
  // allHotelsAtom,
  filteredHotelsAtom,
  filterWordAtom,
  hotelAtom,
  userAtom,
} from "@/store/atoms";
import { useAtom } from "jotai";
import { EllipsisVertical, Star } from "lucide-react";
import { DeleteHotelDialog } from "../Dialogs/DeleteHotelDialog";
import ReviewDetails from "../ReviewDetails";
import { CreateReviewDialog } from "../Dialogs/CreateReviewDialog";
import { BookHotelDialog } from "../Dialogs/BookHotelDialog";
import { UpdateHotelDialog } from "../Dialogs/UpdateHotelDialog";
import { useFetchReviewByHotel } from "@/hooks/reviews/use-fetchAllReviewByHotelId";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GoogleMapDialog } from "../Dialogs/GoogleMapDialog";
import { ReviewsDialog } from "../Dialogs/ReviewsDialog";

export default function HotelDetails() {
  const [hotel] = useAtom(hotelAtom);
  const [currentUser] = useAtom(userAtom);
  // const [, setBlue] = useAtom(blueAtom);

  // search bar code starts
  const [filteredHotels] = useAtom(filteredHotelsAtom);
  const [filterWord] = useAtom(filterWordAtom);
  // const [allHotels] = useAtom(allHotelsAtom);

  const displayHotel = hotel;
  //   !filterWord || filteredHotels.some((h) => h.hotelId === hotel?.hotelId)
  //     ? hotel
  //     : filteredHotels[0];
  // console.log({displayHotel});

  useEffect(() => {
    // setBlue(false);
    console.log("Inside Useeffect in hotel details");
  }, [filteredHotels, filterWord, hotel]);

  const { data } = useFetchReviewByHotel(displayHotel?.hotelId);
  console.log(data);
  const latestReview = data ? data[data.length - 1] : null;
  console.log({ latestReview });

  let totalReviews = 0;
  let average;

  if (data) {
    totalReviews = data.length;
    average =
      data.reduce(
        (sum: number, review: { rating: number }) => sum + review.rating,
        0,
      ) / totalReviews;

    average = parseFloat(average.toFixed(1));
  }

  if (!displayHotel) {
    return (
      <h1 className="flex h-full w-full items-center justify-center text-xl font-bold shadow-md">
        Please select a hotel
      </h1>
    );
  }

  return (
    <div className="grid h-full w-full grid-rows-8 relative">
      <div className="hotel__image relative row-span-5 w-full xs:row-span-4">
        <img
          src={displayHotel?.image}
          alt={displayHotel?.hotelName}
          className="h-full w-full rounded-md object-cover"
        />
        <GoogleMapDialog />
        {currentUser?.isAdmin ? (
          <div className="hotel__info__buttons absolute right-0 top-0 col-span-2 mt-3 flex flex-col gap-3">
            <Popover>
              <PopoverTrigger>
                <EllipsisVertical className="m-2 scale-150 text-white" />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Available Actions
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      For Managers Only
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <UpdateHotelDialog />
                    <DeleteHotelDialog />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : null}
      </div>
      <div className="row-span-2 grid grid-cols-6 xs:row-span-2">
        <div className="hotel__info col-span-4 flex flex-col gap-3">
          <div className="hotel__info__title mt-3 flex flex-col items-start justify-between">
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-[#022b60] sm:text-base md:text-xl lg:text-xl 2xl:text-3xl">
                {displayHotel?.hotelName.toUpperCase()}
              </h1>
              <h2 className="flex items-center border-l-2 border-[#022b60] pl-3 font-bold text-[#022b60] sm:text-base md:text-xl lg:text-xl 2xl:text-3xl">
                {displayHotel.location.toUpperCase()}
              </h2>
            </div>
            <p className="w-full text-[#022b60] xs:truncate">
              {displayHotel?.description}
            </p>
          </div>
          <div className="grid w-full grid-cols-9 grid-rows-1 text-[#022b60]">
            <div className="col-span-7 flex flex-col justify-evenly">
              <div className="hotel__info__rooms">
                <span className="text-md font-bold">Rooms Available</span>:{" "}
                {displayHotel?.rooms}
              </div>
              <div className="hotel__info__price">
                <span className="text-md font-bold">Room Price</span>: ${" "}
                {displayHotel?.price}
              </div>
            </div>
          </div>
        </div>
        <div className="hotel__cta border-grey col-span-2 flex flex-col items-end justify-start gap-2">
          <div className="mt-3 flex flex-col items-center">
            <div className="hotel__cta__ratings flex w-1/2 items-center justify-center">
              <div className="hotel__cta__ratings flex w-1/2 items-center justify-center">
                <div className="hotel__cta__ratings flex w-1/2 items-center justify-center">
                  <span className="font-bold text-[#022b60] md:text-3xl lg:text-4xl 2xl:text-6xl">
                    {totalReviews > 0 ? average : 0}
                  </span>
                  <Star
                    fill="#022b60"
                    color="#022b60"
                    className="md:min-h-[35px] md:min-w-[35px] lg:min-h-[40px] lg:min-w-[40px] 2xl:min-h-[50px] 2xl:min-w-[50px]"
                  />
                </div>
              </div>
            </div>
            <div className="hotel__cta__reviews text-[#022b60]">
              ({`${totalReviews} Reviews`})
            </div>
          </div>
          <BookHotelDialog />
          <CreateReviewDialog />
        </div>
      </div>
      <div className="hotel__review row-span-1 text-[#022b60] xs:row-span-2 xxs:hidden">
        {latestReview ? (
          <ReviewDetails
            reviewId={latestReview.reviewId}
            title={latestReview.title}
            description={latestReview.description}
            rating={latestReview.rating}
            userFN={latestReview.user.firstName}
            userLN={latestReview.user.lastName}
            userId={latestReview.user.userId}
          />
        ) : (
          <h1 className="font-bold">No Reviews</h1>
        )}
      </div>
      <div className="hidden xxs:flex justify-center w-1/2 mx-auto absolute bottom-0 right-0">
        <ReviewsDialog />
      </div>
    </div>
  );
}
