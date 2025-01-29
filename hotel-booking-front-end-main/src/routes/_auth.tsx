import { homePageAtom } from "@/store/atoms";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useAtom } from "jotai";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const [, setHomePage] = useAtom(homePageAtom);
  setHomePage(false);
  return (
    <div className="col-span-full row-span-full grid grid-cols-12 grid-rows-12 p-3">
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[url(/landing-bg.jpg)] bg-cover bg-center"></div>
      <Outlet />
    </div>
  );
}
