import HotelCarousel from "@/components/Hotel/HotelCarousel";
import { Input } from "@/components/ui/input";
import { filterWordAtom, homePageAtom } from "@/store/atoms";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { useAtom } from "jotai";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() 
{
  const [filterHotel, setFilterHotel] = useAtom(filterWordAtom);
  const router = useRouter();
  
  const handleChange = (e: any) => {
    setFilterHotel(e.target.value);
  };

  // checks if "Enter" key has been pressed
  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) =>
  {
    if (e.key === "Enter")
    {
      console.log(`filtered hotel: ${filterHotel}`);
      router.navigate({to: "/HomePage"});
    }
  }
    const [, setHomePage] = useAtom(homePageAtom);
    setHomePage(false);

  return (
    <div className="col-span-full row-start-2 row-end-13 grid grid-cols-10 grid-rows-10">
      <div className="logo col-start-5 col-end-7 mx-auto row-span-2 xs:col-start-3 xs:col-end-9 xs:row-start-3 
      md:col-start-3 md:col-end-9 md:row-start-2
      
       xxs:row-start-3">
        <img src="/logo-white.png" alt="Logo" className="object-cover lg:scale-150 w-full h-full sm:scale-125 xxs:scale-150 xs:scale-150" />
      </div>
      <div className="search_bar row-start-6 lg:col-start-4 lg:col-end-8 sm:col-start-3 sm:col-end-9 xs:col-start-3 xs:col-end-9">
        <Input
          type="text"
          placeholder="Location Search"
          className="rounded-lg shadow-sm"
          value={filterHotel ? filterHotel : ""}
          onChange={handleChange}
          onKeyDown={onEnterPress}
        />
      </div>
      <div className="hotel_carousel row-start-7 col-start-0 col-span-full row-end-11 mx-2">
        <HotelCarousel />
      </div>
    </div>
  );
}
