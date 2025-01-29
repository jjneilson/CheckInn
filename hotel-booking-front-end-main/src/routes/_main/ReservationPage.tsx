import ReservationItem from "@/components/ReservationItem";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAllUserReserves } from "@/hooks/reservations/use-all-user-reserves";
import { useAtom } from "jotai";
import { allReserveAtom, blueAtom, homePageAtom, userAtom } from "@/store/atoms";
import { useEffect } from "react";
import { useAllReserves } from "@/hooks/reservations/use-all-reserves";

export const Route = createFileRoute("/_main/ReservationPage")({
  component: RouteComponent,
});

function RouteComponent() {
  const [checkUser] = useAtom(userAtom);
  const router = useRouter();

  const [, setHomePage] = useAtom(homePageAtom);
  setHomePage(false);

  if (checkUser === null) {
    router.navigate({ to: "/" });
  }

  // useAllUserReserves();
  if (checkUser) {
    if (checkUser.isAdmin) {
      useAllReserves();
    } else if (!checkUser.isAdmin) {
      useAllUserReserves();
    }
  }

  const [reservations] = useAtom(allReserveAtom);

  // console.log(reservations);

  const [, setBlue] = useAtom(blueAtom);

  useEffect(() => {
    setBlue(false);
  }, []);

  return (
    <div className="col-span-full row-start-2 row-end-13 xxs:row-start-1">
      <div className="scrollbar-hidden h-full w-full overflow-y-auto p-3 xxs:p-0">
        {reservations.map((reservation) => (
          <ReservationItem key={reservation.reservationId} {...reservation} />
        ))}
      </div>
    </div>
  );
}
