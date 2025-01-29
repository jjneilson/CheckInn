import { createFileRoute} from "@tanstack/react-router";
import HotelDetails from "@/components/Hotel/HotelDetails";
import HotelSlider from "@/components/Hotel/HotelSlider";
import { useAtom } from "jotai";
import { homePageAtom } from "@/store/atoms";

export const Route = createFileRoute("/_main/HomePage")({
  component: RouteComponent,
});

function RouteComponent() 
{
  // check the store folder to see all my global states - these are states that can accessed anywhere in our app
  const [, setHomePage] = useAtom(homePageAtom);
  setHomePage(true);

  return (
    <div className="xs:row-start-1 col-span-full row-start-2 row-end-13 grid grid-cols-12 grid-rows-12 gap-3">
      <div className="xs:col-span-full xs:row-span-2 col-start-1 col-end-4 row-span-full flex justify-center rounded-md p-3 shadow-lg bg-white">
        <HotelSlider />
      </div>
      <div className="xs:row-start-3 xs:col-start-1 col-start-4 col-end-13 row-start-1 row-end-13 flex flex-col rounded-md p-3 shadow-lg bg-white">
        <HotelDetails />
      </div>
    </div>
  );
}
