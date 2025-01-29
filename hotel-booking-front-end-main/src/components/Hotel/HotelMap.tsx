import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { hotelAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { Button } from "../ui/button";

interface Point {
  lat: number;
  lng: number;
}

interface MapProps {
  center: Point;
}

export function GeoCodedMap() {
  const [hotel] = useAtom(hotelAtom);
  //const [city, setCity] = useState<string>(hotel?.location || "");
  const [center, setCenter] = useState<Point>({ lat: -34.397, lng: 150.644 }); // Default center

  useEffect(() => {
    fetchCoordinates(hotel?.location || "");
  }, [hotel]);

  const fetchCoordinates = async (cityName: string) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      cityName,
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCenter({ lat: location.lat, lng: location.lng }); // Update center
      } else {
        console.error("Geocoding API error:", data.status);
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };

  const refreshMap = () => {
    //setCity(hotel?.location || "");
    fetchCoordinates(hotel?.location || "");
  };

  return (
    <div className="flex flex-col gap-3">
      <Map center={center} />
      <Button
        onClick={refreshMap}
        className="w-1/2 bg-blue-500 hover:bg-blue-500 hover:opacity-75 mx-auto"
      >
        Reload Map
      </Button>
    </div>
  );
}

function Map({ center }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Replace with your API key
      version: "weekly",
      libraries: ["places", "marker"],
    });

    loader.load().then(() => {
      const initMap = async () => {
        const { Map } = (await google.maps.importLibrary(
          "maps",
        )) as google.maps.MapsLibrary;

        const map = new Map(mapRef.current as HTMLElement, {
          center: center,
          zoom: 11,
          mapId: "HOTEL_MAP",
        });

        nearbySearch(map, center);
      };

      const nearbySearch = async (map: google.maps.Map, center: Point) => {
        //@ts-ignore
        const { Place, SearchNearbyRankPreference } =
          (await google.maps.importLibrary(
            "places",
          )) as google.maps.PlacesLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          "marker",
        )) as google.maps.MarkerLibrary;

        const request = {
          fields: ["displayName", "location", "businessStatus"],
          locationRestriction: {
            center: center,
            radius: 5000,
          },
          includedPrimaryTypes: ["restaurant", "historical_landmark", "museum", "park"],
          maxResultCount: 20,
          rankPreference: SearchNearbyRankPreference.POPULARITY,
          language: "en-US",
          region: "us",
        };

        //@ts-ignore
        const { places } = await Place.searchNearby(request);

        if (places.length) {
          const { LatLngBounds } = (await google.maps.importLibrary(
            "core",
          )) as google.maps.CoreLibrary;
          const bounds = new LatLngBounds();

          places.forEach((place) => {
            new AdvancedMarkerElement({
              map,
              position: place.location,
              title: place.displayName,
            });

            bounds.extend(place.location as google.maps.LatLng);
          });

          map.fitBounds(bounds);
        } else {
          console.log("No results");
        }
      };

      initMap();
    });
  }, [center]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
}

export default GeoCodedMap;
