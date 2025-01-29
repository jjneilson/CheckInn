import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GeoCodedMap from "../Hotel/HotelMap";
import { MapPinned } from "lucide-react";

export function GoogleMapDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
          <MapPinned className="text-white bg-[#022b60] absolute m-3 bottom-0 right-0 w-[50px] h-[50px] p-1 rounded-md" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Nearby Attractions</DialogTitle>
          <DialogDescription>
            Explore popular destinations and points of interest close to your
            stay.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <GeoCodedMap />
        </div>
      </DialogContent>
    </Dialog>
  );
}
