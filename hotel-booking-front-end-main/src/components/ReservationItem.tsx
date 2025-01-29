import { useSetAtom } from "jotai";
import { Hotel, User, reserveAtom } from "@/store/atoms";
import { DeleteReservationDialog } from "./Dialogs/DeleteReservationDialog";

interface ReservationProps {
  reservationId: number;
  hotel: Hotel;
  user: User;
  checkInTime: string;
  checkOutTime: string;
}

export default function ReservationItem({
  reservationId,
  hotel,
  user,
  checkInTime,
  checkOutTime,
}: ReservationProps) {
  const setReserve = useSetAtom(reserveAtom);
  // const [reservedUser] = useAtom(userAtom);

  const handleDel = () => {
    setReserve({
      reservationId,
      hotel,
      user,
      checkInTime,
      checkOutTime,
    });
  };

  return (
    <div className="reservation mx-auto mb-3 grid grid-cols-5 rounded-md bg-white p-3 text-[#022b60] shadow-md md:h-3/5 lg:h-2/5 lg:w-full xl:w-3/4">
      <div className="reservation__image col-span-2 flex h-full items-center justify-center overflow-hidden rounded-l-md bg-blue-50 sm:col-span-2 md:col-span-5 lg:col-span-2 xxs:col-span-2">
        <img
          src={hotel.image}
          alt="hotel image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="reservation__details col-span-3 grid h-full grid-cols-3 grid-rows-4 rounded-r-md border px-3 sm:col-span-3 md:col-span-5 lg:col-span-3 xxs:col-span-3">
        <div className="reservation__details__head border-grey col-span-3 flex items-center justify-between border-b-2 px-3">
          <h1 className="reservation__details__hotel_name text-2xl font-bold xxs:text-lg">
            {hotel.hotelName}
          </h1>
          <div className="reservation__details__guess_name text-2xl font-bold xxs:text-lg">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="reservation__details__info col-span-2 row-span-3 py-3 xxs:col-span-3 xxs:row-span-2">
          <div className="reservation__details__info__location px-3">
            <span className="font-bold">Location:</span> {hotel.location}
          </div>
          <div className="item grid grid-cols-2 px-3 pt-3">
            <div className="reservation__details__info__checkin">
              <h3 className="font-bold">Checkin:</h3>
              <h3>{checkInTime.substring(0, 10)}</h3>
            </div>
            <div className="reservation__details__info__checkout">
              <h3 className="font-bold">Checkout:</h3>
              <h3>{checkOutTime.substring(0, 10)}</h3>
            </div>
          </div>
        </div>
        <div className="reservation__details__buttons border-grey row-span-3 flex flex-col items-center justify-center gap-3 border-l-2 xxs:col-span-3 xxs:flex-row xxs:border-none">
          {/* <UpdateReservationDialog /> */}
          <DeleteReservationDialog onDelete={handleDel} />
        </div>
      </div>
    </div>
  );
}
